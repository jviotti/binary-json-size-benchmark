"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isNegativeInteger = exports.isPositiveInteger = exports.isNull = exports.isFalse = exports.isTrue = exports.getMetadata = exports.getTypeTag = exports.isType = exports.LONG_STRING_BASE_EXPONENT_MAXIMUM = exports.LONG_STRING_BASE_EXPONENT_MINIMUM = exports.Subtype = exports.Type = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var Type;
(function (Type) {
    Type[Type["SharedString"] = 0] = "SharedString";
    Type[Type["String"] = 1] = "String";
    Type[Type["LongString"] = 2] = "LongString";
    Type[Type["Object"] = 3] = "Object";
    Type[Type["Array"] = 4] = "Array";
    Type[Type["PositiveIntegerByte"] = 5] = "PositiveIntegerByte";
    Type[Type["NegativeIntegerByte"] = 6] = "NegativeIntegerByte";
    Type[Type["Other"] = 7] = "Other";
})(Type = exports.Type || (exports.Type = {}));
var Subtype;
(function (Subtype) {
    Subtype[Subtype["False"] = 0] = "False";
    Subtype[Subtype["True"] = 1] = "True";
    Subtype[Subtype["Null"] = 2] = "Null";
    Subtype[Subtype["PositiveInteger"] = 3] = "PositiveInteger";
    Subtype[Subtype["NegativeInteger"] = 4] = "NegativeInteger";
    Subtype[Subtype["Number"] = 5] = "Number";
    Subtype[Subtype["LongStringBaseExponent7"] = 7] = "LongStringBaseExponent7";
    Subtype[Subtype["LongStringBaseExponent8"] = 8] = "LongStringBaseExponent8";
    Subtype[Subtype["LongStringBaseExponent9"] = 9] = "LongStringBaseExponent9";
    Subtype[Subtype["LongStringBaseExponent10"] = 10] = "LongStringBaseExponent10";
})(Subtype = exports.Subtype || (exports.Subtype = {}));
exports.LONG_STRING_BASE_EXPONENT_MINIMUM = 7;
exports.LONG_STRING_BASE_EXPONENT_MAXIMUM = 10;
var isType = function (type, value) {
    assert_1.strict(type >= limits_1.UINT3_MIN && type <= limits_1.UINT3_MAX);
    assert_1.strict(value >= limits_1.UINT8_MIN && value <= limits_1.UINT8_MAX);
    return (value & 7) === type;
};
exports.isType = isType;
var getTypeTag = function (type, metadata) {
    assert_1.strict(type >= limits_1.UINT3_MIN && type <= limits_1.UINT3_MAX);
    assert_1.strict(metadata >= limits_1.UINT5_MIN && metadata <= limits_1.UINT5_MAX);
    return (metadata << 3) | type;
};
exports.getTypeTag = getTypeTag;
var getMetadata = function (value) {
    assert_1.strict(value >= limits_1.UINT8_MIN && value <= limits_1.UINT8_MAX);
    return value >>> 3;
};
exports.getMetadata = getMetadata;
var isTrue = function (value) {
    return exports.isType(Type.Other, value) &&
        exports.getMetadata(value) === Subtype.True;
};
exports.isTrue = isTrue;
var isFalse = function (value) {
    return exports.isType(Type.Other, value) &&
        exports.getMetadata(value) === Subtype.False;
};
exports.isFalse = isFalse;
var isNull = function (value) {
    return exports.isType(Type.Other, value) &&
        exports.getMetadata(value) === Subtype.Null;
};
exports.isNull = isNull;
var isPositiveInteger = function (value) {
    return exports.isType(Type.Other, value) &&
        exports.getMetadata(value) === Subtype.PositiveInteger;
};
exports.isPositiveInteger = isPositiveInteger;
var isNegativeInteger = function (value) {
    return exports.isType(Type.Other, value) &&
        exports.getMetadata(value) === Subtype.NegativeInteger;
};
exports.isNegativeInteger = isNegativeInteger;
var isNumber = function (value) {
    return exports.isType(Type.Other, value) &&
        exports.getMetadata(value) === Subtype.Number;
};
exports.isNumber = isNumber;
