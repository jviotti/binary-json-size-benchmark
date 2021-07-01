"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY__TYPE_PREFIX = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var types_1 = require("./types");
var encoding_type_1 = require("../encoding-type");
var encode_1 = require("../integer/encode");
var encode_2 = require("../string/encode");
var encode_3 = require("../number/encode");
var encode_4 = require("../object/encode");
var encode_5 = require("../array/encode");
var STRING_ENCODING = 'utf8';
var encodeTypeTag = function (buffer, offset, tag, context) {
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, tag, {
        minimum: limits_1.UINT8_MIN,
        maximum: limits_1.UINT8_MAX
    }, context);
};
var ANY__TYPE_PREFIX = function (buffer, offset, value, _options, context) {
    if (Array.isArray(value)) {
        var size = value.length;
        if (size > limits_1.UINT5_MAX - 1) {
            var typeTag_1 = types_1.getTypeTag(types_1.Type.Array, 0);
            var tagBytes_1 = encodeTypeTag(buffer, offset, typeTag_1, context);
            var valueBytes_1 = encode_5.FLOOR_SEMITYPED__LENGTH_PREFIX(buffer, offset + tagBytes_1, value, {
                minimum: 0,
                prefixEncodings: []
            }, context);
            return tagBytes_1 + valueBytes_1;
        }
        var typeTag_2 = types_1.getTypeTag(types_1.Type.Array, value.length + 1);
        var tagBytes_2 = encodeTypeTag(buffer, offset, typeTag_2, context);
        var valueBytes_2 = encode_5.FLOOR_SEMITYPED__NO_LENGTH_PREFIX(buffer, offset + tagBytes_2, value, {
            size: size,
            minimum: 0,
            prefixEncodings: []
        }, context);
        return tagBytes_2 + valueBytes_2;
    }
    else if (typeof value === 'object' && value !== null) {
        var size = Object.keys(value).length;
        if (size > limits_1.UINT5_MAX - 1) {
            var typeTag_3 = types_1.getTypeTag(types_1.Type.Object, 0);
            var tagBytes_3 = encodeTypeTag(buffer, offset, typeTag_3, context);
            var valueBytes_3 = encode_4.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + tagBytes_3, value, {
                keyEncoding: {
                    type: encoding_type_1.EncodingType.String,
                    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                    options: {}
                },
                encoding: {
                    type: encoding_type_1.EncodingType.Any,
                    encoding: 'ANY__TYPE_PREFIX',
                    options: {}
                }
            }, context);
            return tagBytes_3 + valueBytes_3;
        }
        var typeTag_4 = types_1.getTypeTag(types_1.Type.Object, size + 1);
        var tagBytes_4 = encodeTypeTag(buffer, offset, typeTag_4, context);
        var valueBytes_4 = encode_4.ARBITRARY_TYPED_KEYS_OBJECT_WITHOUT_LENGTH(buffer, offset + tagBytes_4, value, {
            size: size,
            keyEncoding: {
                type: encoding_type_1.EncodingType.String,
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: encoding_type_1.EncodingType.Any,
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }, context);
        return tagBytes_4 + valueBytes_4;
    }
    else if (value === null) {
        var typeTag_5 = types_1.getTypeTag(types_1.Type.Other, types_1.Subtype.Null);
        return encodeTypeTag(buffer, offset, typeTag_5, context);
    }
    else if (typeof value === 'boolean') {
        var typeTag_6 = value
            ? types_1.getTypeTag(types_1.Type.Other, types_1.Subtype.True)
            : types_1.getTypeTag(types_1.Type.Other, types_1.Subtype.False);
        return encodeTypeTag(buffer, offset, typeTag_6, context);
    }
    else if (typeof value === 'string') {
        var length_1 = Buffer.byteLength(value, STRING_ENCODING);
        if (length_1 > limits_1.UINT5_MAX - 1) {
            var typeTag_7 = types_1.getTypeTag(types_1.Type.String, 0);
            var tagBytes_5 = context.strings.has(value)
                ? 0
                : encodeTypeTag(buffer, offset, typeTag_7, context);
            var valueBytes_5 = encode_2.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset + tagBytes_5, value, {
                minimum: 0
            }, context);
            return tagBytes_5 + valueBytes_5;
        }
        else if (context.strings.has(value)) {
            var typeTag_8 = types_1.getTypeTag(types_1.Type.SharedString, length_1 + 1);
            var tagBytes_6 = encodeTypeTag(buffer, offset, typeTag_8, context);
            return tagBytes_6 + encode_2.SHARED_STRING_POINTER_RELATIVE_OFFSET(buffer, offset + tagBytes_6, value, {
                size: length_1
            }, context);
        }
        else {
            var typeTag_9 = types_1.getTypeTag(types_1.Type.String, length_1 + 1);
            var tagBytes_7 = encodeTypeTag(buffer, offset, typeTag_9, context);
            return tagBytes_7 + encode_2.UTF8_STRING_NO_LENGTH(buffer, offset + tagBytes_7, value, {
                size: length_1
            }, context);
        }
    }
    else if (Number.isInteger(value)) {
        var isPositive = value >= 0;
        var absoluteValue = isPositive ? value : Math.abs(value) - 1;
        if (absoluteValue <= limits_1.UINT8_MAX) {
            var type_1 = isPositive
                ? types_1.Type.PositiveIntegerByte : types_1.Type.NegativeIntegerByte;
            if (absoluteValue <= limits_1.UINT5_MAX - 1) {
                var typeTag_10 = types_1.getTypeTag(type_1, absoluteValue + 1);
                return encodeTypeTag(buffer, offset, typeTag_10, context);
            }
            var typeTag_11 = types_1.getTypeTag(type_1, 0);
            var tagBytes_8 = encodeTypeTag(buffer, offset, typeTag_11, context);
            var valueBytes_6 = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes_8, absoluteValue, {
                minimum: limits_1.UINT8_MIN,
                maximum: limits_1.UINT8_MAX
            }, context);
            return tagBytes_8 + valueBytes_6;
        }
        var type = types_1.Type.Other;
        var subtype = isPositive
            ? types_1.Subtype.PositiveInteger : types_1.Subtype.NegativeInteger;
        assert_1.strict(subtype === types_1.Subtype.PositiveInteger || -(absoluteValue + 1) === value);
        var typeTag_12 = types_1.getTypeTag(type, subtype);
        var tagBytes_9 = encodeTypeTag(buffer, offset, typeTag_12, context);
        var valueBytes_7 = encode_1.FLOOR__ENUM_VARINT(buffer, offset + tagBytes_9, absoluteValue, {
            minimum: 0
        }, context);
        return tagBytes_9 + valueBytes_7;
    }
    var typeTag = types_1.getTypeTag(types_1.Type.Other, types_1.Subtype.Number);
    var tagBytes = encodeTypeTag(buffer, offset, typeTag, context);
    var valueBytes = encode_3.DOUBLE_VARINT_TUPLE(buffer, offset + tagBytes, value, {}, context);
    return tagBytes + valueBytes;
};
exports.ANY__TYPE_PREFIX = ANY__TYPE_PREFIX;
