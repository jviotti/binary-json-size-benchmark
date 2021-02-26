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

import * as tap from 'tap'

import {
  Schema,
  ValidationResult,
  ValidateOutputMode,
  validate,
  defaultResolver
} from '../../lib/jsonschema'

tap.test(
  'should return basic error information given a schema without an id',
  async (test) => {
    const schema: Schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      required: [ 'latitude', 'longitude' ],
      properties: {
        latitude: {
          type: 'number'
        },
        longitude: {
          type: 'number'
        }
      }
    }

    const document = {
      latitude: 50,
      longitude: '50'
    }

    const result: ValidationResult =
      await validate(ValidateOutputMode.Basic,
        schema, document, defaultResolver)

    test.false(result.valid, 'The object must not match the schema')
    test.strictSame(result.errors, [
      {
        instanceLocation: '#',
        keywordLocation: '#',
        error: 'A subschema had errors'
      },
      {
        instanceLocation: '#/longitude',
        keywordLocation: '#/properties/longitude',
        error: 'A subschema had errors'
      },
      {
        instanceLocation: '#/longitude',
        keywordLocation: '#/properties/longitude/type',
        error: 'Property must be of type number'
      }
    ], 'The validation results must return the correct error')

    test.end()
  })

tap.test(
  'should return basic error information given a schema with an id',
  async (test) => {
    const schema: Schema = {
      $id: 'https://example.com/geo',
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      required: [ 'latitude', 'longitude' ],
      properties: {
        latitude: {
          type: 'number'
        },
        longitude: {
          type: 'number'
        }
      }
    }

    const document = {
      latitude: 50,
      longitude: '50'
    }

    const result: ValidationResult =
      await validate(ValidateOutputMode.Basic,
        schema, document, defaultResolver)

    test.false(result.valid, 'The object must not match the schema')
    test.strictSame(result.errors, [
      {
        instanceLocation: '#',
        keywordLocation: '#',
        error: 'A subschema had errors'
      },
      {
        instanceLocation: '#/longitude',
        keywordLocation: '#/properties/longitude',
        error: 'A subschema had errors'
      },
      {
        instanceLocation: '#/longitude',
        keywordLocation: '#/properties/longitude/type',
        error: 'Property must be of type number'
      }
    ], 'The validation results must return the correct error')

    test.end()
  })

tap.test(
  'should return verbose error information given a schema without an id',
  async (test) => {
    const schema: Schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      required: [ 'latitude', 'longitude' ],
      properties: {
        latitude: {
          type: 'number'
        },
        longitude: {
          type: 'number'
        }
      }
    }

    const document = {
      latitude: 50,
      longitude: '50'
    }

    const result: ValidationResult =
      await validate(ValidateOutputMode.Verbose,
        schema, document, defaultResolver)

    test.strictSame(result, {
      valid: false,
      keywordLocation: '#',
      instanceLocation: '#',
      errors: [
        {
          valid: true,
          keywordLocation: '#/type',
          instanceLocation: '#'
        },
        {
          valid: true,
          keywordLocation: '#/required',
          instanceLocation: '#'
        },
        {
          valid: false,
          keywordLocation: '#/properties',
          instanceLocation: '#',
          errors: [
            {
              valid: true,
              keywordLocation: '#/properties/latitude',
              instanceLocation: '#/latitude',
              errors: [
                {
                  valid: true,
                  keywordLocation: '#/properties/latitude/type',
                  instanceLocation: '#/latitude'
                }
              ]
            },
            {
              valid: false,
              keywordLocation: '#/properties/longitude',
              instanceLocation: '#/longitude',
              errors: [
                {
                  valid: false,
                  keywordLocation: '#/properties/longitude/type',
                  instanceLocation: '#/longitude',
                  error: 'Property must be of type number'
                }
              ]
            }
          ]
        }
      ]
    })

    test.end()
  })

tap.test(
  'should return basic error information given a schema with two errors',
  async (test) => {
    const schema: Schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      required: [ 'latitude', 'longitude' ],
      properties: {
        latitude: {
          type: 'number'
        },
        longitude: {
          type: 'number'
        }
      }
    }

    const document = {
      latitude: '50',
      longitude: '50'
    }

    const result: ValidationResult =
      await validate(ValidateOutputMode.Basic,
        schema, document, defaultResolver)

    test.false(result.valid, 'The object must not match the schema')
    test.strictSame(result.errors, [
      {
        instanceLocation: '#',
        keywordLocation: '#',
        error: 'A subschema had errors'
      },
      {
        instanceLocation: '#/latitude',
        keywordLocation: '#/properties/latitude',
        error: 'A subschema had errors'
      },
      {
        instanceLocation: '#/latitude',
        keywordLocation: '#/properties/latitude/type',
        error: 'Property must be of type number'
      },
      {
        instanceLocation: '#/longitude',
        keywordLocation: '#/properties/longitude',
        error: 'A subschema had errors'
      },
      {
        instanceLocation: '#/longitude',
        keywordLocation: '#/properties/longitude/type',
        error: 'Property must be of type number'
      }
    ], 'The validation results must return the correct error')

    test.end()
  })
