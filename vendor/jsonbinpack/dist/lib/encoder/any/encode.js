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
var encodeTypeTag = function (buffer, offset, tag, context) {
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, tag, {
        minimum: limits_1.UINT8_MIN,
        maximum: limits_1.UINT8_MAX
    }, context);
};
var ANY__TYPE_PREFIX = function (buffer, offset, value, _options, context) {
    if (Array.isArray(value)) {
        var typeTag_1 = types_1.getTypeTag(types_1.Type.Array, 0);
        var tagBytes_1 = encodeTypeTag(buffer, offset, typeTag_1, context);
        var valueBytes_1 = encode_5.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset + tagBytes_1, value, {
            prefixEncodings: []
        }, context);
        return tagBytes_1 + valueBytes_1;
    }
    else if (typeof value === 'object' && value !== null) {
        var size = Object.keys(value).length;
        if (size > limits_1.UINT4_MAX - 1) {
            var typeTag_2 = types_1.getTypeTag(types_1.Type.Object, 0);
            var tagBytes_2 = encodeTypeTag(buffer, offset, typeTag_2, context);
            var valueBytes_2 = encode_4.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + tagBytes_2, value, {
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
            return tagBytes_2 + valueBytes_2;
        }
        var typeTag_3 = types_1.getTypeTag(types_1.Type.Object, size + 1);
        var tagBytes_3 = encodeTypeTag(buffer, offset, typeTag_3, context);
        var valueBytes_3 = encode_4.ARBITRARY_TYPED_KEYS_OBJECT_WITHOUT_LENGTH(buffer, offset + tagBytes_3, value, {
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
        return tagBytes_3 + valueBytes_3;
    }
    else if (value === null) {
        var typeTag_4 = types_1.getTypeTag(types_1.Type.Null, 0);
        return encodeTypeTag(buffer, offset, typeTag_4, context);
    }
    else if (typeof value === 'boolean') {
        var typeTag_5 = value
            ? types_1.getTypeTag(types_1.Type.True, 0) : types_1.getTypeTag(types_1.Type.False, 0);
        return encodeTypeTag(buffer, offset, typeTag_5, context);
    }
    else if (typeof value === 'string') {
        var typeTag_6 = types_1.getTypeTag(types_1.Type.String, 0);
        var tagBytes_4 = context.strings.has(value)
            ? 0
            : encodeTypeTag(buffer, offset, typeTag_6, context);
        var valueBytes_4 = encode_2.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset + tagBytes_4, value, {}, context);
        return tagBytes_4 + valueBytes_4;
    }
    else if (Number.isInteger(value)) {
        var isPositive = value >= 0;
        var absoluteValue = isPositive ? value : Math.abs(value) - 1;
        if (absoluteValue <= limits_1.UINT8_MAX) {
            var type_1 = isPositive
                ? types_1.Type.PositiveIntegerByte : types_1.Type.NegativeIntegerByte;
            if (absoluteValue <= limits_1.UINT4_MAX - 1) {
                var typeTag_7 = types_1.getTypeTag(type_1, absoluteValue + 1);
                return encodeTypeTag(buffer, offset, typeTag_7, context);
            }
            var typeTag_8 = types_1.getTypeTag(type_1, 0);
            var tagBytes_5 = encodeTypeTag(buffer, offset, typeTag_8, context);
            var valueBytes_5 = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes_5, absoluteValue, {
                minimum: limits_1.UINT8_MIN,
                maximum: limits_1.UINT8_MAX
            }, context);
            return tagBytes_5 + valueBytes_5;
        }
        var type = isPositive
            ? types_1.Type.PositiveInteger : types_1.Type.NegativeInteger;
        assert_1.strict(type === types_1.Type.PositiveInteger || -(absoluteValue + 1) === value);
        var typeTag_9 = types_1.getTypeTag(type, 0);
        var tagBytes_6 = encodeTypeTag(buffer, offset, typeTag_9, context);
        var valueBytes_6 = encode_1.FLOOR__ENUM_VARINT(buffer, offset + tagBytes_6, absoluteValue, {
            minimum: 0
        }, context);
        return tagBytes_6 + valueBytes_6;
    }
    var typeTag = types_1.getTypeTag(types_1.Type.Number, 0);
    var tagBytes = encodeTypeTag(buffer, offset, typeTag, context);
    var valueBytes = encode_3.DOUBLE_VARINT_TUPLE(buffer, offset + tagBytes, value, {}, context);
    return tagBytes + valueBytes;
};
exports.ANY__TYPE_PREFIX = ANY__TYPE_PREFIX;
