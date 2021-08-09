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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOUBLE_VARINT_TUPLE = void 0;
var assert_1 = require("assert");
var from_exponential_1 = __importDefault(require("from-exponential"));
var zigzag_1 = require("../integer/zigzag");
var varint_1 = require("../integer/varint");
var stringPrefixCount = function (value, prefix) {
    var e_1, _a;
    var count = 0;
    try {
        for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
            var character = value_1_1.value;
            if (character === prefix) {
                count += 1;
            }
            else {
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return count;
};
var DOUBLE_VARINT_TUPLE = function (buffer, offset, value, _options, _context) {
    var valueString = from_exponential_1.default(value);
    var pointIndex = valueString.startsWith('-')
        ? valueString.indexOf('.') - 1
        : valueString.indexOf('.');
    var point = pointIndex > 0 ? pointIndex : 0;
    assert_1.strict(point >= 0);
    var integralString = valueString.replace('.', '');
    var zeroPrefix = stringPrefixCount(integralString.startsWith('-')
        ? integralString.slice(1) : integralString, '0');
    assert_1.strict(zeroPrefix >= 0);
    var integralBytes = varint_1.varintEncode(buffer, offset, zigzag_1.zigzagEncode(BigInt(integralString)));
    var pointValue = zeroPrefix === 0 || zeroPrefix === integralString.length
        ? zigzag_1.zigzagEncode(BigInt(point))
        : zigzag_1.zigzagEncode(BigInt(-zeroPrefix - (valueString.startsWith('-') ? 1 : 0)));
    return integralBytes + varint_1.varintEncode(buffer, offset + integralBytes, pointValue);
};
exports.DOUBLE_VARINT_TUPLE = DOUBLE_VARINT_TUPLE;
