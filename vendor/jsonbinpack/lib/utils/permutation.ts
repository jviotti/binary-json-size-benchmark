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

import {
  JSONValue
} from '../json'

export const generatePermutations = (...choices: JSONValue[][]): JSONValue[][] => {
  if (choices.length === 0 || (choices.length === 1 && choices[0].length === 0)) {
    return [ [] ]
  }

  if (choices.length === 1) {
    return choices[0].map((element: JSONValue): JSONValue[] => {
      return [ element ]
    })
  }

  return choices[0].flatMap((element: JSONValue): JSONValue[][] => {
    return generatePermutations(...choices.slice(1)).map((item: JSONValue[]): JSONValue[] => {
      return [ element, ...item ]
    })
  })
}
