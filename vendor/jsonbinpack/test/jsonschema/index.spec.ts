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

import tap from 'tap'

import {
  readdirSync,
  readFileSync,
  statSync
} from 'fs'

import {
  resolve,
  basename
} from 'path'

import {
  JSONSchema,
  JSONValue,
  compileSchema,
  encode,
  decode,
  Encoding
} from '../../lib'

import {
  validateSchema
} from '../../lib/schema'

import {
  preprocessSchema
} from '../../lib/preprocessor'

const SPECIFICATION: string = 'draft2020-12'

const ROOT_DIRECTORY: string = resolve(__dirname, '..', '..', '..')
const JSON_SCHEMA_TEST_SUITE: string =
  resolve(ROOT_DIRECTORY, 'vendor', 'json-schema-test-suite')
const JSON_SCHEMA_TESTS_PATH: string =
  resolve(JSON_SCHEMA_TEST_SUITE, 'tests', SPECIFICATION)

const recursiveReadDirectory = (filePath: string): string[] => {
  return readdirSync(filePath).reduce((accumulator: string[], element: string) => {
    const fullPath: string = resolve(filePath, element)
    return statSync(fullPath).isDirectory()
      ? accumulator.concat(recursiveReadDirectory(fullPath))
      : accumulator.concat(fullPath)
  }, [])
}

interface JSONSchemaTest {
  readonly description: string;
  readonly data: JSONValue;
  readonly valid: boolean;
}

interface JSONSchemaTestSuite {
  readonly description: string;
  readonly comment?: string;
  readonly schema: JSONSchema;
  readonly tests: JSONSchemaTest[];
}

for (const suitePath of recursiveReadDirectory(JSON_SCHEMA_TESTS_PATH)) {
  const name: string = basename(suitePath)

  if ([
    // TODO: These suites require resolving local files, which we do not do yet
    'refRemote.json',
    'ref.json',
    'id.json',
    'anchor.json',
    'unknownKeyword.json',

    // The top-level format suite expects formats to be treated
    // as only annotations
    'format.json',

    // TODO: Make these suites pass
    'time.json',
    'iri.json',
    'dynamicRef.json',
    'float-overflow.json'
  ].includes(name)) {
    continue
  }

  const suites: JSONSchemaTestSuite[] = JSON.parse(readFileSync(suitePath, 'utf8'))
  for (const suite of suites) {
    for (const testCase of suite.tests) {
      if (!testCase.valid) {
        continue
      }

      tap.test(`${name} | ${suite.description} -> ${testCase.description}`, async (test) => {
        const schema: JSONSchema = await preprocessSchema(suite.schema)
        test.true(validateSchema(schema, testCase.data))

        const encoding: Encoding = await compileSchema(schema)
        const buffer: Buffer = encode(encoding, testCase.data)
        const result: JSONValue = decode(encoding, buffer)
        test.strictSame(testCase.data, result)

        test.end()
      })
    }
  }
}
