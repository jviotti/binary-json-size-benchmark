/*
 * Copyright 2020 Juan Cruz Viotti
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

import * as tap from 'tap'
import * as path from 'path'
import * as fs from 'fs'
import * as url from 'url'

import * as OUTPUT_SCHEMA_DRAFT2019_09 from
  // eslint-disable-next-line max-len
  '../../lib/jsonschema/schemas/json-schema.org/draft/2019-09/output/schema.json'

import * as OUTPUT_SCHEMA_FLAG from './schemas/output-flag.json'
import * as OUTPUT_SCHEMA_BASIC from './schemas/output-basic.json'

import {
  getSchemaId,
  getMetaSchemaById,
  getMetaSchemaIdFromSchema
} from '../../lib/jsonschema/vocabularies'

import {
  Pointer,
  getValue,
  parsePointerURIFragment
} from '../../lib/jsonpointer'

import {
  Schema,
  ValidationResult,
  ValidateOutputMode,
  validate,
  defaultResolver
} from '../../lib/jsonschema'

import {
  JSONValue,
  JSONObject
} from '../../lib/json'

// eslint-disable-next-line no-process-env
const basePath: string | undefined = process.env.JSON_SCHEMA_TESTS_BASE_PATH

const remotesPath: string | undefined =
  // eslint-disable-next-line no-process-env
  process.env.JSON_SCHEMA_TESTS_REMOTES_PATH

// eslint-disable-next-line no-process-env
const testPath: string | undefined = process.env.JSON_SCHEMA_TEST_PATH

const ignoreRegex: RegExp =
  // eslint-disable-next-line no-process-env
  typeof process.env.JSON_SCHEMA_TEST_IGNORE_PATTERN === 'string'

    // eslint-disable-next-line no-process-env
    ? new RegExp(process.env.JSON_SCHEMA_TEST_IGNORE_PATTERN)

    // Regex that matches nothing. See https://stackoverflow.com/a/2930280/1641422
    : /\b\B/

if (basePath === undefined ||
  remotesPath === undefined ||
  testPath === undefined) {
  console.error('Please set the following environment variables:')
  console.error('  Path to the JSON Schema tests suites')
  console.error('    JSON_SCHEMA_TESTS_BASE_PATH')
  console.error('  Path to the JSON Schema tests suite remotes')
  console.error('    JSON_SCHEMA_TESTS_REMOTES_PATH')
  console.error('  Tests to run, relative to the base path')
  console.error('    JSON_SCHEMA_TEST_PATH')
  console.error('  Pattern to ignore certain tests')
  console.error('    JSON_SCHEMA_TEST_IGNORE_PATTERN')
  process.exit(1)
}

interface TestCase {
  readonly description: string;
  readonly data: JSONValue;
  readonly valid: boolean;
}

interface TestSuite {
  readonly category: string;
  readonly description: string;
  readonly schema: Schema;
  readonly tests: TestCase[];
}

const METASCHEMAS: Record<string, string> = {
  'draft2019-09': 'https://json-schema.org/draft/2019-09/schema',
  draft7: 'http://json-schema.org/draft-07/schema#',
  draft6: 'http://json-schema.org/draft-06/schema#',
  draft4: 'http://json-schema.org/draft-04/schema#',
  draft3: 'http://json-schema.org/draft-03/schema#'
}

const isMockedUri = (uri: url.UrlWithStringQuery): boolean => {
  // eslint-disable-next-line node/no-deprecated-api
  return uri.protocol === 'http:' &&
    uri.hostname === 'localhost' &&
    uri.port === '1234'
}

const resolver = async (uri: string): Promise<Schema | null> => {
  // eslint-disable-next-line node/no-deprecated-api
  const parsedUrl: url.UrlWithStringQuery = url.parse(uri)
  if (!isMockedUri(parsedUrl)) {
    return defaultResolver(uri)
  }

  return new Promise((resolve, reject) => {
    if (parsedUrl.path === null) {
      resolve(null)
      return
    }

    const stubPath: string = path.join(remotesPath, parsedUrl.path)
    fs.readFile(stubPath, 'utf8', (error, contents: string) => {
      if (error !== null) {
        if (error.code === 'ENOENT') {
          return resolve(null)
        }

        return reject(error)
      }

      return resolve(JSON.parse(contents))
    })
  })
}

const resolveSchema = (standard: string, schema: Schema): Schema => {
  if (typeof schema !== 'object' || Array.isArray(schema)) {
    return schema
  }

  const metaschema: Schema | null = getMetaSchemaById(METASCHEMAS[standard])
  if (metaschema === null) {
    return schema
  }

  const id: string | null = getSchemaId(METASCHEMAS[standard], metaschema)
  if (id === null) {
    return schema
  }

  return Object.assign({}, schema, {
    $schema: id
  })
}

const fileExists = (filePath: string): boolean => {
  try {
    fs.statSync(filePath)
    return true
  } catch (error) {
    // TS1196: Catch clause variable cannot have a type annotation
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false
    }

    throw error
  }
}

const getTestSuites = (base: string, location: string): TestSuite[] => {
  const fullPath: string = path.resolve(base, location)

  if (!fileExists(fullPath) && path.extname(location) === '') {
    return getTestSuites(base, `${location}.json`)
  }

  const stats: fs.Stats = fs.statSync(fullPath)

  if (stats.isSymbolicLink() || location === 'latest') {
    return []
  }

  if (!stats.isDirectory()) {
    const contents: TestSuite[] = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    return contents.map((suite: TestSuite): TestSuite => {
      return Object.assign(suite, {
        category: path.join(
          path.dirname(location),
          path.basename(location, path.extname(location)))
      })
    })
  }

  return fs.readdirSync(fullPath).reduce(
    (accumulator: TestSuite[], file: string) => {
      return accumulator.concat(
        getTestSuites(base, path.join(location, file)))
    }, [])
}

const VALIDATION_CACHE: Map<string, Set<string>> = new Map()

const validateSchema = async (
  mode: ValidateOutputMode,
  schema: Schema,
  value: JSONValue
): Promise<ValidationResult> => {
  /*
   * Get the schema's metaschema
   */
  const metaschemaId: string = getMetaSchemaIdFromSchema(schema)
  const metaschema: Schema | null = await resolver(metaschemaId)
  if (metaschema === null) {
    throw new Error(`No such metaschema: ${metaschemaId}`)
  }

  /*
   * Validate the schema against its metaschema
   */

  const schemaId: string | null = getSchemaId(metaschemaId, schema)
  if (schemaId === null ||
    !VALIDATION_CACHE.has(metaschemaId) ||
    !(VALIDATION_CACHE.get(metaschemaId) ?? new Set()).has(schemaId)) {
    const metaschemaResult: ValidationResult =
      await validate(mode, metaschema, schema, resolver)
    if (!metaschemaResult.valid) {
      const result: string = JSON.stringify(metaschemaResult, null, 2)
      throw new Error(`The schema does not match its metaschema: ${result}`)
    }

    if (schemaId !== null) {
      const schemas: Set<string> =
        VALIDATION_CACHE.get(metaschemaId) ?? new Set()
      schemas.add(schemaId)
      VALIDATION_CACHE.set(metaschemaId, schemas)
    }
  }

  /*
   * Validate the value against the schema
   */
  return validate(mode, schema, value, resolver)
}

