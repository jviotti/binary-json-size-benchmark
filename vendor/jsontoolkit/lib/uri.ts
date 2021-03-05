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

import * as url from 'url'

import {
  isPointerURIFragment,
  AbsolutePointer,
  parseURI
} from './jsonpointer'

export const resolve = (base: string, path: string | null): string => {
  if (path === null) {
    return base
  } else if (base === path) {
    return base
  }

  // eslint-disable-next-line node/no-deprecated-api
  return url.resolve(base, path)
}

export const isURI = (input: string): boolean => {
  if (isPointerURIFragment(input) ||
    /^[a-z][a-z0-9]*:(\/?\/)?[^\s]+$/i.test(input) ||
    /^[^\s]+\/$/.test(input) ||
    /^[^\s]+\.[a-zA-Z0-9]+#?$/.test(input)) {
    return true
  }

  const absolutePointer: AbsolutePointer = parseURI(input)
  return absolutePointer.baseUri !== null &&
    absolutePointer.pointer.length > 0
}
