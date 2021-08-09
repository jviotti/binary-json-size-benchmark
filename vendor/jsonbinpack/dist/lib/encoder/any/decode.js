"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY_PACKED_TYPE_TAG_BYTE_PREFIX = void 0;
var limits_1 = require("../../utils/limits");
var encoding_type_1 = require("../encoding-type");
var decode_1 = require("../integer/decode");
var decode_2 = require("../string/decode");
var decode_3 = require("../number/decode");
var decode_4 = require("../object/decode");
var decode_5 = require("../array/decode");
var types_1 = require("./types");
var ANY_PACKED_TYPE_TAG_BYTE_PREFIX = function (buffer, offset, _options) {
    var tag = decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, {
        minimum: limits_1.UINT8_MIN,
        maximum: limits_1.UINT8_MAX
    });
    if (types_1.isType(types_1.Type.Array, tag.value)) {
        var size = types_1.getMetadata(tag.value);
        var result = size === 0
            ? decode_5.FLOOR_TYPED_LENGTH_PREFIX(buffer, offset + tag.bytes, {
                minimum: 0,
                prefixEncodings: [],
                encoding: {
                    type: encoding_type_1.EncodingType.Any,
                    encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                    options: {}
                }
            })
            : decode_5.FIXED_TYPED_ARRAY(buffer, offset + tag.bytes, {
                size: size - 1,
                prefixEncodings: [],
                encoding: {
                    type: encoding_type_1.EncodingType.Any,
                    encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                    options: {}
                }
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
                    encoding: 'STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH',
                    options: {}
                },
                encoding: {
                    type: encoding_type_1.EncodingType.Any,
                    encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                    options: {}
                }
            })
            : decode_4.ARBITRARY_TYPED_KEYS_OBJECT_WITHOUT_LENGTH(buffer, offset + tag.bytes, {
                size: size - 1,
                keyEncoding: {
                    type: encoding_type_1.EncodingType.String,
                    encoding: 'STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH',
                    options: {}
                },
                encoding: {
                    type: encoding_type_1.EncodingType.Any,
                    encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                    options: {}
                }
            });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isNull(tag.value)) {
        return {
            value: null,
            bytes: tag.bytes
        };
    }
    else if (types_1.isTrue(tag.value)) {
        return {
            value: true,
            bytes: tag.bytes
        };
    }
    else if (types_1.isFalse(tag.value)) {
        return {
            value: false,
            bytes: tag.bytes
        };
    }
    else if (types_1.isType(types_1.Type.SharedString, tag.value)) {
        var size = types_1.getMetadata(tag.value);
        if (size === 0) {
            var result_1 = decode_2.FLOOR_PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
                minimum: 0
            });
            return {
                value: result_1.value,
                bytes: result_1.bytes
            };
        }
        var result = decode_2.SHARED_STRING_POINTER_RELATIVE_OFFSET(buffer, offset + tag.bytes, {
            size: size - 1
        });
        return {
            value: result.value,
            bytes: result.bytes + tag.bytes
        };
    }
    else if (types_1.isType(types_1.Type.String, tag.value)) {
        var size = types_1.getMetadata(tag.value);
        if (size === 0) {
            var result_2 = decode_2.FLOOR_PREFIX_LENGTH_ENUM_VARINT(buffer, offset + tag.bytes, {
                minimum: 0
            });
            return {
                value: result_2.value,
                bytes: tag.bytes + result_2.bytes
            };
        }
        var result = decode_2.UTF8_STRING_NO_LENGTH(buffer, offset + tag.bytes, {
            size: size - 1
        });
        return {
            value: result.value,
            bytes: result.bytes + tag.bytes
        };
    }
    else if (types_1.isType(types_1.Type.LongString, tag.value)) {
        var size = types_1.getMetadata(tag.value) + limits_1.UINT5_MAX;
        var result = decode_2.UTF8_STRING_NO_LENGTH(buffer, offset + tag.bytes, {
            size: size
        });
        return {
            value: result.value,
            bytes: result.bytes + tag.bytes
        };
    }
    else if (types_1.isType(types_1.Type.Other, tag.value) && (types_1.getMetadata(tag.value) === types_1.Subtype.LongStringBaseExponent7 ||
        types_1.getMetadata(tag.value) === types_1.Subtype.LongStringBaseExponent8 ||
        types_1.getMetadata(tag.value) === types_1.Subtype.LongStringBaseExponent9 ||
        types_1.getMetadata(tag.value) === types_1.Subtype.LongStringBaseExponent10)) {
        var size = decode_1.FLOOR_ENUM_VARINT(buffer, offset + tag.bytes, {
            minimum: Math.pow(2, types_1.getMetadata(tag.value))
        });
        var result = decode_2.UTF8_STRING_NO_LENGTH(buffer, offset + tag.bytes + size.bytes, {
            size: size.value
        });
        return {
            value: result.value,
            bytes: result.bytes + tag.bytes + size.bytes
        };
    }
    else if (types_1.isPositiveInteger(tag.value)) {
        var result = decode_1.FLOOR_ENUM_VARINT(buffer, offset + tag.bytes, {
            minimum: 0
        });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isNegativeInteger(tag.value)) {
        var result = decode_1.FLOOR_ENUM_VARINT(buffer, offset + tag.bytes, {
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
        var result = decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset + tag.bytes, {
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
        var result = decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset + tag.bytes, {
            minimum: limits_1.UINT8_MIN,
            maximum: limits_1.UINT8_MAX
        });
        return {
            value: (result.value + 1) * -1,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (types_1.isNumber(tag.value)) {
        var result = decode_3.DOUBLE_VARINT_TUPLE(buffer, offset + tag.bytes, {});
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    throw new Error("Unrecognized type: " + tag.value);
};
exports.ANY_PACKED_TYPE_TAG_BYTE_PREFIX = ANY_PACKED_TYPE_TAG_BYTE_PREFIX;
