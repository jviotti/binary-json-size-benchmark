"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberEncoding = exports.getNumberStates = void 0;
var encoder_1 = require("../encoder");
var getNumberStates = function (_schema) {
    return Infinity;
};
exports.getNumberStates = getNumberStates;
var getNumberEncoding = function (_schema, _level) {
    return {
        type: encoder_1.EncodingType.Number,
        encoding: 'DOUBLE_VARINT_TUPLE',
        options: {}
    };
};
exports.getNumberEncoding = getNumberEncoding;
