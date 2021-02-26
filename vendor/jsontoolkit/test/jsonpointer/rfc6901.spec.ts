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
  Pointer,
  serializePointerAsFragment,
  isPointerString,
  isPointerURIFragment,
  parsePointerString,
  parsePointerURIFragment,
  getValue,
  removeValue
} from '../../lib/jsonpointer'

/*
 * These set of JSON Pointer test cases are derived
 * directly from the standard.
 * See https://tools.ietf.org/html/rfc6901#section-5
 */

interface SpecTest {
  readonly pointer: string;
  readonly expected: JSONValue;
  readonly without: JSONObject;

  // The URI Fragment version of the pointer.
  // See https://tools.ietf.org/html/rfc6901#section-6
  readonly uriFragment: string;
}

const specTestDocument: JSONObject = {
  foo: [ 'bar', 'baz' ],
  '': 0,
  'a/b': 1,
  'c%d': 2,
  'e^f': 3,
  'g|h': 4,
  'i\\j': 5,
  'k"l': 6,
  ' ': 7,
  'm~n': 8
}

const TESTS: SpecTest[] = [
  {
    pointer: '',
    expected: specTestDocument,
    uriFragment: '#',
    without: {
      foo: [ 'bar', 'baz' ],
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/foo',
    expected: [ 'bar', 'baz' ],
    uriFragment: '#/foo',
    without: {
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/foo/0',
    expected: 'bar',
    uriFragment: '#/foo/0',
    without: {
      foo: [ 'baz' ],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/',
    expected: 0,
    uriFragment: '#/',
    without: {
      foo: [ 'bar', 'baz' ],
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/a~1b',
    expected: 1,
    uriFragment: '#/a~1b',
    without: {
      foo: [ 'bar', 'baz' ],
      '': 0,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/c%d',
    expected: 2,
    uriFragment: '#/c%25d',
    without: {
      foo: [ 'bar', 'baz' ],
      '': 0,
      'a/b': 1,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/e^f',
    expected: 3,
    uriFragment: '#/e%5Ef',
    without: {
      foo: [ 'bar', 'baz' ],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/g|h',
    expected: 4,
    uriFragment: '#/g%7Ch',
    without: {
      foo: [ 'bar', 'baz' ],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/i\\j',
    expected: 5,
    uriFragment: '#/i%5Cj',
    without: {
      foo: [ 'bar', 'baz' ],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'k"l': 6,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/k"l',
    expected: 6,
    uriFragment: '#/k%22l',
    without: {
      foo: [ 'bar', 'baz' ],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      ' ': 7,
      'm~n': 8
    }
  },
  {
    pointer: '/ ',
    expected: 7,
    uriFragment: '#/%20',
    without: {
      foo: [ 'bar', 'baz' ],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      'm~n': 8
    }
  },
  {
    pointer: '/m~0n',
    expected: 8,
    uriFragment: '#/m~0n',
    without: {
      foo: [ 'bar', 'baz' ],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7
    }
  }
]

for (const specTest of TESTS) {
  const input = JSON.stringify(specTest.pointer)
  const uriInput = JSON.stringify(specTest.uriFragment)

  tap.test(`RFC6901: ${input} is a pointer`, (test) => {
    test.true(isPointerString(specTest.pointer))
    test.end()
  })

  tap.test(`RFC6901: ${input} is not a URI pointer fragment`, (test) => {
    test.false(isPointerURIFragment(specTest.pointer))
    test.end()
  })

  tap.test(`RFC6901: ${uriInput} is a URI pointer fragment`, (test) => {
    test.true(isPointerURIFragment(specTest.uriFragment))
    test.end()
  })

  tap.test(`RFC6901: ${uriInput} is not a pointer`, (test) => {
    test.false(isPointerString(specTest.uriFragment))
    test.end()
  })

  const naiveFragment = `#${specTest.pointer}`
  if (specTest.uriFragment !== naiveFragment) {
    tap.test(
      `RFC6901: "${naiveFragment}" is not a URI pointer fragment`, (test) => {
        test.false(isPointerURIFragment(naiveFragment))
        test.end()
      })

    tap.test([
      'RFC6901:',
      naiveFragment,
      'cannot be parsed as a URI pointer fragment'
    ].join(' '), (test) => {
      const pointer: Pointer | null = parsePointerURIFragment(naiveFragment)
      test.notOk(pointer)
      test.end()
    })
  }

  tap.test(`RFC6901: ${input} can be re-serialized`, (test) => {
    const pointer: Pointer | null = parsePointerString(specTest.pointer)
    test.ok(pointer)

    if (pointer === null) {
      test.bailout('Could not parse pointer string')
      return
    }

    const result: string = serializePointerAsFragment(pointer)
    test.is(result, specTest.uriFragment)

    test.end()
  })

  tap.test([
    'RFC6901:',
    input,
    '->',
    JSON.stringify(specTest.expected)
  ].join(' '), (test) => {
    const pointer: Pointer | null = parsePointerString(specTest.pointer)
    test.ok(pointer)

    if (pointer === null) {
      test.bailout('Could not parse pointer string')
      return
    }

    test.strictSame(getValue(specTestDocument, pointer), specTest.expected)
    test.end()
  })

  tap.test([
    'RFC6901:',
    uriInput,
    '->',
    JSON.stringify(specTest.expected)
  ].join(' '), (test) => {
    const pointer: Pointer | null =
      parsePointerURIFragment(specTest.uriFragment)
    test.ok(pointer)

    if (pointer === null) {
      test.bailout('Could not parse pointer URI fragment string')
      return
    }

    test.strictSame(getValue(specTestDocument, pointer), specTest.expected)
    test.end()
  })

  tap.test([
    'RFC6901:',
    uriInput,
    'cannot be parsed as a pointer'
  ].join(' '), (test) => {
    const pointer: Pointer | null = parsePointerString(specTest.uriFragment)
    test.notOk(pointer)
    test.end()
  })

  tap.test([
    'RFC6901:',
    input,
    'cannot be parsed as a URI pointer fragment'
  ].join(' '), (test) => {
    const pointer: Pointer | null = parsePointerURIFragment(specTest.pointer)
    test.notOk(pointer)
    test.end()
  })

  tap.test([
    'RFC6901: remove',
    input
  ].join(' '), (test) => {
    const pointer: Pointer | null = parsePointerString(specTest.pointer)
    test.ok(pointer)

    if (pointer === null) {
      test.bailout('Could not parse pointer string')
      return
    }

    // Given that removeValue() mutates the input object
    const document: JSONObject = JSON.parse(JSON.stringify(specTestDocument))

    test.strictSame(removeValue(document, pointer), specTest.without)
    test.strictSame(document, specTest.without)
    test.end()
  })
}

/*
 * Indexes with leading zeroes are not allowed.
 * See https://tools.ietf.org/html/rfc6901#section-4
 */

for (const pointer of [
  '/foo/bar/01',
  '/foo/bar/0001',
  '/foo/0002',
  '/0003'
]) {
  const title = [
    'indexes with leading zeroes are not allowed:',
    JSON.stringify(pointer)
  ].join(' ')

  tap.test(`RFC6901: ${title}`, (test) => {
    test.false(isPointerString(pointer))
    test.notOk(parsePointerString(pointer))
    test.end()
  })
}

tap.test('RFC6901: cannot get a non-index reference of an array', (test) => {
  const pointer: Pointer | null = parsePointerString('/foo/bar')
  test.ok(pointer)

  if (pointer === null) {
    test.bailout('Could not parse pointer string')
    return
  }

  const document: JSONObject = {
    foo: [ 1, 2, 3 ]
  }

  test.strictSame(getValue(document, pointer), undefined)
  test.end()
})

tap.test('RFC6901: cannot get an index reference of an object', (test) => {
  const pointer: Pointer | null = parsePointerString('/foo/1')
  test.ok(pointer)

  if (pointer === null) {
    test.bailout('Could not parse pointer string')
    return
  }

  const document: JSONObject = {
    foo: {
      bar: 'baz'
    }
  }

  test.strictSame(getValue(document, pointer), undefined)
  test.end()
})

tap.test('RFC6901: cannot get an out of bounds array index', (test) => {
  const pointer: Pointer | null = parsePointerString('/foo/3')
  test.ok(pointer)

  if (pointer === null) {
    test.bailout('Could not parse pointer string')
    return
  }

  const document: JSONObject = {
    foo: [ 1, 2, 3 ]
  }

  test.strictSame(getValue(document, pointer), undefined)
  test.end()
})

tap.test('RFC6901: cannot include a negative index', (test) => {
  const pointer: Pointer | null = parsePointerString('/foo/-1')
  test.notOk(pointer)
  test.end()
})
