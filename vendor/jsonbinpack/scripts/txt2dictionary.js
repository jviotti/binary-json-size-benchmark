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

const { readFileSync } = require('fs')
const INPUT = process.argv[2]

if (!INPUT) {
  console.error(`Usage: ${process.argv[0]} ${process.argv[1]} <input.txt>`)
  process.exit(1)
}

const dictionary = readFileSync(INPUT, 'utf8').split('\n').reduce((accumulator, word) => {
  const sanitized = word.trim()
  if (sanitized.length > 0) {
    accumulator.dictionary[sanitized] = accumulator.index.length
    accumulator.index.push(sanitized)
  }

  return accumulator
}, {
  index: [],
  dictionary: {}
})

console.log(JSON.stringify(dictionary, null, 2))
