"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = exports.ARBITRARY__ZIGZAG_VARINT = exports.ROOF_MULTIPLE__MIRROR_ENUM_VARINT = exports.ROOF__MIRROR_ENUM_VARINT = exports.FLOOR_MULTIPLE__ENUM_VARINT = exports.FLOOR__ENUM_VARINT = exports.BOUNDED_MULTIPLE__ENUM_VARINT = exports.BOUNDED__ENUM_VARINT = exports.BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = exports.BOUNDED_8BITS__ENUM_FIXED = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var zigzag_1 = require("./zigzag");
var varint_1 = require("./varint");
var BOUNDED_8BITS__ENUM_FIXED = function (buffer, offset, value, options, _context) {
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value <= options.maximum);
    return buffer.writeUInt8(value - options.minimum, offset) - offset;
};
exports.BOUNDED_8BITS__ENUM_FIXED = BOUNDED_8BITS__ENUM_FIXED;
var BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value <= options.maximum);
    assert_1.strict(options.multiplier >= options.minimum);
    assert_1.strict(options.multiplier <= options.maximum);
    assert_1.strict(value % options.multiplier === 0);
    var absoluteMultiplier = Math.abs(options.multiplier);
    var closestMinimumMultiple = Math.ceil(options.minimum / absoluteMultiplier) * absoluteMultiplier;
    var closestMaximumMultiple = Math.ceil(options.maximum / -absoluteMultiplier) * -absoluteMultiplier;
    var enumMinimum = closestMinimumMultiple / absoluteMultiplier;
    var enumMaximum = closestMaximumMultiple / absoluteMultiplier;
    assert_1.strict(enumMaximum - enumMinimum <= limits_1.UINT8_MAX);
    return exports.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, value / absoluteMultiplier, {
        minimum: enumMinimum,
        maximum: enumMaximum
    }, context);
};
exports.BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = BOUNDED_MULTIPLE_8BITS__ENUM_FIXED;
var BOUNDED__ENUM_VARINT = function (buffer, offset, value, options, _context) {
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value <= options.maximum);
    return varint_1.varintEncode(buffer, offset, BigInt(value - options.minimum));
};
exports.BOUNDED__ENUM_VARINT = BOUNDED__ENUM_VARINT;
var BOUNDED_MULTIPLE__ENUM_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value <= options.maximum);
    assert_1.strict(options.multiplier >= options.minimum);
    assert_1.strict(options.multiplier <= options.maximum);
    assert_1.strict(value % options.multiplier === 0);
    var absoluteMultiplier = Math.abs(options.multiplier);
    var closestMinimumMultiple = Math.ceil(options.minimum / absoluteMultiplier) * absoluteMultiplier;
    var closestMaximumMultiple = Math.ceil(options.maximum / -absoluteMultiplier) * -absoluteMultiplier;
    return exports.BOUNDED__ENUM_VARINT(buffer, offset, value / absoluteMultiplier, {
        minimum: closestMinimumMultiple / absoluteMultiplier,
        maximum: closestMaximumMultiple / absoluteMultiplier
    }, context);
};
exports.BOUNDED_MULTIPLE__ENUM_VARINT = BOUNDED_MULTIPLE__ENUM_VARINT;
var FLOOR__ENUM_VARINT = function (buffer, offset, value, options, _context) {
    assert_1.strict(value >= options.minimum);
    return varint_1.varintEncode(buffer, offset, BigInt(value - options.minimum));
};
exports.FLOOR__ENUM_VARINT = FLOOR__ENUM_VARINT;
var FLOOR_MULTIPLE__ENUM_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value % options.multiplier === 0);
    assert_1.strict(options.multiplier >= options.minimum);
    var absoluteMultiplier = Math.abs(options.multiplier);
    var closestMinimumMultiple = Math.ceil(options.minimum / absoluteMultiplier) * absoluteMultiplier;
    return exports.FLOOR__ENUM_VARINT(buffer, offset, value / absoluteMultiplier, {
        minimum: closestMinimumMultiple / absoluteMultiplier
    }, context);
};
exports.FLOOR_MULTIPLE__ENUM_VARINT = FLOOR_MULTIPLE__ENUM_VARINT;
var ROOF__MIRROR_ENUM_VARINT = function (buffer, offset, value, options, _context) {
    assert_1.strict(value <= options.maximum);
    return varint_1.varintEncode(buffer, offset, BigInt((-1 * value) + options.maximum));
};
exports.ROOF__MIRROR_ENUM_VARINT = ROOF__MIRROR_ENUM_VARINT;
var ROOF_MULTIPLE__MIRROR_ENUM_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(value <= options.maximum);
    assert_1.strict(value % options.multiplier === 0);
    assert_1.strict(options.maximum >= options.multiplier);
    var absoluteMultiplier = Math.abs(options.multiplier);
    var closestMaximumMultiple = Math.ceil(options.maximum / -absoluteMultiplier) * -absoluteMultiplier;
    return exports.ROOF__MIRROR_ENUM_VARINT(buffer, offset, value / absoluteMultiplier, {
        maximum: closestMaximumMultiple / absoluteMultiplier
    }, context);
};
exports.ROOF_MULTIPLE__MIRROR_ENUM_VARINT = ROOF_MULTIPLE__MIRROR_ENUM_VARINT;
var ARBITRARY__ZIGZAG_VARINT = function (buffer, offset, value, _options, _context) {
    return varint_1.varintEncode(buffer, offset, zigzag_1.zigzagEncode(BigInt(value)));
};
exports.ARBITRARY__ZIGZAG_VARINT = ARBITRARY__ZIGZAG_VARINT;
var ARBITRARY_MULTIPLE__ZIGZAG_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(value % options.multiplier === 0);
    return exports.ARBITRARY__ZIGZAG_VARINT(buffer, offset, value / Math.abs(options.multiplier), {}, context);
};
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
