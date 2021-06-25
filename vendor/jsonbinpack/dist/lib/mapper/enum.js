"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumEncoding = exports.getEnumStates = void 0;
var encoder_1 = require("../encoder");
var limits_1 = require("../utils/limits");
var getEnumStates = function (schema) {
    return schema.enum;
};
exports.getEnumStates = getEnumStates;
var getEnumEncoding = function (schema, level) {
    if (level === 0 && schema.enum.length < limits_1.UINT8_MAX) {
        return {
            type: encoder_1.EncodingType.Enum,
            encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
            options: {
                choices: schema.enum
            }
        };
    }
    return {
        type: encoder_1.EncodingType.Enum,
        encoding: schema.enum.length > limits_1.UINT8_MAX ? 'LARGE_BOUNDED_CHOICE_INDEX' : 'BOUNDED_CHOICE_INDEX',
        options: {
            choices: schema.enum
        }
    };
};
exports.getEnumEncoding = getEnumEncoding;
