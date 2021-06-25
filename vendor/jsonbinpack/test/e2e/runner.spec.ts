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
  isDeepStrictEqual
} from 'util'

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  statSync
} from 'fs'

import {
  resolve
} from 'path'

import {
  JSONValue,
  JSONSchema,
  compileSchema,
  encode,
  decode,
  Encoding
} from '../../lib'

import {
  validateSchema,
  EncodingSchema
} from '../../lib/schema'

import {
  preprocessSchema
} from '../../lib/preprocessor'

const TEST_DIRECTORY: string = __dirname
const SRC_TEST_DIRECTORY: string = resolve(__dirname, '..', '..', '..', 'test', 'e2e')

const safeReadFile = (filePath: string): string | null => {
  try {
    return readFileSync(filePath, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null
    }

    throw error
  }
}

const writeResult = (testCase: string, name: string, value: Encoding | EncodingSchema): void => {
  const destination: string = resolve(SRC_TEST_DIRECTORY, testCase, name)

  const currentContent: string | null = safeReadFile(destination)
  if (typeof currentContent === 'string' &&
    isDeepStrictEqual(JSON.parse(currentContent), value)) {
    return
  }

  const content: string = JSON.stringify(value, null, 2)
  writeFileSync(destination, `${content}\n`, 'utf8')
}

for (const testCase of readdirSync(TEST_DIRECTORY)) {
  const testCasePath: string = resolve(TEST_DIRECTORY, testCase)
  if (!statSync(testCasePath).isDirectory()) {
    continue
  }

  tap.test(testCase, async (test) => {
    const schema: JSONSchema = JSON.parse(readFileSync(resolve(testCasePath, 'schema.json'), 'utf8'))
    const value: JSONValue = JSON.parse(readFileSync(resolve(testCasePath, 'document.json'), 'utf8'))

    const encodingSchema: EncodingSchema = await preprocessSchema(schema)
    test.true(validateSchema(encodingSchema, value))

    const encoding: Encoding = await compileSchema(schema)

    // Record the encoding and canonical schemas for debugging purposes
    writeResult(testCase, 'encoding.json', encoding)
    writeResult(testCase, 'canonical.json', encodingSchema)

    const buffer: Buffer = encode(encoding, value)
    const result: JSONValue = decode(encoding, buffer)

    // Record the buffer for debugging purposes too
    writeFileSync(resolve(SRC_TEST_DIRECTORY, testCase, 'output.bin'), buffer)

    // Record the buffer size for debugging purposes
    const size: string = String(buffer.length)
    writeFileSync(resolve(SRC_TEST_DIRECTORY, testCase, 'size'), `${size}\n`, 'utf8')

    test.strictSame(value, result)
    test.end()
  })
}
