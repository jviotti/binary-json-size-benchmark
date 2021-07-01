"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringEncoding = exports.getStringStates = void 0;
var assert_1 = require("assert");
var encoder_1 = require("../encoder");
var limits_1 = require("../utils/limits");
var dictionaries_1 = require("../encoder/string/dictionaries");
var getStringStates = function (_schema) {
    return Infinity;
};
exports.getStringStates = getStringStates;
var getStringEncoding = function (schema, _level) {
    if (schema.format === 'date') {
        return {
            type: encoder_1.EncodingType.String,
            encoding: 'RFC3339_DATE_INTEGER_TRIPLET',
            options: {}
        };
    }
    else if (schema.format === 'uri') {
        return {
            type: encoder_1.EncodingType.String,
            encoding: 'URL_PROTOCOL_HOST_REST',
            options: {}
        };
    }
    if (schema.contentMediaType === 'text/markdown') {
        return {
            type: encoder_1.EncodingType.String,
            encoding: 'STRING_BROTLI',
            options: {}
        };
    }
    assert_1.strict(typeof schema.minLength === 'undefined' || schema.minLength >= 0);
    assert_1.strict(typeof schema.maxLength === 'undefined' || schema.maxLength >= 0);
    assert_1.strict(typeof schema.minLength === 'undefined' ||
        typeof schema.maxLength === 'undefined' ||
        schema.maxLength >= schema.minLength);
    if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength !== 'undefined') {
        return {
            type: encoder_1.EncodingType.String,
            encoding: (schema.maxLength - schema.minLength <= limits_1.UINT8_MAX - 1)
                ? 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED' : 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT',
            options: {
                minimum: schema.minLength,
                maximum: schema.maxLength
            }
        };
    }
    else if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength === 'undefined') {
        return {
            type: encoder_1.EncodingType.String,
            encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
            options: {
                minimum: schema.minLength
            }
        };
    }
    else if (typeof schema.minLength === 'undefined' && typeof schema.maxLength !== 'undefined') {
        if (schema.maxLength <= limits_1.UINT8_MAX - 1) {
            return {
                type: encoder_1.EncodingType.String,
                encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
                options: {
                    minimum: 0,
                    maximum: schema.maxLength
                }
            };
        }
        return {
            type: encoder_1.EncodingType.String,
            encoding: 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
            options: {
                maximum: schema.maxLength
            }
        };
    }
    if (schema.contentMediaType === 'text/plain') {
        return {
            type: encoder_1.EncodingType.String,
            encoding: 'STRING_DICTIONARY_COMPRESSOR',
            options: dictionaries_1.ENGLISH_DICTIONARY
        };
    }
    return {
        type: encoder_1.EncodingType.String,
        encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
        options: {
            minimum: 0
        }
    };
};
exports.getStringEncoding = getStringEncoding;
