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
Object.defineProperty(exports, "__esModule", { value: true });
var tap = require("tap");
var jsonpointer_1 = require("../../lib/jsonpointer");
tap.test('should not allow ~ on a reference token with ~0', function (test) {
    test.false(jsonpointer_1.isPointerString('/foo/~0~/a'));
    test.end();
});
tap.test('should parse an absolute pointer with a hash in the base', function (test) {
    var result = jsonpointer_1.parseURI('http://localhost:1234/nested.json#foo#/allOf/0/type');
    test.is(result.baseUri, 'http://localhost:1234/nested.json#foo');
    test.strictSame(result.pointer, ['allOf', 0, 'type']);
    test.end();
});
tap.test('should access an element with square and curly braces', function (test) {
    var value = {
        patternProperties: {
            '[0-9]{2,}': {
                type: 'boolean'
            }
        }
    };
    var pointerString = jsonpointer_1.serializePointerAsFragment(['patternProperties', '[0-9]{2,}', 'type']);
    var pointer = jsonpointer_1.parsePointerURIFragment(pointerString);
    if (pointer === null) {
        test.bailout('Pointer is invalid');
        return;
    }
    var result = jsonpointer_1.getValue(value, pointer);
    test.is(result, 'boolean');
    test.end();
});
tap.test('should access an element with a new line', function (test) {
    var value = {
        foo: {
            'foo\nbar': 1
        }
    };
    var pointerString = jsonpointer_1.serializePointerAsFragment(['foo', 'foo\nbar']);
    var pointer = jsonpointer_1.parsePointerURIFragment(pointerString);
    if (pointer === null) {
        test.bailout('Pointer is invalid');
        return;
    }
    var result = jsonpointer_1.getValue(value, pointer);
    test.is(result, 1);
    test.end();
});
tap.test('should access an element with a new line and a UTF-16 surrogate pair', function (test) {
    var value = {
        foo: {
            '🐲foo\nbar': 1
        }
    };
    var pointerString = jsonpointer_1.serializePointerAsFragment(['foo', '🐲foo\nbar']);
    var pointer = jsonpointer_1.parsePointerURIFragment(pointerString);
    if (pointer === null) {
        test.bailout('Pointer is invalid');
        return;
    }
    var result = jsonpointer_1.getValue(value, pointer);
    test.is(result, 1);
    test.end();
});
tap.test('should allow pure UTF-16 fragments', function (test) {
    var value = {
        foo: {
            '🐲': 1
        }
    };
    var pointer = jsonpointer_1.parsePointerURIFragment('#/foo/🐲');
    if (pointer === null) {
        test.bailout('Pointer is invalid');
        return;
    }
    var result = jsonpointer_1.getValue(value, pointer);
    test.is(result, 1);
    test.end();
});
tap.test('should allow pure multi-character UTF-16 fragments', function (test) {
    var value = {
        foo: {
            '🐲🐲🐲': 1
        }
    };
    var pointer = jsonpointer_1.parsePointerURIFragment('#/foo/🐲🐲🐲');
    if (pointer === null) {
        test.bailout('Pointer is invalid');
        return;
    }
    var result = jsonpointer_1.getValue(value, pointer);
    test.is(result, 1);
    test.end();
});
tap.test('should allow partial UTF-16 fragments that do not need encoding', function (test) {
    var value = {
        foo: {
            'a🐲a': 1
        }
    };
    var pointer = jsonpointer_1.parsePointerURIFragment('#/foo/a🐲a');
    if (pointer === null) {
        test.bailout('Pointer is invalid');
        return;
    }
    var result = jsonpointer_1.getValue(value, pointer);
    test.is(result, 1);
    test.end();
});
tap.test('should allow partial UTF-16 fragments that need encoding', function (test) {
    var value = {
        foo: {
            '^🐲': 1
        }
    };
    var pointer = jsonpointer_1.parsePointerURIFragment('#/foo/%5E🐲');
    if (pointer === null) {
        test.bailout('Pointer is invalid');
        return;
    }
    var result = jsonpointer_1.getValue(value, pointer);
    test.is(result, 1);
    test.end();
});
tap.test('should fail to consider UTF-16 fragments with non encoded values', function (test) {
    test.false(jsonpointer_1.isPointerURIFragment('#/foo/^🐲'));
    test.end();
});
tap.test('should consider UTF-16 fragments with non encoded values', function (test) {
    test.true(jsonpointer_1.isPointerURIFragment('#/foo/%5E🐲'));
    test.end();
});
//# sourceMappingURL=index.spec.js.map