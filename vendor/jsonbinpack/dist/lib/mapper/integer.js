"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegerEncoding = exports.getIntegerStates = void 0;
var assert_1 = require("assert");
var lodash_1 = require("lodash");
var encoder_1 = require("../encoder");
var limits_1 = require("../utils/limits");
var getIntegerStates = function (schema) {
    if (typeof schema.maximum === 'number' &&
        typeof schema.minimum === 'number' &&
        typeof schema.multipleOf !== 'number') {
        if (schema.maximum - schema.minimum > limits_1.UINT8_MAX) {
            return schema.maximum - schema.minimum + 1;
        }
        return lodash_1.range(schema.minimum, schema.maximum + 1);
    }
    if (typeof schema.maximum === 'number' &&
        typeof schema.minimum === 'number' &&
        typeof schema.multipleOf === 'number') {
        var absoluteMultiplier_1 = Math.abs(schema.multipleOf);
        var closestMinimumMultiple = Math.ceil(schema.minimum / absoluteMultiplier_1) * absoluteMultiplier_1;
        var closestMaximumMultiple = Math.ceil(schema.maximum / -absoluteMultiplier_1) * -absoluteMultiplier_1;
        var enumMinimum = closestMinimumMultiple / absoluteMultiplier_1;
        var enumMaximum = closestMaximumMultiple / absoluteMultiplier_1;
        if (enumMaximum - enumMinimum > limits_1.UINT8_MAX) {
            return enumMaximum - enumMinimum + 1;
        }
        return lodash_1.range(enumMinimum, enumMaximum + 1).map(function (value) {
            return value * absoluteMultiplier_1;
        });
    }
    return Infinity;
};
exports.getIntegerStates = getIntegerStates;
var getIntegerEncoding = function (schema, _level) {
    assert_1.strict(typeof schema.minimum === 'undefined' ||
        typeof schema.maximum === 'undefined' ||
        schema.maximum >= schema.minimum);
    if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
        var absoluteMultiplier = Math.abs(schema.multipleOf);
        var closestMinimumMultiple = Math.ceil(schema.minimum / absoluteMultiplier) * absoluteMultiplier;
        var closestMaximumMultiple = Math.ceil(schema.maximum / -absoluteMultiplier) * -absoluteMultiplier;
        var enumMinimum = closestMinimumMultiple / absoluteMultiplier;
        var enumMaximum = closestMaximumMultiple / absoluteMultiplier;
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: enumMaximum - enumMinimum <= limits_1.UINT8_MAX
                ? 'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED'
                : 'BOUNDED_MULTIPLE__ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                maximum: schema.maximum,
                multiplier: schema.multipleOf
            }
        };
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: (schema.maximum - schema.minimum <= limits_1.UINT8_MAX)
                ? 'BOUNDED_8BITS__ENUM_FIXED' : 'BOUNDED__ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                maximum: schema.maximum
            }
        };
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'FLOOR_MULTIPLE__ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                multiplier: schema.multipleOf
            }
        };
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && !('multipleOf' in schema)) {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'FLOOR__ENUM_VARINT',
            options: {
                minimum: schema.minimum
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'ROOF_MULTIPLE__MIRROR_ENUM_VARINT',
            options: {
                maximum: schema.maximum,
                multiplier: schema.multipleOf
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'ROOF__MIRROR_ENUM_VARINT',
            options: {
                maximum: schema.maximum
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT',
            options: {
                multiplier: schema.multipleOf
            }
        };
    }
    return {
        type: encoder_1.EncodingType.Integer,
        encoding: 'ARBITRARY__ZIGZAG_VARINT',
        options: {}
    };
};
exports.getIntegerEncoding = getIntegerEncoding;
