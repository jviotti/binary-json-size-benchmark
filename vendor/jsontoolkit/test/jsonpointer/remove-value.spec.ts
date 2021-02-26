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
  JSONObject,
  JSONValue
} from '../../lib/json'

import {
  parsePointerString,
  Pointer,
  removeValue
} from '../../lib/jsonpointer'

interface RemovalTest {
  readonly title: string;
  readonly pointer: string;
  readonly document: JSONObject | JSONValue[];
  readonly expected: JSONObject | JSONValue[] | undefined;
}

const TEST_CASES: RemovalTest[] = [
  {
    title: 'top level property',
    pointer: '/bar',
    document: {
      foo: 'bar',
      bar: 'baz'
    },
    expected: {
      foo: 'bar'
    }
  },
  {
    title: 'nested property',
    pointer: '/bar/baz',
    document: {
      foo: 'bar',
      bar: {
        baz: 'foo',
        qux: 'bar'
      }
    },
    expected: {
      foo: 'bar',
      bar: {
        qux: 'bar'
      }
    }
  },
  {
    title: 'not found top level property',
    pointer: '/qux',
    document: {
      foo: 'bar',
      bar: 'baz'
    },
    expected: {
      foo: 'bar',
      bar: 'baz'
    }
  },
  {
    title: 'not found nested property',
    pointer: '/bar/baz',
    document: {
      foo: 'bar',
      bar: {
        bar: 'foo',
        qux: 'bar'
      }
    },
    expected: {
      foo: 'bar',
      bar: {
        bar: 'foo',
        qux: 'bar'
      }
    }
  },
  {
    title: 'not found nested property with non-existent element',
    pointer: '/bar/-',
    document: {
      foo: 'bar',
      bar: {
        bar: 'foo',
        qux: 'bar'
      }
    },
    expected: {
      foo: 'bar',
      bar: {
        bar: 'foo',
        qux: 'bar'
      }
    }
  },
  {
    title: 'not found pre-nested property',
    pointer: '/bax/baz',
    document: {
      foo: 'bar',
      bar: {
        bar: 'foo',
        qux: 'bar'
      }
    },
    expected: {
      foo: 'bar',
      bar: {
        bar: 'foo',
        qux: 'bar'
      }
    }
  },
  {
    title: 'top level array',
    pointer: '/1',
    document: [ 1, 2, 3 ],
    expected: [ 1, 3 ]
  },
  {
    title: 'top level out of bounds array',
    pointer: '/3',
    document: [ 1, 2, 3 ],
    expected: [ 1, 2, 3 ]
  },
  {
    title: 'nested array',
    pointer: '/foo/1',
    document: {
      foo: [ 1, 2, 3 ]
    },
    expected: {
      foo: [ 1, 3 ]
    }
  },
  {
    title: 'nested array with non-existent element',
    pointer: '/foo/-',
    document: {
      foo: [ 1, 2, 3 ]
    },
    expected: {
      foo: [ 1, 2, 3 ]
    }
  },
  {
    title: 'nested out of bounds array',
    pointer: '/foo/3',
    document: {
      foo: [ 1, 2, 3 ]
    },
    expected: {
      foo: [ 1, 2, 3 ]
    }
  },
  {
    title: 'nested invalid array',
    pointer: '/foo/1/foo',
    document: {
      foo: [ 1, 2, 3 ]
    },
    expected: {
      foo: [ 1, 2, 3 ]
    }
  },
  {
    title: 'nested invalid array with non-existent element',
    pointer: '/foo/-/foo',
    document: {
      foo: [ 1, 2, 3 ]
    },
    expected: {
      foo: [ 1, 2, 3 ]
    }
  }
]

for (const testCase of TEST_CASES) {
  tap.test(testCase.title, (test) => {
    const pointer: Pointer | null = parsePointerString(testCase.pointer)
    test.ok(pointer)
    if (pointer === null) {
      test.bailout('Could not parse pointer string')
      return
    }

    const document: JSONValue = testCase.document
    test.strictSame(removeValue(document, pointer), testCase.expected)
    test.strictSame(document, testCase.expected)
    test.end()
  })
}
