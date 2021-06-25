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

import CodeMirror from 'codemirror'

import {
  JSONStats,
  JSONStatsSummary,
  summarize,
  analyze,
  qualify
} from '../contrib/jsonstats'

import {
  JSONValue,
  JSONObject
} from '../lib/json'

const EXAMPLE_JSON: JSONObject = {
  tags: [],
  tz: -25200,
  days: [ 1, 1, 2, 1 ],
  coord: [ -90.0715, 29.9510 ],
  data: [
    {
      name: 'ox03',
      staff: true
    },
    {
      name: null,
      staff: false,
      extra: {
        info: ''
      }
    },
    {
      name: 'ox03',
      staff: true
    },
    {}
  ]
}

const editorElement: HTMLElement | null = document.getElementById('editor')
if (editorElement === null) {
  throw new Error('Editor element does not exist')
}

const code: CodeMirror.Editor = CodeMirror(editorElement, {
  lineNumbers: true,
  value: JSON.stringify(EXAMPLE_JSON, null, 2),
  theme: 'idea',
  mode: 'json'
})

const buttonElement: HTMLElement | null = document.getElementById('analyze')
if (buttonElement === null) {
  throw new Error('Button element does not exist')
}

const parseJSON = (value: string): JSONValue => {
  try {
    const result: JSONValue = JSON.parse(value)
    return result
  } catch (error) {
    if (error instanceof SyntaxError) {
      document.querySelectorAll('.error-modal').forEach((element: Element) => {
        element.classList.remove('hidden')
      })
    }

    throw error
  }
}

const ANALYZE_VALUES_STRUCTURAL_COUNT: HTMLElement | null =
  document.getElementById('analyze-values-structural-count')
const ANALYZE_VALUES_STRUCTURAL_BYTESIZE: HTMLElement | null =
  document.getElementById('analyze-values-structural-bytesize')

const ANALYZE_VALUES_NUMERIC_COUNT: HTMLElement | null =
  document.getElementById('analyze-values-numeric-count')
const ANALYZE_VALUES_NUMERIC_BYTESIZE: HTMLElement | null =
  document.getElementById('analyze-values-numeric-bytesize')

const ANALYZE_VALUES_BOOLEAN_COUNT: HTMLElement | null =
  document.getElementById('analyze-values-boolean-count')
const ANALYZE_VALUES_BOOLEAN_BYTESIZE: HTMLElement | null =
  document.getElementById('analyze-values-boolean-bytesize')

const ANALYZE_VALUES_TEXTUAL_COUNT: HTMLElement | null =
  document.getElementById('analyze-values-textual-count')
const ANALYZE_VALUES_TEXTUAL_BYTESIZE: HTMLElement | null =
  document.getElementById('analyze-values-textual-bytesize')

const ANALYZE_KEYS_COUNT: HTMLElement | null =
  document.getElementById('analyze-keys-count')
const ANALYZE_KEYS_BYTESIZE: HTMLElement | null =
  document.getElementById('analyze-keys-bytesize')

const ANALYZE_LARGEST_LEVEL: HTMLElement | null =
  document.getElementById('analyze-largest-level')
const ANALYZE_MAX_NESTING_DEPTH: HTMLElement | null =
  document.getElementById('analyze-max-nesting-depth')

const ANALYZE_DUPLICATED_KEYS: HTMLElement | null =
  document.getElementById('analyze-duplicated-keys')
const ANALYZE_DUPLICATED_VALUES: HTMLElement | null =
  document.getElementById('analyze-duplicated-values')

const ANALYZE_BYTESIZE: HTMLElement | null =
  document.getElementById('analyze-bytesize')

if (ANALYZE_VALUES_STRUCTURAL_COUNT === null ||
  ANALYZE_VALUES_STRUCTURAL_BYTESIZE === null ||
  ANALYZE_VALUES_NUMERIC_COUNT === null ||
  ANALYZE_VALUES_NUMERIC_BYTESIZE === null ||
  ANALYZE_VALUES_BOOLEAN_COUNT === null ||
  ANALYZE_VALUES_BOOLEAN_BYTESIZE === null ||
  ANALYZE_VALUES_TEXTUAL_COUNT === null ||
  ANALYZE_VALUES_TEXTUAL_BYTESIZE === null ||
  ANALYZE_KEYS_COUNT === null ||
  ANALYZE_KEYS_BYTESIZE === null ||
  ANALYZE_LARGEST_LEVEL === null ||
  ANALYZE_MAX_NESTING_DEPTH === null ||
  ANALYZE_DUPLICATED_KEYS === null ||
  ANALYZE_DUPLICATED_VALUES === null ||
  ANALYZE_BYTESIZE === null) {
  throw new Error('Not all analyze elements exist')
}

const SUMMARY_SIZE: HTMLElement | null =
  document.getElementById('summary-size')
const SUMMARY_KEYS_REDUNDANCY: HTMLElement | null =
  document.getElementById('summary-keys-redundancy')
const SUMMARY_VALUES_REDUNDANCY: HTMLElement | null =
  document.getElementById('summary-values-redundancy')