for (const suite of getTestSuites(basePath, testPath)) {
  for (const testCase of suite.tests) {
    const title: string = [
      suite.category,
      '@',
      suite.description,
      '-',
      testCase.description
    ].join(' ')

    const standard: string = suite.category.split('/')[0]

    if (ignoreRegex.test(suite.category)) {
      continue
    }

    for (const mode of [ ValidateOutputMode.Flag, ValidateOutputMode.Basic ]) {
      tap.test(`${title} (${mode})`, async (test) => {
        const schema: Schema = resolveSchema(standard, suite.schema)

        const validationResult: ValidationResult =
          await validateSchema(mode, schema, testCase.data)

        const resultObject: JSONObject = validationResult

        const outputValidationResult: ValidationResult =
          await validateSchema(mode, OUTPUT_SCHEMA_DRAFT2019_09, resultObject)
        test.true(outputValidationResult.valid,
          'The validation results should match the output schema')

        if (mode === ValidateOutputMode.Flag) {
          const modeValidationResult: ValidationResult =
            await validateSchema(mode, OUTPUT_SCHEMA_FLAG, resultObject)
          test.true(modeValidationResult.valid,
            'The validation results should match the flag output schema')
        } else if (mode === ValidateOutputMode.Basic) {
          const modeValidationResult: ValidationResult =
            await validateSchema(mode, OUTPUT_SCHEMA_BASIC, resultObject)
          test.true(modeValidationResult.valid,
            'The validation results should match the basic output schema')
        }

        if (testCase.valid) {
          test.true(validationResult.valid,
            'The object should match the schema')
        } else {
          test.false(validationResult.valid,
            'The object should not match the schema')
          if (mode === ValidateOutputMode.Basic) {
            for (const error of validationResult.errors ?? []) {
              if (!Array.isArray(testCase.data) &&
                  (typeof testCase.data !== 'object' ||
                  Array.isArray(testCase.data) ||
                  testCase.data === null)) {
                test.true('instanceLocation' in error &&
                  error.instanceLocation === '#', [
                  'If the input is not traversable then instance locations',
                  'are root pointers'
                ].join(' '))
              } else if ('instanceLocation' in error &&
                error.instanceLocation !== undefined) {
                const pointer: Pointer | null =
                  parsePointerURIFragment(error.instanceLocation)
                if (pointer === null) {
                  test.bailout([
                    'Cannot parse instance location pointer:',
                    error.instanceLocation
                  ].join(' '))
                  return
                }

                const instanceValue: JSONValue | undefined =
                  getValue(testCase.data, pointer)
                test.false(instanceValue === undefined,
                  'The instance pointer cannot point to an undefined value')
              }

              // TODO: Test that if the keyword location does not contain a
              // "$ref" component, then the current schema $id is present
              // as the beginning of the absoluteKeywordLocation
            }

            // TODO: For every error, check if the JSON Pointers
            // can be traversed correctly.
          }
        }

        test.end()
      })
    }
  }
}
