"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOLEAN_8BITS_ENUM_FIXED = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var BOOLEAN_8BITS_ENUM_FIXED = function (buffer, offset, _options) {
    var result = decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, {
        minimum: 0,
        maximum: 1
    });
    assert_1.strict(result.value >= 0);
    assert_1.strict(result.value <= 1);
    return {
        value: Boolean(result.value),
        bytes: result.bytes
    };
};
exports.BOOLEAN_8BITS_ENUM_FIXED = BOOLEAN_8BITS_ENUM_FIXED;
