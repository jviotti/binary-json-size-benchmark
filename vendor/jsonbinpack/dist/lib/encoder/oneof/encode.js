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
exports.ONEOF_CHOICE_INDEX_PREFIX = void 0;
var assert_1 = require("assert");
var schema_1 = require("../../schema");
var encode_1 = require("../integer/encode");
var index_1 = require("../index");
var ONEOF_CHOICE_INDEX_PREFIX = function (buffer, offset, value, options, context) {
    var e_1, _a;
    assert_1.strict(options.choices.length > 0);
    var choiceIndex = -1;
    try {
        for (var _b = __values(options.choices.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), index = _d[0], definition = _d[1];
            if (schema_1.validateSchema(definition.schema, value)) {
                choiceIndex = index;
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
    assert_1.strict(choiceIndex >= 0);
    var indexBytes = encode_1.FLOOR_ENUM_VARINT(buffer, offset, choiceIndex, {
        minimum: 0
    }, context);
    var bytesWritten = index_1.encode(buffer, offset + indexBytes, options.choices[choiceIndex].encoding, value, context);
    return indexBytes + bytesWritten;
};
exports.ONEOF_CHOICE_INDEX_PREFIX = ONEOF_CHOICE_INDEX_PREFIX;
