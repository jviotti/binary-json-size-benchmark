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
  JSONObject,
  JSONValue
} from '../../lib/json'

import {
  JSONStatsSizeQualifier,
  JSONStatsSummary,
  summarize,
  analyze
} from '../../contrib/jsonstats'

tap.test('should summarize a string document', (test) => {
  const document: JSONValue = 'foo bar'

  const result: JSONStatsSummary = {
    size: JSONStatsSizeQualifier.tiny,
    keysRedundancy: 0,
    valuesRedundancy: 0,
    nestingWeight: 0,
    numericWeight: 0,
    textualWeight: 100,
    booleanWeight: 0,
    structuralWeight: 0
  }

  test.strictSame(summarize(analyze(document)), result)
  test.end()
})

tap.test('should summarize the survey test object', (test) => {
  const document: JSONObject = {
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

  const result: JSONStatsSummary = {
    size: JSONStatsSizeQualifier.small,
    keysRedundancy: 30.76923076923077,
    valuesRedundancy: 20.833333333333332,
    nestingWeight: 12,
    numericWeight: 3.804347826086956,
    textualWeight: 0.951086956521739,
    booleanWeight: 1.5398550724637683,
    structuralWeight: 17.357336956521735
  }

  test.strictSame(summarize(analyze(document)), result)
  test.end()
})
