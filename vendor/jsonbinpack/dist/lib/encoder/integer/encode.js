"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE_ZIGZAG_VARINT = exports.ARBITRARY_ZIGZAG_VARINT = exports.ROOF_MULTIPLE_MIRROR_ENUM_VARINT = exports.ROOF_MIRROR_ENUM_VARINT = exports.FLOOR_MULTIPLE_ENUM_VARINT = exports.FLOOR_ENUM_VARINT = exports.BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = exports.BOUNDED_8BITS_ENUM_FIXED = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var zigzag_1 = require("./zigzag");
var varint_1 = require("./varint");
var BOUNDED_8BITS_ENUM_FIXED = function (buffer, offset, value, options, _context) {
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value <= options.maximum);
    return buffer.writeUInt8(value - options.minimum, offset) - offset;
};
exports.BOUNDED_8BITS_ENUM_FIXED = BOUNDED_8BITS_ENUM_FIXED;
var BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value <= options.maximum);
    assert_1.strict(options.multiplier >= options.minimum);
    assert_1.strict(options.multiplier <= options.maximum);
    assert_1.strict(value % options.multiplier === 0);
    var absoluteMultiplier = Math.abs(options.multiplier);
    var enumMinimum = Math.ceil(options.minimum / absoluteMultiplier);
    var enumMaximum = Math.floor(options.maximum / absoluteMultiplier);
    assert_1.strict(enumMaximum - enumMinimum <= limits_1.UINT8_MAX);
    return exports.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, value / absoluteMultiplier, {
        minimum: enumMinimum,
        maximum: enumMaximum
    }, context);
};
exports.BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = BOUNDED_MULTIPLE_8BITS_ENUM_FIXED;
var FLOOR_ENUM_VARINT = function (buffer, offset, value, options, _context) {
    assert_1.strict(value >= options.minimum);
    return varint_1.varintEncode(buffer, offset, BigInt(value - options.minimum));
};
exports.FLOOR_ENUM_VARINT = FLOOR_ENUM_VARINT;
var FLOOR_MULTIPLE_ENUM_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value % options.multiplier === 0);
    assert_1.strict(options.multiplier >= options.minimum);
    var absoluteMultiplier = Math.abs(options.multiplier);
    return exports.FLOOR_ENUM_VARINT(buffer, offset, value / absoluteMultiplier, {
        minimum: Math.ceil(options.minimum / absoluteMultiplier)
    }, context);
};
exports.FLOOR_MULTIPLE_ENUM_VARINT = FLOOR_MULTIPLE_ENUM_VARINT;
var ROOF_MIRROR_ENUM_VARINT = function (buffer, offset, value, options, _context) {
    assert_1.strict(value <= options.maximum);
    return varint_1.varintEncode(buffer, offset, BigInt(options.maximum - value));
};
exports.ROOF_MIRROR_ENUM_VARINT = ROOF_MIRROR_ENUM_VARINT;
var ROOF_MULTIPLE_MIRROR_ENUM_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(value <= options.maximum);
    assert_1.strict(value % options.multiplier === 0);
    assert_1.strict(options.maximum >= options.multiplier);
    var absoluteMultiplier = Math.abs(options.multiplier);
    return exports.ROOF_MIRROR_ENUM_VARINT(buffer, offset, value / absoluteMultiplier, {
        maximum: Math.floor(options.maximum / absoluteMultiplier)
    }, context);
};
exports.ROOF_MULTIPLE_MIRROR_ENUM_VARINT = ROOF_MULTIPLE_MIRROR_ENUM_VARINT;
var ARBITRARY_ZIGZAG_VARINT = function (buffer, offset, value, _options, _context) {
    return varint_1.varintEncode(buffer, offset, zigzag_1.zigzagEncode(BigInt(value)));
};
exports.ARBITRARY_ZIGZAG_VARINT = ARBITRARY_ZIGZAG_VARINT;
var ARBITRARY_MULTIPLE_ZIGZAG_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(value % options.multiplier === 0);
    return exports.ARBITRARY_ZIGZAG_VARINT(buffer, offset, value / Math.abs(options.multiplier), {}, context);
};
exports.ARBITRARY_MULTIPLE_ZIGZAG_VARINT = ARBITRARY_MULTIPLE_ZIGZAG_VARINT;
