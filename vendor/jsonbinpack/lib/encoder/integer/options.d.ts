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

export {
  NoOptions
} from '../null/options'

export interface FloorOptions extends NoOptions {
  readonly minimum: number;
}

export interface RoofOptions extends NoOptions {
  readonly maximum: number;
}

export interface MultiplierOptions extends NoOptions {
  readonly multiplier: number;
}

export interface BoundedOptions extends FloorOptions, RoofOptions {}

export interface BoundedMultiplierOptions
  extends BoundedOptions, MultiplierOptions {}

export interface FloorMultiplierOptions
  extends FloorOptions, MultiplierOptions {}

export interface RoofMultiplierOptions
  extends RoofOptions, MultiplierOptions {}

export type IntegerOptions =
  NoOptions |
  FloorOptions |
  RoofOptions |
  MultiplierOptions |
  BoundedOptions |
  BoundedMultiplierOptions |
  FloorMultiplierOptions |
  RoofMultiplierOptions
