"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooleanEncoding = exports.getBooleanStates = void 0;
var encoder_1 = require("../encoder");
var getBooleanStates = function (_schema) {
    return [false, true];
};
exports.getBooleanStates = getBooleanStates;
var getBooleanEncoding = function (_schema, _level) {
    return {
        type: encoder_1.EncodingType.Boolean,
        encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getBooleanEncoding = getBooleanEncoding;
