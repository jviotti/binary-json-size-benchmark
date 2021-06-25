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
exports.UNBOUNDED_TYPED__LENGTH_PREFIX = exports.FLOOR_TYPED__LENGTH_PREFIX = exports.ROOF_8BITS_TYPED__LENGTH_PREFIX = exports.ROOF_TYPED__LENGTH_PREFIX = exports.BOUNDED_8BITS_TYPED__LENGTH_PREFIX = exports.BOUNDED_TYPED__LENGTH_PREFIX = exports.UNBOUNDED_SEMITYPED__LENGTH_PREFIX = exports.ROOF_8BITS_SEMITYPED__LENGTH_PREFIX = exports.ROOF_SEMITYPED__LENGTH_PREFIX = exports.FLOOR_SEMITYPED__LENGTH_PREFIX = exports.BOUNDED_SEMITYPED__LENGTH_PREFIX = exports.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var index_1 = require("../index");
var encode_1 = require("../integer/encode");
var encode_2 = require("../any/encode");
var encodeArray = function (buffer, offset, value, prefixEncodings, context, defaultEncoding) {
    var e_1, _a;
    var _b;
    var cursor = offset;
    try {
        for (var _c = __values(value.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = __read(_d.value, 2), index = _e[0], element = _e[1];
            var encoding = (_b = prefixEncodings[index]) !== null && _b !== void 0 ? _b : defaultEncoding;
            if (typeof encoding === 'undefined') {
                var bytesWritten = encode_2.ANY__TYPE_PREFIX(buffer, cursor, element, {}, context);
                cursor += bytesWritten;
            }
            else {
                var bytesWritten = index_1.encode(buffer, cursor, encoding, element, context);
                cursor += bytesWritten;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return cursor - offset;
};
var BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value.length >= options.minimum);
    assert_1.strict(value.length <= options.maximum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var lengthBytes = options.maximum === options.minimum
        ? 0
        : encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, value.length, {
            minimum: options.minimum,
            maximum: options.maximum
        }, context);
    return lengthBytes + encodeArray(buffer, offset + lengthBytes, value, options.prefixEncodings, context);
};
exports.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX = BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX;
var BOUNDED_SEMITYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value.length >= options.minimum);
    assert_1.strict(value.length <= options.maximum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var lengthBytes = options.maximum === options.minimum
        ? 0
        : encode_1.BOUNDED__ENUM_VARINT(buffer, offset, value.length, {
            minimum: options.minimum,
            maximum: options.maximum
        }, context);
    return lengthBytes + encodeArray(buffer, offset + lengthBytes, value, options.prefixEncodings, context);
};
exports.BOUNDED_SEMITYPED__LENGTH_PREFIX = BOUNDED_SEMITYPED__LENGTH_PREFIX;
var FLOOR_SEMITYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(value.length >= options.minimum);
    var lengthBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset, value.length, {
        minimum: options.minimum
    }, context);
    return lengthBytes + encodeArray(buffer, offset + lengthBytes, value, options.prefixEncodings, context);
};
exports.FLOOR_SEMITYPED__LENGTH_PREFIX = FLOOR_SEMITYPED__LENGTH_PREFIX;
var ROOF_SEMITYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(value.length <= options.maximum);
    var lengthBytes = encode_1.ROOF__MIRROR_ENUM_VARINT(buffer, offset, value.length, {
        maximum: options.maximum
    }, context);
    return lengthBytes + encodeArray(buffer, offset + lengthBytes, value, options.prefixEncodings, context);
};
exports.ROOF_SEMITYPED__LENGTH_PREFIX = ROOF_SEMITYPED__LENGTH_PREFIX;
var ROOF_8BITS_SEMITYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(value.length <= options.maximum);
    assert_1.strict(options.maximum <= limits_1.UINT8_MAX);
    return exports.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, offset, value, {
        minimum: 0,
        maximum: options.maximum,
        prefixEncodings: options.prefixEncodings
    }, context);
};
exports.ROOF_8BITS_SEMITYPED__LENGTH_PREFIX = ROOF_8BITS_SEMITYPED__LENGTH_PREFIX;
var UNBOUNDED_SEMITYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    return exports.FLOOR_SEMITYPED__LENGTH_PREFIX(buffer, offset, value, {
        minimum: 0,
        prefixEncodings: options.prefixEncodings
    }, context);
};
exports.UNBOUNDED_SEMITYPED__LENGTH_PREFIX = UNBOUNDED_SEMITYPED__LENGTH_PREFIX;
var BOUNDED_TYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value.length >= options.minimum);
    assert_1.strict(value.length <= options.maximum);
    var lengthBytes = options.maximum === options.minimum
        ? 0
        : encode_1.BOUNDED__ENUM_VARINT(buffer, offset, value.length, {
            minimum: options.minimum,
            maximum: options.maximum
        }, context);
    return lengthBytes + encodeArray(buffer, offset + lengthBytes, value, options.prefixEncodings, context, options.encoding);
};
exports.BOUNDED_TYPED__LENGTH_PREFIX = BOUNDED_TYPED__LENGTH_PREFIX;
var BOUNDED_8BITS_TYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value.length >= options.minimum);
    assert_1.strict(value.length <= options.maximum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var lengthBytes = options.maximum === options.minimum
        ? 0
        : encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, value.length, {
            minimum: options.minimum,
            maximum: options.maximum
        }, context);
    return lengthBytes + encodeArray(buffer, offset + lengthBytes, value, options.prefixEncodings, context, options.encoding);
};
exports.BOUNDED_8BITS_TYPED__LENGTH_PREFIX = BOUNDED_8BITS_TYPED__LENGTH_PREFIX;
var ROOF_TYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(value.length <= options.maximum);
    var lengthBytes = encode_1.ROOF__MIRROR_ENUM_VARINT(buffer, offset, value.length, {
        maximum: options.maximum
    }, context);
    return lengthBytes + encodeArray(buffer, offset + lengthBytes, value, options.prefixEncodings, context, options.encoding);
};
exports.ROOF_TYPED__LENGTH_PREFIX = ROOF_TYPED__LENGTH_PREFIX;
var ROOF_8BITS_TYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(value.length <= options.maximum);
    assert_1.strict(options.maximum <= limits_1.UINT8_MAX);
    return exports.BOUNDED_8BITS_TYPED__LENGTH_PREFIX(buffer, offset, value, {
        minimum: 0,
        maximum: options.maximum,
        prefixEncodings: options.prefixEncodings,
        encoding: options.encoding
    }, context);
};
exports.ROOF_8BITS_TYPED__LENGTH_PREFIX = ROOF_8BITS_TYPED__LENGTH_PREFIX;
var FLOOR_TYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(value.length >= options.minimum);
    var lengthBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset, value.length, {
        minimum: options.minimum
    }, context);
    return lengthBytes + encodeArray(buffer, offset + lengthBytes, value, options.prefixEncodings, context, options.encoding);
};
exports.FLOOR_TYPED__LENGTH_PREFIX = FLOOR_TYPED__LENGTH_PREFIX;
var UNBOUNDED_TYPED__LENGTH_PREFIX = function (buffer, offset, value, options, context) {
    return exports.FLOOR_TYPED__LENGTH_PREFIX(buffer, offset, value, {
        minimum: 0,
        encoding: options.encoding,
        prefixEncodings: options.prefixEncodings
    }, context);
};
exports.UNBOUNDED_TYPED__LENGTH_PREFIX = UNBOUNDED_TYPED__LENGTH_PREFIX;
