"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitsetDecode = exports.bitsetEncode = void 0;
var limits_1 = require("../../utils/limits");
var getBytesToStoreBits = function (bits) {
    return ((bits + 7) & (-8)) / 8;
};
var bitsetEncode = function (buffer, offset, bits) {
    var e_1, _a;
    if (bits.length === 0) {
        return 0;
    }
    var bytes = getBytesToStoreBits(bits.length);
    var written = 0;
    while (written < bytes) {
        var chunkIndex = written * limits_1.BYTE_BITS;
        var chunk = bits.slice(chunkIndex, chunkIndex + limits_1.BYTE_BITS);
        var result = 0;
        try {
            for (var _b = (e_1 = void 0, __values(chunk.entries())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], bit = _d[1];
                if (bit) {
                    result |= (1 << index);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var currentOffset = offset + written;
        written += buffer.writeUInt8(result >>> 0, currentOffset) - currentOffset;
    }
    return written;
};
exports.bitsetEncode = bitsetEncode;
var bitsetDecode = function (buffer, offset, length) {
    if (length === 0) {
        return {
            value: [],
            bytes: 0
        };
    }
    var bytes = getBytesToStoreBits(length);
    var result = [];
    var cursor = 0;
    while (cursor < bytes) {
        var value = buffer.readUInt8(offset + cursor);
        var bit = 0;
        while (result.length < length && bit < limits_1.BYTE_BITS) {
            result.push(Boolean((1 << (result.length % limits_1.BYTE_BITS)) & value));
            bit += 1;
        }
        cursor += 1;
    }
    return {
        value: result,
        bytes: bytes
    };
};
exports.bitsetDecode = bitsetDecode;