const SUMMARY_NESTING_WEIGHT: HTMLElement | null =
  document.getElementById('summary-nesting-weight')
const SUMMARY_NUMERIC_WEIGHT: HTMLElement | null =
  document.getElementById('summary-numeric-weight')
const SUMMARY_TEXTUAL_WEIGHT: HTMLElement | null =
  document.getElementById('summary-textual-weight')
const SUMMARY_BOOLEAN_WEIGHT: HTMLElement | null =
  document.getElementById('summary-boolean-weight')
const SUMMARY_STRUCTURAL_WEIGHT: HTMLElement | null =
  document.getElementById('summary-structural-weight')

if (SUMMARY_SIZE === null ||
  SUMMARY_KEYS_REDUNDANCY === null ||
  SUMMARY_VALUES_REDUNDANCY === null ||
  SUMMARY_NESTING_WEIGHT === null ||
  SUMMARY_NUMERIC_WEIGHT === null ||
  SUMMARY_TEXTUAL_WEIGHT === null ||
  SUMMARY_BOOLEAN_WEIGHT === null ||
  SUMMARY_STRUCTURAL_WEIGHT === null) {
  throw new Error('Not all summary elements exist')
}

const QUALIFIERS_CONTAINER: HTMLElement | null =
  document.getElementById('qualifiers')
if (QUALIFIERS_CONTAINER === null) {
  throw new Error('The qualifiers container does not exist')
}

const capitalize = (text: string): string => {
  return text[0].toUpperCase() + text.slice(1)
}

const populate = (contents: string): void => {
  const json: JSONValue = parseJSON(contents)

  const stats: JSONStats = analyze(json)
  ANALYZE_BYTESIZE.innerHTML = String(stats.byteSize)
  ANALYZE_DUPLICATED_KEYS.innerHTML =
    String(stats.duplicatedKeys)
  ANALYZE_DUPLICATED_VALUES.innerHTML =
    String(stats.duplicatedValues)
  ANALYZE_MAX_NESTING_DEPTH.innerHTML =
    String(stats.maxNestingDepth)
  ANALYZE_LARGEST_LEVEL.innerHTML =
    String(stats.largestLevel)
  ANALYZE_KEYS_COUNT.innerHTML =
    String(stats.keys.count)
  ANALYZE_KEYS_BYTESIZE.innerHTML =
    String(stats.keys.byteSize)
  ANALYZE_VALUES_NUMERIC_COUNT.innerHTML =
    String(stats.values.numeric.count)
  ANALYZE_VALUES_NUMERIC_BYTESIZE.innerHTML =
    String(stats.values.numeric.byteSize)
  ANALYZE_VALUES_BOOLEAN_COUNT.innerHTML =
    String(stats.values.boolean.count)
  ANALYZE_VALUES_BOOLEAN_BYTESIZE.innerHTML =
    String(stats.values.boolean.byteSize)
  ANALYZE_VALUES_TEXTUAL_COUNT.innerHTML =
    String(stats.values.textual.count)
  ANALYZE_VALUES_TEXTUAL_BYTESIZE.innerHTML =
    String(stats.values.textual.byteSize)
  ANALYZE_VALUES_STRUCTURAL_COUNT.innerHTML =
    String(stats.values.structural.count)
  ANALYZE_VALUES_STRUCTURAL_BYTESIZE.innerHTML =
    String(stats.values.structural.byteSize)

  const summary: JSONStatsSummary = summarize(stats)
  SUMMARY_SIZE.innerHTML = summary.size
  SUMMARY_NESTING_WEIGHT.innerHTML =
    String(summary.nestingWeight)
  const precision: number = 4
  SUMMARY_KEYS_REDUNDANCY.innerHTML =
    summary.keysRedundancy.toFixed(precision)
  SUMMARY_VALUES_REDUNDANCY.innerHTML =
    summary.valuesRedundancy.toFixed(precision)
  SUMMARY_NUMERIC_WEIGHT.innerHTML =
    summary.numericWeight.toFixed(precision)
  SUMMARY_TEXTUAL_WEIGHT.innerHTML =
    summary.textualWeight.toFixed(precision)
  SUMMARY_BOOLEAN_WEIGHT.innerHTML =
    summary.booleanWeight.toFixed(precision)
  SUMMARY_STRUCTURAL_WEIGHT.innerHTML =
    summary.structuralWeight.toFixed(precision)

  QUALIFIERS_CONTAINER.innerHTML = qualify(summary).map(capitalize).join(', ')
}

buttonElement.addEventListener('click', () => {
  const contents: string = code.getValue()
  populate(contents)
})

const modalButtonElement: HTMLElement | null =
  document.getElementById('close-modal')
if (modalButtonElement === null) {
  throw new Error('Modal button element does not exist')
}

modalButtonElement.addEventListener('click', () => {
  document.querySelectorAll('.error-modal').forEach((element: Element) => {
    element.classList.add('hidden')
  })
})

// Analyze example
populate(code.getValue())
