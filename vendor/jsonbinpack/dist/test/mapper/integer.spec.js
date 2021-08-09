"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var lodash_1 = require("lodash");
var mapper_1 = require("../../lib/mapper");
tap_1.default.test('should encode an 8-bit integer with minimum, maximum, and multiplier', function (test) {
    var schema = {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        multipleOf: 5
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.strictSame(mapper_1.getStates(schema), lodash_1.range(-100, 105, 5));
    test.strictSame(result, {
        type: 'integer',
        encoding: 'BOUNDED_MULTIPLE_8BITS_ENUM_FIXED',
        options: {
            minimum: -100,
            maximum: 100,
            multiplier: 5
        }
    });
    test.end();
});
tap_1.default.test('should encode an integer with minimum, maximum, and multiplier', function (test) {
    var schema = {
        type: 'integer',
        minimum: -100,
        maximum: 10000,
        multipleOf: 5
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), 2021);
    test.strictSame(result, {
        type: 'integer',
        encoding: 'FLOOR_MULTIPLE_ENUM_VARINT',
        options: {
            minimum: -100,
            multiplier: 5
        }
    });
    test.end();
});
tap_1.default.test('should encode an arbitrary integer', function (test) {
    var schema = {
        type: 'integer'
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'integer',
        encoding: 'ARBITRARY_ZIGZAG_VARINT',
        options: {}
    });
    test.end();
});
tap_1.default.test('should encode an arbitrary integer with multipleOf', function (test) {
    var schema = {
        type: 'integer',
        multipleOf: 5
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'integer',
        encoding: 'ARBITRARY_MULTIPLE_ZIGZAG_VARINT',
        options: {
            multiplier: 5
        }
    });
    test.end();
});
tap_1.default.test('should encode an integer with minimum', function (test) {
    var schema = {
        type: 'integer',
        minimum: 0
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'integer',
        encoding: 'FLOOR_ENUM_VARINT',
        options: {
            minimum: 0
        }
    });
    test.end();
});
tap_1.default.test('should encode an integer with minimum and multipleOf', function (test) {
    var schema = {
        type: 'integer',
        minimum: 0,
        multipleOf: 5
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'integer',
        encoding: 'FLOOR_MULTIPLE_ENUM_VARINT',
        options: {
            minimum: 0,
            multiplier: 5
        }
    });
    test.end();
});
tap_1.default.test('should encode an integer with maximum', function (test) {
    var schema = {
        type: 'integer',
        maximum: 100
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'integer',
        encoding: 'ROOF_MIRROR_ENUM_VARINT',
        options: {
            maximum: 100
        }
    });
    test.end();
});
tap_1.default.test('should encode an integer with maximum and multipleOf', function (test) {
    var schema = {
        type: 'integer',
        maximum: 100,
        multipleOf: 5
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), Infinity);
    test.strictSame(result, {
        type: 'integer',
        encoding: 'ROOF_MULTIPLE_MIRROR_ENUM_VARINT',
        options: {
            maximum: 100,
            multiplier: 5
        }
    });
    test.end();
});
tap_1.default.test('should encode an 8-bit integer with minimum and maximum', function (test) {
    var schema = {
        type: 'integer',
        minimum: -100,
        maximum: 100
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.strictSame(mapper_1.getStates(schema), lodash_1.range(-100, 101));
    test.strictSame(result, {
        type: 'integer',
        encoding: 'BOUNDED_8BITS_ENUM_FIXED',
        options: {
            minimum: -100,
            maximum: 100
        }
    });
    test.end();
});
tap_1.default.test('should encode an >8-bit integer with minimum and maximum', function (test) {
    var schema = {
        type: 'integer',
        minimum: -100,
        maximum: 100000
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema), 100101);
    test.strictSame(result, {
        type: 'integer',
        encoding: 'FLOOR_ENUM_VARINT',
        options: {
            minimum: -100
        }
    });
    test.end();
});
