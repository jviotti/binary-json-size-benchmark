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

import tap from 'tap'

import {
  EncodingSchema
} from '../../lib/schema'

import {
  Encoding,
  getStates,
  getEncoding
} from '../../lib/mapper'

tap.test('should encode a bounded object with only required keys', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    required: [ 'foo', 'bar' ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
    options: {
      booleanRequiredProperties: [],
      propertyEncodings: {
        foo: {
          type: 'any',
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        },
        bar: {
          type: 'any',
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        }
      },
      requiredProperties: [ 'bar', 'foo' ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with required keys and empty properties', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {},
    required: [ 'foo', 'bar' ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
    options: {
      booleanRequiredProperties: [],
      propertyEncodings: {
        foo: {
          type: 'any',
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        },
        bar: {
          type: 'any',
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        }
      },
      requiredProperties: [ 'bar', 'foo' ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with partially defined required keys', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    required: [ 'foo', 'bar' ],
    properties: {
      foo: {
        type: 'string',
        maxLength: 5
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
    options: {
      booleanRequiredProperties: [],
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        },
        bar: {
          type: 'any',
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        }
      },
      requiredProperties: [ 'bar', 'foo' ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with fully defined required keys', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    required: [ 'foo', 'bar' ],
    properties: {
      bar: {
        type: 'string'
      },
      foo: {
        type: 'string',
        maxLength: 5
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
    options: {
      booleanRequiredProperties: [],
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        },
        bar: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        }
      },
      requiredProperties: [ 'bar', 'foo' ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with no required nor optionals', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    {}
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        {}
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with optional properties', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      foo: {
        type: 'string',
        maxLength: 5
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
    options: {
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        }
      },
      optionalProperties: [ 'foo' ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with more than one optional keys', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      bar: {
        type: 'string'
      },
      foo: {
        type: 'string',
        maxLength: 5
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
    options: {
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        },
        bar: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        }
      },
      optionalProperties: [ 'bar', 'foo' ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with more than one optional keys and empty required', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
      bar: {
        type: 'string'
      },
      foo: {
        type: 'string',
        maxLength: 5
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
    options: {
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        },
        bar: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        }
      },
      optionalProperties: [ 'bar', 'foo' ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with an optional and a required property', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    required: [ 'bar' ],
    properties: {
      foo: {
        type: 'string',
        maxLength: 5
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'MIXED_BOUNDED_TYPED_OBJECT',
    options: {
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        },
        bar: {
          type: 'any',
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        }
      },
      optionalProperties: [ 'foo' ],
      booleanRequiredProperties: [],
      requiredProperties: [ 'bar' ]
    }
  })

  test.end()
})

tap.test('should encode a bounded object with an optional and a typed required property', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    required: [ 'bar' ],
    properties: {
      bar: {
        type: 'string'
      },
      foo: {
        type: 'string',
        maxLength: 5
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'MIXED_BOUNDED_TYPED_OBJECT',
    options: {
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        },
        bar: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        }
      },
      optionalProperties: [ 'foo' ],
      booleanRequiredProperties: [],
      requiredProperties: [ 'bar' ]
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object', (test) => {
  const schema: EncodingSchema = {
    type: 'object'
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
    options: {
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      },
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with empty required', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    required: []
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
    options: {
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      },
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with additionalProperties: true', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: true
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
    options: {
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      },
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with additionalProperties: schema', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: {
      type: 'string'
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
    options: {
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      },
      encoding: {
        type: 'string',
        encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
        options: {
          minimum: 0
        }
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with propertyNames', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    propertyNames: {
      type: 'string',
      maxLength: 5
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
    options: {
      keyEncoding: {
        type: 'string',
        encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
        options: {
          minimum: 0,
          maximum: 5
        }
      },
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with propertyNames and additionalProperties: true', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: true,
    propertyNames: {
      type: 'string',
      maxLength: 5
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
    options: {
      keyEncoding: {
        type: 'string',
        encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
        options: {
          minimum: 0,
          maximum: 5
        }
      },
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with propertyNames and additionalProperties: schema', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: {
      type: 'string'
    },
    propertyNames: {
      type: 'string',
      maxLength: 5
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
    options: {
      keyEncoding: {
        type: 'string',
        encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
        options: {
          minimum: 0,
          maximum: 5
        }
      },
      encoding: {
        type: 'string',
        encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
        options: {
          minimum: 0
        }
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with a required property', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    required: [ 'foo' ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT',
    options: {
      requiredProperties: [ 'foo' ],
      booleanRequiredProperties: [],
      propertyEncodings: {
        foo: {
          type: 'any',
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        }
      },
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      },
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with a required typed property', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    required: [ 'foo' ],
    properties: {
      foo: {
        type: 'string'
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT',
    options: {
      requiredProperties: [ 'foo' ],
      booleanRequiredProperties: [],
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        }
      },
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      },
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a simple unbounded object with two optional properties', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    properties: {
      foo: {
        type: 'string'
      },
      bar: {
        type: 'string',
        maxLength: 5
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'OPTIONAL_UNBOUNDED_TYPED_OBJECT',
    options: {
      optionalProperties: [ 'bar', 'foo' ],
      propertyEncodings: {
        foo: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        },
        bar: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        }
      },
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      },
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a complex unbounded object', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    required: [ 'foo', 'bar' ],
    additionalProperties: {
      type: 'integer'
    },
    propertyNames: {
      type: 'string',
      minLength: 3
    },
    properties: {
      bar: {
        type: 'string',
        maxLength: 5
      },
      baz: {
        type: 'string'
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'MIXED_UNBOUNDED_TYPED_OBJECT',
    options: {
      optionalProperties: [ 'baz' ],
      requiredProperties: [ 'bar', 'foo' ],
      booleanRequiredProperties: [],
      propertyEncodings: {
        foo: {
          type: 'integer',
          encoding: 'ARBITRARY__ZIGZAG_VARINT',
          options: {}
        },
        bar: {
          type: 'string',
          encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            minimum: 0,
            maximum: 5
          }
        },
        baz: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        }
      },
      keyEncoding: {
        type: 'string',
        encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
        options: {
          minimum: 3
        }
      },
      encoding: {
        type: 'integer',
        encoding: 'ARBITRARY__ZIGZAG_VARINT',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode a bounded object with only boolean required keys', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    required: [ 'foo', 'bar' ],
    properties: {
      foo: {
        type: 'boolean'
      },
      bar: {
        type: 'boolean'
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    {
      foo: false,
      bar: false
    },
    {
      foo: false,
      bar: true
    },
    {
      foo: true,
      bar: false
    },
    {
      foo: true,
      bar: true
    }
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        {
          foo: false,
          bar: false
        },
        {
          foo: false,
          bar: true
        },
        {
          foo: true,
          bar: false
        },
        {
          foo: true,
          bar: true
        }
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded property with a single required boolean', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    required: [ 'jsx' ],
    additionalProperties: false,
    properties: {
      jsx: {
        type: 'boolean'
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    {
      jsx: false
    },
    {
      jsx: true
    }
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        {
          jsx: false
        },
        {
          jsx: true
        }
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded property with a single boolean', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      jsx: {
        type: 'boolean'
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    {
      jsx: false
    },
    {
      jsx: true
    },
    {}
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        {
          jsx: false
        },
        {
          jsx: true
        },
        {}
      ]
    }
  })

  test.end()
})

tap.test('should encode an unbounded object with bounded integers', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    additionalProperties: {
      type: 'integer',
      minimum: 0,
      maximum: 2
    },
    required: [ 'foo', 'bar', 'baz', 'name', 'qux', 'extra', 'flag' ],
    properties: {
      name: {
        type: 'string'
      },
      age: {
        type: 'integer',
        minimum: 0
      },
      extra: {
        type: 'integer',
        minimum: 0,
        maximum: 2
      },
      flag: {
        type: 'boolean'
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'PACKED_UNBOUNDED_OBJECT',
    options: {
      packedRequiredProperties: [ 'bar', 'baz', 'extra', 'foo', 'qux' ],
      packedEncoding: {
        type: 'integer',
        encoding: 'BOUNDED_8BITS__ENUM_FIXED',
        options: {
          minimum: 0,
          maximum: 2
        }
      },
      propertyEncodings: {
        name: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        },
        age: {
          type: 'integer',
          encoding: 'FLOOR__ENUM_VARINT',
          options: {
            minimum: 0
          }
        },
        flag: {
          type: 'boolean',
          encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
          options: {}
        }
      },
      optionalProperties: [ 'age' ],
      requiredProperties: [ 'name' ],
      booleanRequiredProperties: [ 'flag' ],
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode an unbounded object with bounded integers with maxProperties > length', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    maxProperties: 8,
    additionalProperties: {
      type: 'integer',
      minimum: 0,
      maximum: 2
    },
    required: [ 'foo', 'bar', 'baz', 'name', 'qux', 'extra', 'flag' ],
    properties: {
      name: {
        type: 'string'
      },
      extra: {
        type: 'integer',
        minimum: 0,
        maximum: 2
      },
      flag: {
        type: 'boolean'
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'PACKED_UNBOUNDED_OBJECT',
    options: {
      packedRequiredProperties: [ 'bar', 'baz', 'extra', 'foo', 'qux' ],
      packedEncoding: {
        type: 'integer',
        encoding: 'BOUNDED_8BITS__ENUM_FIXED',
        options: {
          minimum: 0,
          maximum: 2
        }
      },
      propertyEncodings: {
        name: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        },
        flag: {
          type: 'boolean',
          encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
          options: {}
        }
      },
      optionalProperties: [],
      requiredProperties: [ 'name' ],
      booleanRequiredProperties: [ 'flag' ],
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      }
    }
  })

  test.end()
})

tap.test('should encode an unbounded object with bounded integers with maxProperties = length', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    maxProperties: 7,
    additionalProperties: {
      type: 'integer',
      minimum: 0,
      maximum: 2
    },
    required: [ 'foo', 'bar', 'baz', 'name', 'qux', 'extra', 'flag' ],
    properties: {
      name: {
        type: 'string'
      },
      extra: {
        type: 'integer',
        minimum: 0,
        maximum: 2
      },
      flag: {
        type: 'boolean'
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'PACKED_BOUNDED_REQUIRED_OBJECT',
    options: {
      packedRequiredProperties: [ 'bar', 'baz', 'extra', 'foo', 'qux' ],
      packedEncoding: {
        type: 'integer',
        encoding: 'BOUNDED_8BITS__ENUM_FIXED',
        options: {
          minimum: 0,
          maximum: 2
        }
      },
      propertyEncodings: {
        name: {
          type: 'string',
          encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
          options: {
            minimum: 0
          }
        },
        flag: {
          type: 'boolean',
          encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
          options: {}
        }
      },
      requiredProperties: [ 'name' ],
      booleanRequiredProperties: [ 'flag' ]
    }
  })

  test.end()
})
