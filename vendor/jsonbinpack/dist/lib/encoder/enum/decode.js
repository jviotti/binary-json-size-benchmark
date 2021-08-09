"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LARGE_BOUNDED_CHOICE_INDEX = exports.BOUNDED_CHOICE_INDEX = exports.TOP_LEVEL_8BIT_CHOICE_INDEX = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var TOP_LEVEL_8BIT_CHOICE_INDEX = function (buffer, offset, options) {
    assert_1.strict(offset === 0);
    if (buffer.getOriginalSize() === 0) {
        return {
            value: options.choices[0],
            bytes: 0
        };
    }
    var result = decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, {
        minimum: 1,
        maximum: options.choices.length
    });
    return {
        value: options.choices[result.value],
        bytes: result.bytes
    };
};
exports.TOP_LEVEL_8BIT_CHOICE_INDEX = TOP_LEVEL_8BIT_CHOICE_INDEX;
var BOUNDED_CHOICE_INDEX = function (buffer, offset, options) {
    var result = decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, {
        minimum: 0,
        maximum: options.choices.length
    });
    return {
        value: options.choices[result.value],
        bytes: result.bytes
    };
};
exports.BOUNDED_CHOICE_INDEX = BOUNDED_CHOICE_INDEX;
var LARGE_BOUNDED_CHOICE_INDEX = function (buffer, offset, options) {
    var result = decode_1.FLOOR_ENUM_VARINT(buffer, offset, {
        minimum: 0
    });
    return {
        value: options.choices[result.value],
        bytes: result.bytes
    };
};
exports.LARGE_BOUNDED_CHOICE_INDEX = LARGE_BOUNDED_CHOICE_INDEX;
