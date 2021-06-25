"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varintDecode = exports.varintEncode = void 0;
var MOST_SIGNIFICANT_BIT = BigInt(128);
var LEAST_SIGNIFICANT_BITS = BigInt(127);
var SHIFT = BigInt(7);
var ZERO = BigInt(0);
var varintEncode = function (buffer, offset, value) {
    var accumulator = value;
    var cursor = offset;
    while (accumulator > LEAST_SIGNIFICANT_BITS) {
        cursor = buffer.writeUInt8(Number((accumulator & LEAST_SIGNIFICANT_BITS) | MOST_SIGNIFICANT_BIT), cursor);
        accumulator >>= SHIFT;
    }
    cursor = buffer.writeUInt8(Number(accumulator), cursor);
    return cursor - offset;
};
exports.varintEncode = varintEncode;
var varintDecode = function (buffer, offset) {
    var result = ZERO;
    var cursor = offset;
    while (true) {
        var value = BigInt(buffer.readUInt8(cursor));
        result += ((value & LEAST_SIGNIFICANT_BITS) << (SHIFT * BigInt(cursor - offset)));
        cursor += 1;
        if ((value & MOST_SIGNIFICANT_BIT) === ZERO) {
            break;
        }
    }
    return {
        value: result,
        bytes: cursor - offset
    };
};
exports.varintDecode = varintDecode;
