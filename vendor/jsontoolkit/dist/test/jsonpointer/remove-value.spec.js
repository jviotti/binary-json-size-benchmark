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
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tap = require("tap");
var jsonpointer_1 = require("../../lib/jsonpointer");
var TEST_CASES = [
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
        document: [1, 2, 3],
        expected: [1, 3]
    },
    {
        title: 'top level out of bounds array',
        pointer: '/3',
        document: [1, 2, 3],
        expected: [1, 2, 3]
    },
    {
        title: 'nested array',
        pointer: '/foo/1',
        document: {
            foo: [1, 2, 3]
        },
        expected: {
            foo: [1, 3]
        }
    },
    {
        title: 'nested array with non-existent element',
        pointer: '/foo/-',
        document: {
            foo: [1, 2, 3]
        },
        expected: {
            foo: [1, 2, 3]
        }
    },
    {
        title: 'nested out of bounds array',
        pointer: '/foo/3',
        document: {
            foo: [1, 2, 3]
        },
        expected: {
            foo: [1, 2, 3]
        }
    },
    {
        title: 'nested invalid array',
        pointer: '/foo/1/foo',
        document: {
            foo: [1, 2, 3]
        },
        expected: {
            foo: [1, 2, 3]
        }
    },
    {
        title: 'nested invalid array with non-existent element',
        pointer: '/foo/-/foo',
        document: {
            foo: [1, 2, 3]
        },
        expected: {
            foo: [1, 2, 3]
        }
    }
];
var _loop_1 = function (testCase) {
    tap.test(testCase.title, function (test) {
        var pointer = jsonpointer_1.parsePointerString(testCase.pointer);
        test.ok(pointer);
        if (pointer === null) {
            test.bailout('Could not parse pointer string');
            return;
        }
        var document = testCase.document;
        test.strictSame(jsonpointer_1.removeValue(document, pointer), testCase.expected);
        test.strictSame(document, testCase.expected);
        test.end();
    });
};
try {
    for (var TEST_CASES_1 = __values(TEST_CASES), TEST_CASES_1_1 = TEST_CASES_1.next(); !TEST_CASES_1_1.done; TEST_CASES_1_1 = TEST_CASES_1.next()) {
        var testCase = TEST_CASES_1_1.value;
        _loop_1(testCase);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (TEST_CASES_1_1 && !TEST_CASES_1_1.done && (_a = TEST_CASES_1.return)) _a.call(TEST_CASES_1);
    }
    finally { if (e_1) throw e_1.error; }
}
//# sourceMappingURL=remove-value.spec.js.map