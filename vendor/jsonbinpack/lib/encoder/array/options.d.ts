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
  BoundedOptions,
  FloorOptions,
  RoofOptions
} from '../integer/options'

import {
  Encoding
} from '../../mapper'

interface SemiTypedOptions {
  readonly prefixEncodings: Encoding[];
}

interface TypedOptions extends SemiTypedOptions {
  readonly encoding: Encoding;
}

export interface SizeTypedOptions extends TypedOptions {
  readonly size: number;
}

interface TypedFloorOptions extends FloorOptions, TypedOptions {}
interface TypedRoofOptions extends RoofOptions, TypedOptions {}
interface TypedBoundedOptions extends BoundedOptions, TypedOptions {}

export type ArrayOptions =
  TypedFloorOptions |
  TypedRoofOptions |
  TypedBoundedOptions |
  SizeTypedOptions
