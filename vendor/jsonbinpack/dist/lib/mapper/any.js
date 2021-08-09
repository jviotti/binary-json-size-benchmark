"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnyEncoding = exports.getAnyStates = void 0;
var encoder_1 = require("../encoder");
var getAnyStates = function (_schema) {
    return Infinity;
};
exports.getAnyStates = getAnyStates;
var getAnyEncoding = function (_schema, _level) {
    return {
        type: encoder_1.EncodingType.Any,
        encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
        options: {}
    };
};
exports.getAnyEncoding = getAnyEncoding;
