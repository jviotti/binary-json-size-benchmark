"use strict";
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a, e_2, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var tap = require("tap");
var jsonpointer_1 = require("../../lib/jsonpointer");
var specTestDocument = {
    foo: ['bar', 'baz'],
    '': 0,
    'a/b': 1,
    'c%d': 2,
    'e^f': 3,
    'g|h': 4,
    'i\\j': 5,
    'k"l': 6,
    ' ': 7,
    'm~n': 8
};
var TESTS = [
    {
        pointer: '',
        expected: specTestDocument,
        uriFragment: '#',
        without: {
            foo: ['bar', 'baz'],
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
        expected: ['bar', 'baz'],
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
            foo: ['baz'],
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
            foo: ['bar', 'baz'],
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
            foo: ['bar', 'baz'],
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
            foo: ['bar', 'baz'],
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
            foo: ['bar', 'baz'],
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
            foo: ['bar', 'baz'],
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
            foo: ['bar', 'baz'],
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
            foo: ['bar', 'baz'],
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
            foo: ['bar', 'baz'],
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
            foo: ['bar', 'baz'],
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
];
var _loop_1 = function (specTest) {
    var input = JSON.stringify(specTest.pointer);
    var uriInput = JSON.stringify(specTest.uriFragment);
    tap.test("RFC6901: " + input + " is a pointer", function (test) {
        test.true(jsonpointer_1.isPointerString(specTest.pointer));
        test.end();
    });
    tap.test("RFC6901: " + input + " is not a URI pointer fragment", function (test) {
        test.false(jsonpointer_1.isPointerURIFragment(specTest.pointer));
        test.end();
    });
    tap.test("RFC6901: " + uriInput + " is a URI pointer fragment", function (test) {
        test.true(jsonpointer_1.isPointerURIFragment(specTest.uriFragment));
        test.end();
    });
    tap.test("RFC6901: " + uriInput + " is not a pointer", function (test) {
        test.false(jsonpointer_1.isPointerString(specTest.uriFragment));
        test.end();
    });
    var naiveFragment = "#" + specTest.pointer;
    if (specTest.uriFragment !== naiveFragment) {
        tap.test("RFC6901: \"" + naiveFragment + "\" is not a URI pointer fragment", function (test) {
            test.false(jsonpointer_1.isPointerURIFragment(naiveFragment));
            test.end();
        });
        tap.test([
            'RFC6901:',
            naiveFragment,
            'cannot be parsed as a URI pointer fragment'
        ].join(' '), function (test) {
            var pointer = jsonpointer_1.parsePointerURIFragment(naiveFragment);
            test.notOk(pointer);
            test.end();
        });
    }
    tap.test("RFC6901: " + input + " can be re-serialized", function (test) {
        var pointer = jsonpointer_1.parsePointerString(specTest.pointer);
        test.ok(pointer);
        if (pointer === null) {
            test.bailout('Could not parse pointer string');
            return;
        }
        var result = jsonpointer_1.serializePointerAsFragment(pointer);
        test.is(result, specTest.uriFragment);
        test.end();
    });
    tap.test([
        'RFC6901:',
        input,
        '->',
        JSON.stringify(specTest.expected)
    ].join(' '), function (test) {
        var pointer = jsonpointer_1.parsePointerString(specTest.pointer);
        test.ok(pointer);
        if (pointer === null) {
            test.bailout('Could not parse pointer string');
            return;
        }
        test.strictSame(jsonpointer_1.getValue(specTestDocument, pointer), specTest.expected);
        test.end();
    });
    tap.test([
        'RFC6901:',
        uriInput,
        '->',
        JSON.stringify(specTest.expected)
    ].join(' '), function (test) {
        var pointer = jsonpointer_1.parsePointerURIFragment(specTest.uriFragment);
        test.ok(pointer);
        if (pointer === null) {
            test.bailout('Could not parse pointer URI fragment string');
            return;
        }
        test.strictSame(jsonpointer_1.getValue(specTestDocument, pointer), specTest.expected);
        test.end();
    });
    tap.test([
        'RFC6901:',
        uriInput,
        'cannot be parsed as a pointer'
    ].join(' '), function (test) {
        var pointer = jsonpointer_1.parsePointerString(specTest.uriFragment);
        test.notOk(pointer);
        test.end();
    });
    tap.test([
        'RFC6901:',
        input,
        'cannot be parsed as a URI pointer fragment'
    ].join(' '), function (test) {
        var pointer = jsonpointer_1.parsePointerURIFragment(specTest.pointer);
        test.notOk(pointer);
        test.end();
    });
    tap.test([
        'RFC6901: remove',
        input
    ].join(' '), function (test) {
        var pointer = jsonpointer_1.parsePointerString(specTest.pointer);
        test.ok(pointer);
        if (pointer === null) {
            test.bailout('Could not parse pointer string');
            return;
        }
        // Given that removeValue() mutates the input object
        var document = JSON.parse(JSON.stringify(specTestDocument));
        test.strictSame(jsonpointer_1.removeValue(document, pointer), specTest.without);
        test.strictSame(document, specTest.without);
        test.end();
    });
};
try {
    for (var TESTS_1 = __values(TESTS), TESTS_1_1 = TESTS_1.next(); !TESTS_1_1.done; TESTS_1_1 = TESTS_1.next()) {
        var specTest = TESTS_1_1.value;
        _loop_1(specTest);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (TESTS_1_1 && !TESTS_1_1.done && (_a = TESTS_1.return)) _a.call(TESTS_1);
    }
    finally { if (e_1) throw e_1.error; }
}
var _loop_2 = function (pointer) {
    var title = [
        'indexes with leading zeroes are not allowed:',
        JSON.stringify(pointer)
    ].join(' ');
    tap.test("RFC6901: " + title, function (test) {
        test.false(jsonpointer_1.isPointerString(pointer));
        test.notOk(jsonpointer_1.parsePointerString(pointer));
        test.end();
    });
};
try {
    /*
     * Indexes with leading zeroes are not allowed.
     * See https://tools.ietf.org/html/rfc6901#section-4
     */
    for (var _c = __values([
        '/foo/bar/01',
        '/foo/bar/0001',
        '/foo/0002',
        '/0003'
    ]), _d = _c.next(); !_d.done; _d = _c.next()) {
        var pointer = _d.value;
        _loop_2(pointer);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
    }
    finally { if (e_2) throw e_2.error; }
}
tap.test('RFC6901: cannot get a non-index reference of an array', function (test) {
    var pointer = jsonpointer_1.parsePointerString('/foo/bar');
    test.ok(pointer);
    if (pointer === null) {
        test.bailout('Could not parse pointer string');
        return;
    }
    var document = {
        foo: [1, 2, 3]
    };
    test.strictSame(jsonpointer_1.getValue(document, pointer), undefined);
    test.end();
});
tap.test('RFC6901: cannot get an index reference of an object', function (test) {
    var pointer = jsonpointer_1.parsePointerString('/foo/1');
    test.ok(pointer);
    if (pointer === null) {
        test.bailout('Could not parse pointer string');
        return;
    }
    var document = {
        foo: {
            bar: 'baz'
        }
    };
    test.strictSame(jsonpointer_1.getValue(document, pointer), undefined);
    test.end();
});
tap.test('RFC6901: cannot get an out of bounds array index', function (test) {
    var pointer = jsonpointer_1.parsePointerString('/foo/3');
    test.ok(pointer);
    if (pointer === null) {
        test.bailout('Could not parse pointer string');
        return;
    }
    var document = {
        foo: [1, 2, 3]
    };
    test.strictSame(jsonpointer_1.getValue(document, pointer), undefined);
    test.end();
});
tap.test('RFC6901: cannot include a negative index', function (test) {
    var pointer = jsonpointer_1.parsePointerString('/foo/-1');
    test.notOk(pointer);
    test.end();
});
//# sourceMappingURL=rfc6901.spec.js.map