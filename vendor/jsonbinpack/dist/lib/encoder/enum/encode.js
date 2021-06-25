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
exports.LARGE_BOUNDED_CHOICE_INDEX = exports.BOUNDED_CHOICE_INDEX = exports.TOP_LEVEL_8BIT_CHOICE_INDEX = void 0;
var assert_1 = require("assert");
var util_1 = require("util");
var encode_1 = require("../integer/encode");
var limits_1 = require("../../utils/limits");
var TOP_LEVEL_8BIT_CHOICE_INDEX = function (buffer, offset, value, options, context) {
    var e_1, _a;
    assert_1.strict(options.choices.length > 0);
    assert_1.strict(options.choices.length <= limits_1.UINT8_MAX);
    assert_1.strict(buffer.getSize() === 0);
    assert_1.strict(offset === 0);
    var cursor = -1;
    try {
        for (var _b = __values(options.choices.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), index = _d[0], choice = _d[1];
            if (util_1.isDeepStrictEqual(value, choice)) {
                cursor = index;
                break;
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
    assert_1.strict(cursor !== -1);
    assert_1.strict(cursor >= 0 && cursor < options.choices.length);
    if (cursor === 0) {
        return 0;
    }
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, cursor, {
        minimum: 1,
        maximum: options.choices.length
    }, context);
};
exports.TOP_LEVEL_8BIT_CHOICE_INDEX = TOP_LEVEL_8BIT_CHOICE_INDEX;
var BOUNDED_CHOICE_INDEX = function (buffer, offset, value, options, context) {
    var e_2, _a;
    assert_1.strict(options.choices.length > 0);
    assert_1.strict(options.choices.length <= limits_1.UINT8_MAX);
    var cursor = -1;
    try {
        for (var _b = __values(options.choices.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), index = _d[0], choice = _d[1];
            if (util_1.isDeepStrictEqual(value, choice)) {
                cursor = index;
                break;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    assert_1.strict(cursor !== -1);
    assert_1.strict(cursor >= 0 && cursor < options.choices.length);
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, cursor, {
        minimum: 0,
        maximum: options.choices.length
    }, context);
};
exports.BOUNDED_CHOICE_INDEX = BOUNDED_CHOICE_INDEX;
var LARGE_BOUNDED_CHOICE_INDEX = function (buffer, offset, value, options, context) {
    var e_3, _a;
    assert_1.strict(options.choices.length > 0);
    var cursor = -1;
    try {
        for (var _b = __values(options.choices.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), index = _d[0], choice = _d[1];
            if (util_1.isDeepStrictEqual(value, choice)) {
                cursor = index;
                break;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    assert_1.strict(cursor !== -1);
    assert_1.strict(cursor >= 0 && cursor < options.choices.length);
    return encode_1.BOUNDED__ENUM_VARINT(buffer, offset, cursor, {
        minimum: 0,
        maximum: options.choices.length
    }, context);
};
exports.LARGE_BOUNDED_CHOICE_INDEX = LARGE_BOUNDED_CHOICE_INDEX;
