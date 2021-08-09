"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOLEAN_8BITS_ENUM_FIXED = void 0;
var encode_1 = require("../integer/encode");
var BOOLEAN_8BITS_ENUM_FIXED = function (buffer, offset, value, _options, context) {
    var integer = value ? 1 : 0;
    return encode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, integer, {
        minimum: 0,
        maximum: 1
    }, context);
};
exports.BOOLEAN_8BITS_ENUM_FIXED = BOOLEAN_8BITS_ENUM_FIXED;
