"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var canonical_1 = require("../../lib/preprocessor/canonical");
tap_1.default.test('should canonicalize an allOf with multiple integer schemas', function (test) {
    var result = canonical_1.canonicalizeSchema({
        allOf: [
            {
                type: 'integer'
            },
            {
                maximum: 4
            }
        ]
    });
    test.strictSame(result, {
        type: 'integer',
        maximum: 4
    });
    test.end();
});
tap_1.default.test('should canonicalize a multiple-type schema', function (test) {
    var result = canonical_1.canonicalizeSchema({
        type: ['object', 'integer', 'string'],
        maxLength: 15,
        minimum: 0,
        properties: {
            foo: {
                type: 'string'
            }
        }
    });
    test.strictSame(result, {
        anyOf: [
            {
                type: 'object',
                properties: {
                    foo: {
                        type: 'string'
                    }
                }
            },
            {
                type: 'integer',
                minimum: 0
            },
            {
                type: 'string',
                maxLength: 15
            }
        ]
    });
    test.end();
});
tap_1.default.test('should canonicalize a const schema', function (test) {
    var result = canonical_1.canonicalizeSchema({
        type: 'integer',
        minimum: 0,
        maximum: 10,
        multipleOf: 2,
        const: 4
    });
    test.strictSame(result, {
        const: 4
    });
    test.end();
});
tap_1.default.test('should canonicalize an enum schema', function (test) {
    var result = canonical_1.canonicalizeSchema({
        type: 'integer',
        minimum: 0,
        maximum: 10,
        multipleOf: 2,
        enum: [0, 2, 4, 6, 8, 10]
    });
    test.strictSame(result, {
        enum: [0, 2, 4, 6, 8, 10]
    });
    test.end();
});
tap_1.default.test('should canonicalize a oneOf schema', function (test) {
    var result = canonical_1.canonicalizeSchema({
        type: 'integer',
        oneOf: [
            {
                minimum: 0,
                const: 5
            },
            {
                maximum: 10,
                multipleOf: 2
            }
        ]
    });
    test.strictSame(result, {
        oneOf: [
            {
                const: 5
            },
            {
                type: 'integer',
                maximum: 10,
                multipleOf: 2
            }
        ]
    });
    test.end();
});
tap_1.default.test('should canonicalize a oneOf schema with one duplicated choice', function (test) {
    var result = canonical_1.canonicalizeSchema({
        oneOf: [
            {
                type: 'boolean'
            },
            {
                type: 'integer'
            },
            {
                type: 'boolean'
            }
        ]
    });
    test.strictSame(result, {
        oneOf: [
            {
                type: 'boolean'
            },
            {
                type: 'integer'
            }
        ]
    });
    test.end();
});
tap_1.default.test('should canonicalize a oneOf schema with one all duplicated choices', function (test) {
    var result = canonical_1.canonicalizeSchema({
        oneOf: [
            {
                type: 'boolean'
            },
            {
                type: 'boolean'
            },
            {
                type: 'boolean'
            }
        ]
    });
    test.strictSame(result, {
        type: 'boolean'
    });
    test.end();
});
tap_1.default.test('should canonicalize a oneOf schema lacking a type', function (test) {
    var result = canonical_1.canonicalizeSchema({
        oneOf: [
            {
                type: 'integer'
            },
            {
                minimum: 2
            }
        ]
    });
    test.strictSame(result, {
        oneOf: [
            {
                type: 'integer'
            },
            {
                anyOf: [
                    {
                        type: 'boolean'
                    },
                    {
                        type: 'integer',
                        minimum: 2
                    },
                    {
                        type: 'null'
                    },
                    {
                        type: 'number',
                        minimum: 2
                    },
                    {
                        type: 'string'
                    },
                    {
                        type: 'array'
                    },
                    {
                        type: 'object'
                    }
                ]
            }
        ]
    });
    test.end();
});
tap_1.default.test('should canonicalize an any array without a type', function (test) {
    var result = canonical_1.canonicalizeSchema({
        items: true
    });
    test.strictSame(result, {
        anyOf: [
            {
                type: 'boolean'
            },
            {
                type: 'integer',
            },
            {
                type: 'null'
            },
            {
                type: 'number'
            },
            {
                type: 'string'
            },
            {
                type: 'array',
                items: {}
            },
            {
                type: 'object'
            }
        ]
    });
    test.end();
});
tap_1.default.test('should canonicalize an any array with prefixItems and uniqueItems', function (test) {
    var result = canonical_1.canonicalizeSchema({
        prefixItems: [
            {
                type: 'boolean'
            },
            {
                type: 'boolean'
            }
        ],
        uniqueItems: false
    });
    test.strictSame(result, {
        anyOf: [
            {
                type: 'boolean'
            },
            {
                type: 'integer',
            },
            {
                type: 'null'
            },
            {
                type: 'number'
            },
            {
                type: 'string'
            },
            {
                type: 'array',
                prefixItems: [
                    {
                        type: 'boolean'
                    },
                    {
                        type: 'boolean'
                    }
                ]
            },
            {
                type: 'object'
            }
        ]
    });
    test.end();
});
tap_1.default.test('should canonicalize an any object with truthy properties', function (test) {
    var result = canonical_1.canonicalizeSchema({
        required: ['bar'],
        properties: {
            bar: true,
            baz: true
        }
    });
    test.strictSame(result, {
        anyOf: [
            {
                type: 'boolean'
            },
            {
                type: 'integer',
            },
            {
                type: 'null'
            },
            {
                type: 'number'
            },
            {
                type: 'string'
            },
            {
                type: 'array'
            },
            {
                type: 'object',
                required: ['bar'],
                properties: {
                    bar: {},
                    baz: {}
                }
            }
        ]
    });
    test.end();
});
