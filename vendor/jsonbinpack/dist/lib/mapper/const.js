"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstEncoding = exports.getConstStates = void 0;
var encoder_1 = require("../encoder");
var getConstStates = function (schema) {
    return [schema.const];
};
exports.getConstStates = getConstStates;
var getConstEncoding = function (schema, _level) {
    return {
        type: encoder_1.EncodingType.Const,
        encoding: 'CONST_NONE',
        options: {
            value: schema.const
        }
    };
};
exports.getConstEncoding = getConstEncoding;
