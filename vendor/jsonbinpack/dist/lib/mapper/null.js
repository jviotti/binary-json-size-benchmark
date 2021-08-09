"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNullEncoding = exports.getNullStates = void 0;
var encoder_1 = require("../encoder");
var getNullStates = function (_schema) {
    return [null];
};
exports.getNullStates = getNullStates;
var getNullEncoding = function (_schema, _level) {
    return {
        type: encoder_1.EncodingType.Null,
        encoding: 'NULL_8BITS_ENUM_FIXED',
        options: {}
    };
};
exports.getNullEncoding = getNullEncoding;
