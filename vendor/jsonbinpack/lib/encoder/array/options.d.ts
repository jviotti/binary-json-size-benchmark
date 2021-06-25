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
  NoOptions
} from '../null/options'

import {
  BoundedOptions,
  FloorOptions,
  RoofOptions
} from '../integer/options'

import {
  Encoding
} from '../../mapper'

export interface SemiTypedOptions {
  readonly prefixEncodings: Encoding[];
}

export interface SemiTypedFloorOptions extends FloorOptions, SemiTypedOptions {}
export interface SemiTypedRoofOptions extends RoofOptions, SemiTypedOptions {}
export interface SemiTypedBoundedOptions extends BoundedOptions, SemiTypedOptions {}

interface TypedOptions extends SemiTypedOptions {
  readonly encoding: Encoding;
}

interface TypedFloorOptions extends FloorOptions, TypedOptions {}
interface TypedRoofOptions extends RoofOptions, TypedOptions {}
interface TypedBoundedOptions extends BoundedOptions, TypedOptions {}

export type ArrayOptions =
  SemiTypedOptions |
  SemiTypedFloorOptions |
  SemiTypedRoofOptions |
  SemiTypedBoundedOptions |
  TypedOptions |
  TypedFloorOptions |
  TypedRoofOptions |
  TypedBoundedOptions
