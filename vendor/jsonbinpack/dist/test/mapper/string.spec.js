"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../lib/mapper");
var dictionaries_1 = require("../../lib/encoder/string/dictionaries");
tap_1.default.test('should encode an unbounded string with contentMediaType: text/plain', function (test) {
    var schema = {
        type: 'string',
        contentMediaType: 'text/plain'
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'STRING_DICTIONARY_COMPRESSOR',
        options: dictionaries_1.ENGLISH_DICTIONARY
    });
    test.end();
});
tap_1.default.test('should encode string with format: date', function (test) {
    var schema = {
        type: 'string',
        format: 'date'
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'RFC3339_DATE_INTEGER_TRIPLET',
        options: {}
    });
    test.end();
});
tap_1.default.test('should encode a simple string', function (test) {
    var schema = {
        type: 'string'
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
        options: {}
    });
    test.end();
});
tap_1.default.test('should encode a string with minLength', function (test) {
    var schema = {
        type: 'string',
        minLength: 5
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
        options: {
            minimum: 5
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with maxLength >= 255', function (test) {
    var schema = {
        type: 'string',
        maxLength: 256
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
        options: {
            maximum: 256
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with maxLength < 255', function (test) {
    var schema = {
        type: 'string',
        maxLength: 254
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
        options: {
            maximum: 254
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with maxLength = 255', function (test) {
    var schema = {
        type: 'string',
        maxLength: 255
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
        options: {
            maximum: 255
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with minLength and maxLength < 255', function (test) {
    var schema = {
        type: 'string',
        minLength: 100,
        maxLength: 300
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
        options: {
            minimum: 100,
            maximum: 300
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with minLength and maxLength > 255', function (test) {
    var schema = {
        type: 'string',
        minLength: 100,
        maxLength: 600
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT',
        options: {
            minimum: 100,
            maximum: 600
        }
    });
    test.end();
});
tap_1.default.test('should encode a markdown string', function (test) {
    var schema = {
        type: 'string',
        contentMediaType: 'text/markdown'
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'string',
        encoding: 'STRING_BROTLI',
        options: {}
    });
    test.end();
});
