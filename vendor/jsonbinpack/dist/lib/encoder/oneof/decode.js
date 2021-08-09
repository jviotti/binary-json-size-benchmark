"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONEOF_CHOICE_INDEX_PREFIX = void 0;
var decode_1 = require("../integer/decode");
var index_1 = require("../index");
var ONEOF_CHOICE_INDEX_PREFIX = function (buffer, offset, options) {
    var index = decode_1.FLOOR_ENUM_VARINT(buffer, offset, {
        minimum: 0
    });
    var result = index_1.decode(buffer, offset + index.bytes, options.choices[index.value].encoding);
    return {
        value: result.value,
        bytes: index.bytes + result.bytes
    };
};
exports.ONEOF_CHOICE_INDEX_PREFIX = ONEOF_CHOICE_INDEX_PREFIX;
