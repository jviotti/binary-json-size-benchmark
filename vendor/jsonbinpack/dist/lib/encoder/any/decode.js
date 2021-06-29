"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY__TYPE_PREFIX = void 0;
var limits_1 = require("../../utils/limits");
var encoding_type_1 = require("../encoding-type");
var decode_1 = require("../integer/decode");
var decode_2 = require("../string/decode");
var decode_3 = require("../number/decode");
var decode_4 = require("../object/decode");
var decode_5 = require("../array/decode");
var types_1 = require("./types");
var ANY__TYPE_PREFIX = function (buffer, offset, _options) {
    var tag = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
        minimum: limits_1.UINT8_MIN,
        maximum: limits_1.UINT8_MAX
    });
    if (types_1.isType(types_1.Type.Array, tag.value)) {
        var result = decode_5.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset + tag.bytes, {
            prefixEncodings: []
        });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isType(types_1.Type.Object, tag.value)) {
        var size = types_1.getMetadata(tag.value);
        var result = size === 0
            ? decode_4.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + tag.bytes, {
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
            })
            : decode_4.ARBITRARY_TYPED_KEYS_OBJECT_WITHOUT_LENGTH(buffer, offset + tag.bytes, {
                size: size - 1,
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
            });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isType(types_1.Type.Null, tag.value)) {
        return {
            value: null,
            bytes: tag.bytes
        };
    }
    else if (types_1.isType(types_1.Type.True, tag.value)) {
        return {
            value: true,
            bytes: tag.bytes
        };
    }
    else if (types_1.isType(types_1.Type.False, tag.value)) {
        return {
            value: false,
            bytes: tag.bytes
        };
    }
    else if (types_1.isType(types_1.Type.SharedString, tag.value)) {
        var result = decode_2.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset, {});
        return {
            value: result.value,
            bytes: result.bytes
        };
    }
    else if (types_1.isType(types_1.Type.String, tag.value)) {
        var result = decode_2.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset + tag.bytes, {});
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isType(types_1.Type.PositiveInteger, tag.value)) {
        var result = decode_1.FLOOR__ENUM_VARINT(buffer, offset + tag.bytes, {
            minimum: 0
        });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isType(types_1.Type.NegativeInteger, tag.value)) {
        var result = decode_1.FLOOR__ENUM_VARINT(buffer, offset + tag.bytes, {
            minimum: 0
        });
        return {
            value: (result.value + 1) * -1,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isType(types_1.Type.PositiveIntegerByte, tag.value)) {
        var metadata = types_1.getMetadata(tag.value);
        if (metadata > 0) {
            return {
                value: metadata - 1,
                bytes: tag.bytes
            };
        }
        var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tag.bytes, {
            minimum: limits_1.UINT8_MIN,
            maximum: limits_1.UINT8_MAX
        });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isType(types_1.Type.NegativeIntegerByte, tag.value)) {
        var metadata = types_1.getMetadata(tag.value);
        if (metadata > 0) {
            return {
                value: ((metadata - 1) + 1) * -1,
                bytes: tag.bytes
            };
        }
        var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tag.bytes, {
            minimum: limits_1.UINT8_MIN,
            maximum: limits_1.UINT8_MAX
        });
        return {
            value: (result.value + 1) * -1,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isType(types_1.Type.Number, tag.value)) {
        var result = decode_3.DOUBLE_VARINT_TUPLE(buffer, offset + tag.bytes, {});
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    throw new Error("Unrecognized type: " + tag.value);
};
exports.ANY__TYPE_PREFIX = ANY__TYPE_PREFIX;
