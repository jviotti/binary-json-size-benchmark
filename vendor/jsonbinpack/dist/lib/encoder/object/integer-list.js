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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.integerListDecode = exports.integerListEncode = void 0;
var assert_1 = require("assert");
var bitset_1 = require("./bitset");
var integerListEncode = function (buffer, offset, integers, options) {
    var e_1, _a;
    var bits = Math.floor(Math.log2(options.maximum - options.minimum) + 1);
    var result = [];
    try {
        for (var integers_1 = __values(integers), integers_1_1 = integers_1.next(); !integers_1_1.done; integers_1_1 = integers_1.next()) {
            var integer = integers_1_1.value;
            assert_1.strict(integer >= options.minimum);
            assert_1.strict(integer <= options.maximum);
            var value = integer - options.minimum;
            var bitset = value.toString(2).padStart(bits, '0').split('')
                .map(function (digit) {
                return Boolean(parseInt(digit, 10));
            });
            result.push.apply(result, __spreadArray([], __read(bitset)));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (integers_1_1 && !integers_1_1.done && (_a = integers_1.return)) _a.call(integers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return bitset_1.bitsetEncode(buffer, offset, result);
};
exports.integerListEncode = integerListEncode;
var integerListDecode = function (buffer, offset, size, options) {
    var range = options.maximum - options.minimum;
    var bits = range === 0 ? 1 : Math.floor(Math.log2(range) + 1);
    var bitset = bitset_1.bitsetDecode(buffer, offset, size * bits);
    var result = [];
    var index = 0;
    while (result.length < size) {
        var value = parseInt(bitset.value.slice(index, index + bits).map(function (digit) {
            return digit ? '1' : '0';
        }).join(''), 2);
        result.push(value + options.minimum);
        index += bits;
    }
    return {
        value: result,
        bytes: bitset.bytes
    };
};
exports.integerListDecode = integerListDecode;
