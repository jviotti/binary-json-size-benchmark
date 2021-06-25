"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var schema_1 = require("../../lib/schema");
tap_1.default.test('should compile a schema and evaluate a matching instance', function (test) {
    var schema = {
        type: 'object',
        required: ['foo'],
        additionalProperties: false,
        properties: {
            foo: {
                type: 'string'
            },
            baz: {
                type: 'object',
                required: ['qux'],
                properties: {
                    qux: {
                        type: 'array'
                    }
                }
            }
        }
    };
    var value = {
        foo: 'bar',
        baz: {
            qux: [1, 2]
        }
    };
    test.true(schema_1.validateSchema(schema, value));
    test.end();
});
tap_1.default.test('should compile a schema and evaluate a non-matching instance', function (test) {
    var schema = {
        type: 'object',
        required: ['foo'],
        additionalProperties: false,
        properties: {
            foo: {
                type: 'string'
            },
            baz: {
                type: 'object',
                required: ['qux'],
                properties: {
                    qux: {
                        type: 'array'
                    }
                }
            }
        }
    };
    var value = {
        foo: 'bar',
        baz: {
            qux: '11'
        }
    };
    test.false(schema_1.validateSchema(schema, value));
    test.end();
});
