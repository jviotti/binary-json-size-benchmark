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

// TODO: We should have a better data structure here
// that supports searching for any substring of a string
// in a bucket

// TODO: The limit should probably be based on number
// of bytes rather than number of strings
const LIMIT: number = 100

export default class SubstringMap {
  private data: Map<string, number>;

  constructor () {
    this.data = new Map()
  }

  public has (value: string): boolean {
    return this.data.has(value)
  }

  public get (value: string): number | undefined {
    return this.data.get(value)
  }

  public set (value: string, offset: number): void {
    if (this.data.size >= LIMIT) {
      return
    }

    this.data.set(value, offset)
  }
}
