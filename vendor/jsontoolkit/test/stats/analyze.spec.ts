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

import * as tap from 'tap'

import {
  JSONObject
} from '../../lib/json'

import {
  JSONStats,
  analyze
} from '../../lib/stats'

tap.test('should analyze the survey test object', (test) => {
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

  const result: JSONStats = {
    byteSize: 184,
    maxNestingDepth: 4,
    largestLevel: 3,
    duplicatedKeys: 4,
    duplicatedValues: 5,
    keys: {
      count: 13,
      byteSize: 81
    },
    values: {
      numeric: {
        count: 7,
        byteSize: 24
      },
      textual: {
        count: 3,
        byteSize: 14
      },
      boolean: {
        count: 4,
        byteSize: 17
      },
      structural: {
        count: 10,
        byteSize: 48
      }
    }
  }

  test.strictSame(analyze(document), result)
  test.is(result.byteSize,
    result.keys.byteSize +
    result.values.numeric.byteSize +
    result.values.textual.byteSize +
    result.values.boolean.byteSize +
    result.values.structural.byteSize)

  const VALUES_COUNT: number =
    result.values.numeric.count +
    result.values.textual.count +
    result.values.boolean.count +
    result.values.structural.count

  test.ok(VALUES_COUNT >= result.keys.count)
  test.ok(VALUES_COUNT >= result.duplicatedValues)
  test.end()
})
