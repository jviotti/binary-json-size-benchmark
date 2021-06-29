"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = exports.getTypeTag = exports.isType = exports.Type = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var Type;
(function (Type) {
    Type[Type["SharedString"] = 0] = "SharedString";
    Type[Type["String"] = 1] = "String";
    Type[Type["Object"] = 2] = "Object";
    Type[Type["Array"] = 3] = "Array";
    Type[Type["Number"] = 4] = "Number";
    Type[Type["True"] = 5] = "True";
    Type[Type["False"] = 6] = "False";
    Type[Type["Null"] = 7] = "Null";
    Type[Type["PositiveInteger"] = 8] = "PositiveInteger";
    Type[Type["NegativeInteger"] = 9] = "NegativeInteger";
    Type[Type["PositiveIntegerByte"] = 10] = "PositiveIntegerByte";
    Type[Type["NegativeIntegerByte"] = 11] = "NegativeIntegerByte";
})(Type = exports.Type || (exports.Type = {}));
var isType = function (type, value) {
    assert_1.strict(type >= limits_1.UINT4_MIN && type <= limits_1.UINT4_MAX);
    assert_1.strict(value >= limits_1.UINT8_MIN && value <= limits_1.UINT8_MAX);
    return (value & 15) === type;
};
exports.isType = isType;
var getTypeTag = function (type, metadata) {
    assert_1.strict(type >= limits_1.UINT4_MIN && type <= limits_1.UINT4_MAX);
    assert_1.strict(metadata >= limits_1.UINT4_MIN && metadata <= limits_1.UINT4_MAX);
    return (metadata << 4) | type;
};
exports.getTypeTag = getTypeTag;
var getMetadata = function (value) {
    assert_1.strict(value >= limits_1.UINT8_MIN && value <= limits_1.UINT8_MAX);
    return value >>> 4;
};
exports.getMetadata = getMetadata;
