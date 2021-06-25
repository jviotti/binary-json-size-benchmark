"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zigzagDecode = exports.zigzagEncode = void 0;
var zigzagEncode = function (value) {
    return value >= BigInt(0)
        ? value * BigInt(2) : (value * BigInt(-2)) - BigInt(1);
};
exports.zigzagEncode = zigzagEncode;
var zigzagDecode = function (value) {
    return value % BigInt(2) === BigInt(0)
        ? value / BigInt(2) : (value + BigInt(1)) / BigInt(-2);
};
exports.zigzagDecode = zigzagDecode;
