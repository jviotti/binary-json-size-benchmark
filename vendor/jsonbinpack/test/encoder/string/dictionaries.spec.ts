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
  ENGLISH_DICTIONARY
} from '../../../lib/encoder/string/dictionaries'

tap.test('ENGLISH_DICTIONARY', (test) => {
  test.is(ENGLISH_DICTIONARY.index.length,
    Object.keys(ENGLISH_DICTIONARY.dictionary).length)

  // Uniqueness check
  test.is(Array.from(new Set(ENGLISH_DICTIONARY.index)).length, ENGLISH_DICTIONARY.index.length)

  test.true(ENGLISH_DICTIONARY.index.every((word: string, index: number): boolean => {
    return ENGLISH_DICTIONARY.dictionary[word] === index
  }))

  test.end()
})
