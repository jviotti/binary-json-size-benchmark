"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLOOR_TYPED_LENGTH_PREFIX = exports.ROOF_TYPED_LENGTH_PREFIX = exports.BOUNDED_8BITS_TYPED_LENGTH_PREFIX = exports.BOUNDED_TYPED_LENGTH_PREFIX = exports.FIXED_TYPED_ARRAY = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var index_1 = require("../index");
var limits_1 = require("../../utils/limits");
var decodeArray = function (buffer, offset, bytesWritten, length, prefixEncodings, defaultEncoding) {
    var _a;
    var index = 0;
    var cursor = offset + bytesWritten;
    var result = [];
    while (index < length) {
        var encoding = (_a = prefixEncodings[index]) !== null && _a !== void 0 ? _a : defaultEncoding;
        var elementResult = index_1.decode(buffer, cursor, encoding);
        cursor += elementResult.bytes;
        result.push(elementResult.value);
        index += 1;
    }
    return {
        value: result,
        bytes: cursor - (offset + bytesWritten) + bytesWritten
    };
};
var FIXED_TYPED_ARRAY = function (buffer, offset, options) {
    assert_1.strict(options.size >= 0);
    return decodeArray(buffer, offset, 0, options.size, options.prefixEncodings, options.encoding);
};
exports.FIXED_TYPED_ARRAY = FIXED_TYPED_ARRAY;
var BOUNDED_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    var lengthResult = options.maximum === options.minimum
        ? {
            bytes: 0,
            value: options.maximum
        }
        : decode_1.FLOOR_ENUM_VARINT(buffer, offset, {
            minimum: options.minimum
        });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings, options.encoding);
};
exports.BOUNDED_TYPED_LENGTH_PREFIX = BOUNDED_TYPED_LENGTH_PREFIX;
var BOUNDED_8BITS_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var lengthResult = options.maximum === options.minimum
        ? {
            bytes: 0,
            value: options.maximum
        }
        : decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, {
            minimum: options.minimum,
            maximum: options.maximum
        });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings, options.encoding);
};
exports.BOUNDED_8BITS_TYPED_LENGTH_PREFIX = BOUNDED_8BITS_TYPED_LENGTH_PREFIX;
var ROOF_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    var lengthResult = decode_1.ROOF_MIRROR_ENUM_VARINT(buffer, offset, {
        maximum: options.maximum
    });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings, options.encoding);
};
exports.ROOF_TYPED_LENGTH_PREFIX = ROOF_TYPED_LENGTH_PREFIX;
var FLOOR_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    var lengthResult = decode_1.FLOOR_ENUM_VARINT(buffer, offset, {
        minimum: options.minimum
    });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings, options.encoding);
};
exports.FLOOR_TYPED_LENGTH_PREFIX = FLOOR_TYPED_LENGTH_PREFIX;
