/*
 * Copyright (C) Sourcemeta - All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

// See https://github.com/luzlab/ajv-formats-draft2019
declare module 'ajv-formats-draft2019' {
  import Ajv from 'ajv/dist/2019'

  interface Options {
    readonly formats: string[];
  }

  function apply(ajv: Ajv, options?: Options): void;
  export = apply;
}
