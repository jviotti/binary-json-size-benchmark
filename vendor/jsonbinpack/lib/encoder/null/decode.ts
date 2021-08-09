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
  JSONNull
} from '../../json'

import {
  NoOptions
} from './options'

import {
  DecodeResult
} from '../base'

import ResizableBuffer from '../resizable-buffer'

export interface NullResult extends DecodeResult {
  readonly value: JSONNull;
  readonly bytes: number;
}

export const NULL_8BITS_ENUM_FIXED = (
  _buffer: ResizableBuffer, _offset: number, _options: NoOptions
): NullResult => {
  return {
    value: null,
    bytes: 0
  }
}
