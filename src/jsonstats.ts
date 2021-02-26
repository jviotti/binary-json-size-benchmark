/*
 * Copyright 2021 Juan Cruz Viotti
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as fs from 'fs'
import * as util from 'util'

import {
  JSONValue,
  JSONTypeCategory,
  getJSONSize,
  getJSONType,
  getJSONTypeCategory
} from '../vendor/jsontoolkit/lib/json'

interface CountSizeStats {
  count: number;
  byteSize: number;
}

interface ValuesStats {
  numeric: CountSizeStats;
  textual: CountSizeStats;
  boolean: CountSizeStats;
  structural: CountSizeStats;
}

export interface JSONStats {
  byteSize: number;
  maxNestingDepth: number;
  largestLevel: number;
  keys: CountSizeStats;
  values: ValuesStats;
  duplicatedKeys: number;
  duplicatedValues: number;
}

const DEFAULT_ACCUMULATOR: JSONStats = {
  byteSize: 0,
  maxNestingDepth: 0,
  largestLevel: 0,
  duplicatedKeys: 0,
  duplicatedValues: 0,
  keys: {
    count: 0,
    byteSize: 0
  },
  values: {
    numeric: {
      count: 0,
      byteSize: 0
    },
    textual: {
      count: 0,
      byteSize: 0
    },
    boolean: {
      count: 0,
      byteSize: 0
    },
    structural: {
      count: 0,
      byteSize: 0
    }
  }
}

const clone = <T>(value: T): T => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(JSON.stringify(value))
}

const contains = <T>(list: T[], element: T): boolean => {
  for (const item of list) {
    if (util.isDeepStrictEqual(item, element)) {
      return true
    }
  }

  return false
}

const uniq = <T>(list: T[]): T[] => {
  const result: T[] = []

  for (const element of list) {
    if (contains(result, element)) {
      continue
    }

    result.push(element)
  }

  return result
}

export const analyze = (
  document: JSONValue,
  level: number = 0,
  accumulator: JSONStats = clone(DEFAULT_ACCUMULATOR),
  keys: Set<string> = new Set(),
  values: JSONValue[] = [],
  levels: number[] = []
): JSONStats => {
  values.push(clone(document))
  accumulator.byteSize =
    accumulator.byteSize || getJSONSize(document)
  levels[level] = levels[level] || 0

  accumulator.maxNestingDepth =
    Math.max(accumulator.maxNestingDepth, level)
  const category: JSONTypeCategory =
    getJSONTypeCategory(getJSONType(document))
  accumulator.values[category].count += 1

  if (typeof document === 'object' &&
    !Array.isArray(document) && document !== null) {
    // The curly braces
    const numberOfKeys: number = Object.keys(document).length
    accumulator.values.structural.byteSize +=
      2 + (numberOfKeys * 2) - Math.min(numberOfKeys, 1)

    for (const [ key, value ] of Object.entries(document)) {
      if (value === undefined) {
        continue
      }

      keys.add(key)
      accumulator.keys.count += 1
      accumulator.keys.byteSize += getJSONSize(key)
      analyze(value, level + 1, accumulator, keys, values, levels)
    }
  } else if (Array.isArray(document)) {
    accumulator.values.structural.byteSize +=
      2 + document.length - Math.min(document.length, 1)

    for (const element of document) {
      analyze(element, level + 1, accumulator, keys, values, levels)
    }
  } else {
    const documentSize: number = getJSONSize(document)
    accumulator.values[category].byteSize += documentSize
    levels[level] += documentSize
  }

  accumulator.largestLevel = levels.lastIndexOf(Math.max(...levels))
  accumulator.duplicatedKeys = accumulator.keys.count - keys.size

  // Only calculate duplicated values for the top-level run
  // for performance reasons. Otherwise calculating duplicates
  // at every step is very time consuming.
  if (level === 0) {
    accumulator.duplicatedValues =
      accumulator.values.numeric.count +
      accumulator.values.textual.count +
      accumulator.values.boolean.count +
      accumulator.values.structural.count -
      uniq(values).length
  } else {
    accumulator.duplicatedValues = 0
  }

  return accumulator
}

const percentage = (total: number, local: number): number => {
  return total === 0 ? 0 : local * 100 / total
}

export enum JSONStatsSizeQualifier {
  tiny = 'tiny',
  small = 'small',
  large = 'large'
}

export interface JSONStatsSummary {
  size: JSONStatsSizeQualifier;
  keysRedundancy: number;
  valuesRedundancy: number;
  nestingWeight: number;
  numericWeight: number;
  textualWeight: number;
  booleanWeight: number;
  structuralWeight: number;
}

// Based on distribution plot results
const getSizeQualifier = (byteSize: number): JSONStatsSizeQualifier => {
  if (byteSize < 100) {
    return JSONStatsSizeQualifier.tiny
  } else if (byteSize < 1000) {
    return JSONStatsSizeQualifier.small
  }

  return JSONStatsSizeQualifier.large
}

export const summarize = (stats: JSONStats): JSONStatsSummary => {
  const valuesCount: number = stats.values.numeric.count +
    stats.values.textual.count +
    stats.values.boolean.count +
    stats.values.structural.count

  const structuralRawWeight: number =
    percentage(valuesCount, stats.values.structural.count) *
    percentage(stats.byteSize, stats.values.structural.byteSize)

  const keysRawWeight: number =
    percentage(valuesCount, stats.keys.count) *
    percentage(stats.byteSize, stats.keys.byteSize)

  return {
    size: getSizeQualifier(stats.byteSize),
    keysRedundancy: percentage(stats.keys.count, stats.duplicatedKeys),
    valuesRedundancy: percentage(valuesCount, stats.duplicatedValues),
    nestingWeight: stats.maxNestingDepth * stats.largestLevel,

    numericWeight: percentage(10000,
      percentage(valuesCount, stats.values.numeric.count) *
      percentage(stats.byteSize, stats.values.numeric.byteSize)),
    textualWeight: percentage(10000,
      percentage(valuesCount, stats.values.textual.count) *
      percentage(stats.byteSize, stats.values.textual.byteSize)),
    booleanWeight: percentage(10000,
      percentage(valuesCount, stats.values.boolean.count) *
      percentage(stats.byteSize, stats.values.boolean.byteSize)),
    structuralWeight:
      percentage(20000, structuralRawWeight + keysRawWeight)
  }
}

export const qualify = (summary: JSONStatsSummary): string[] => {
  const qualifiers: string[] = [ summary.size ]

  if (summary.numericWeight > summary.textualWeight &&
    summary.numericWeight > summary.booleanWeight) {
    qualifiers.push('numeric-heavy')
  } else if (summary.textualWeight > summary.numericWeight &&
    summary.textualWeight > summary.booleanWeight) {
    qualifiers.push('textual-heavy')
  } else {
    qualifiers.push('boolean-heavy')
  }

  if (summary.valuesRedundancy >= 25) {
    qualifiers.push('highly-redundant')
  } else {
    qualifiers.push('little-redundant')
  }

  // Based on distribution plot results
  if (summary.nestingWeight < 10) {
    qualifiers.push('little-nested')
  } else {
    qualifiers.push('highly-nested')
  }

  return qualifiers
}

if (process.mainModule?.filename === __filename) {
  const COMMAND: string | undefined = process.argv[2]
  const FILE: string | undefined = process.argv[3]

  const help = (): void => {
    const commands: string = '<analyze|summarize|qualify>'
    console.error(
      `Usage: ${process.argv[0]} ${process.argv[1]} ${commands} <file>`)
  }

  if (typeof COMMAND === 'undefined' || typeof FILE === 'undefined') {
    help()
    process.exit(1)
  }

  // From https://github.com/sindresorhus/strip-bom/blob/main/index.js
  const normalize = (value: string): string => {
    if (value.charCodeAt(0) === 0xFEFF) {
      return value.slice(1)
    }

    return value
  }

  const json: JSONValue = JSON.parse(normalize(fs.readFileSync(FILE, 'utf8')))

  const stats: JSONStats = analyze(json)

  if (COMMAND === 'analyze') {
    console.log(JSON.stringify(stats, null, 2))
  } else if (COMMAND === 'summarize') {
    console.log(JSON.stringify(summarize(stats), null, 2))
  } else if (COMMAND === 'qualify') {
    console.log(JSON.stringify(qualify(summarize(stats)), null, 2))
  } else {
    help()
    process.exit(1)
  }
}
