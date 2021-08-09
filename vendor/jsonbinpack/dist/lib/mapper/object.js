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
exports.getObjectEncoding = exports.getObjectStates = void 0;
var util_1 = require("util");
var string_1 = require("./string");
var index_1 = require("./index");
var encoder_1 = require("../encoder");
var enum_1 = require("./enum");
var permutation_1 = require("../utils/permutation");
var limits_1 = require("../utils/limits");
var parseAdditionalProperties = function (value, level) {
    if (typeof value === 'boolean' && !value) {
        return null;
    }
    var schema = (typeof value === 'undefined' || (typeof value === 'boolean' && value))
        ? {} : value;
    return index_1.getEncoding(schema, level + 1);
};
var getObjectStates = function (schema) {
    var e_1, _a, e_2, _b;
    var _c, _d;
    if (typeof schema.additionalProperties === 'boolean' && !schema.additionalProperties) {
        var schemaProperties = (_c = schema.properties) !== null && _c !== void 0 ? _c : {};
        var requiredProperties = (_d = schema.required) !== null && _d !== void 0 ? _d : [];
        try {
            for (var requiredProperties_1 = __values(requiredProperties), requiredProperties_1_1 = requiredProperties_1.next(); !requiredProperties_1_1.done; requiredProperties_1_1 = requiredProperties_1.next()) {
                var key = requiredProperties_1_1.value;
                if (typeof schemaProperties[key] === 'undefined') {
                    return Infinity;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (requiredProperties_1_1 && !requiredProperties_1_1.done && (_a = requiredProperties_1.return)) _a.call(requiredProperties_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var choices = [];
        var _loop_1 = function (key, value) {
            var states = index_1.getStates(value);
            if (typeof states === 'number' && !Number.isFinite(states)) {
                return { value: Infinity };
            }
            var absoluteStates = states;
            if (!requiredProperties.includes(key)) {
                if (Array.isArray(absoluteStates)) {
                    absoluteStates.push(undefined);
                }
                else {
                    absoluteStates += 1;
                }
            }
            if (Array.isArray(choices) && Array.isArray(absoluteStates)) {
                choices.push(absoluteStates.map(function (state) {
                    var _a;
                    return typeof state === 'undefined' ? {} : (_a = {},
                        _a[key] = state,
                        _a);
                }));
            }
            else {
                choices =
                    (Array.isArray(choices) ? choices.length : choices) *
                        (Array.isArray(absoluteStates) ? absoluteStates.length : absoluteStates);
            }
        };
        try {
            for (var _e = __values(Object.entries(schemaProperties)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var _g = __read(_f.value, 2), key = _g[0], value = _g[1];
                var state_1 = _loop_1(key, value);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (typeof choices === 'number') {
            return choices;
        }
        return permutation_1.generatePermutations.apply(void 0, __spreadArray([], __read(choices))).map(function (result) {
            return Object.assign.apply(Object, __spreadArray([{}], __read(result)));
        });
    }
    return Infinity;
};
exports.getObjectStates = getObjectStates;
var getObjectEncoding = function (schema, level) {
    var e_3, _a, e_4, _b, e_5, _c;
    var _d, _e, _f, _g, _h, _j;
    var states = exports.getObjectStates(schema);
    if (Array.isArray(states) && ((states.length > 1 && states.length < limits_1.UINT8_MAX) || level === 0)) {
        return enum_1.getEnumEncoding({
            enum: states
        }, level);
    }
    var additionalProperties = parseAdditionalProperties(schema.additionalProperties, level);
    var properties = (_d = schema.properties) !== null && _d !== void 0 ? _d : {};
    var propertyEncodings = Object.keys(properties)
        .reduce(function (accumulator, key) {
        accumulator[key] = index_1.getEncoding(properties[key], level + 1);
        return accumulator;
    }, {});
    var unsortedRequiredBooleanProperties = [];
    var nonBooleanRequiredProperties = [];
    try {
        for (var _k = __values((_e = schema.required) !== null && _e !== void 0 ? _e : []), _l = _k.next(); !_l.done; _l = _k.next()) {
            var key = _l.value;
            var encoding = (_g = (_f = propertyEncodings[key]) !== null && _f !== void 0 ? _f : additionalProperties) !== null && _g !== void 0 ? _g : null;
            if (encoding !== null && encoding.type === encoder_1.EncodingType.Boolean) {
                unsortedRequiredBooleanProperties.push(key);
            }
            else {
                nonBooleanRequiredProperties.push(key);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_l && !_l.done && (_a = _k.return)) _a.call(_k);
        }
        finally { if (e_3) throw e_3.error; }
    }
    var booleanRequiredProperties = unsortedRequiredBooleanProperties.sort(function (left, right) {
        return left.localeCompare(right);
    });
    var requiredProperties = nonBooleanRequiredProperties.sort(function (left, right) {
        return left.localeCompare(right);
    });
    var optionalProperties = Object.keys(properties)
        .filter(function (key) {
        return !requiredProperties.includes(key) && !booleanRequiredProperties.includes(key);
    }).sort(function (left, right) {
        return left.localeCompare(right);
    });
    var allRequiredProperties = booleanRequiredProperties.concat(requiredProperties);
    var allProperties = allRequiredProperties.concat(optionalProperties);
    try {
        for (var allProperties_1 = __values(allProperties), allProperties_1_1 = allProperties_1.next(); !allProperties_1_1.done; allProperties_1_1 = allProperties_1.next()) {
            var key = allProperties_1_1.value;
            if (!(key in propertyEncodings)) {
                propertyEncodings[key] = additionalProperties !== null && additionalProperties !== void 0 ? additionalProperties : index_1.getEncoding({}, level + 1);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (allProperties_1_1 && !allProperties_1_1.done && (_b = allProperties_1.return)) _b.call(allProperties_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    var keyEncoding = typeof schema.propertyNames === 'undefined'
        ? {
            type: encoder_1.EncodingType.String,
            encoding: 'STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH',
            options: {}
        }
        : string_1.getStringEncoding(schema.propertyNames, level + 1);
    if (additionalProperties === null) {
        if (optionalProperties.length === 0) {
            return {
                type: encoder_1.EncodingType.Object,
                encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    requiredProperties: requiredProperties,
                    booleanRequiredProperties: booleanRequiredProperties
                }
            };
        }
        else if (allRequiredProperties.length === 0) {
            return {
                type: encoder_1.EncodingType.Object,
                encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    optionalProperties: optionalProperties
                }
            };
        }
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'MIXED_BOUNDED_TYPED_OBJECT',
            options: {
                propertyEncodings: propertyEncodings,
                optionalProperties: optionalProperties,
                requiredProperties: requiredProperties,
                booleanRequiredProperties: booleanRequiredProperties
            }
        };
    }
    if (additionalProperties !== null &&
        requiredProperties.length > 0 &&
        additionalProperties.type === encoder_1.EncodingType.Integer &&
        additionalProperties.encoding === 'BOUNDED_8BITS_ENUM_FIXED') {
        var propertiesDefinition = (_h = schema.properties) !== null && _h !== void 0 ? _h : {};
        var packedRequiredProperties_1 = [];
        var unpackedRequiredProperties = [];
        try {
            for (var _m = __values((_j = schema.required) !== null && _j !== void 0 ? _j : []), _o = _m.next(); !_o.done; _o = _m.next()) {
                var key = _o.value;
                if (booleanRequiredProperties.includes(key)) {
                    continue;
                }
                if (!(key in propertiesDefinition)) {
                    packedRequiredProperties_1.push(key);
                }
                else if (util_1.isDeepStrictEqual(additionalProperties, index_1.getEncoding(propertiesDefinition[key], level + 1))) {
                    packedRequiredProperties_1.push(key);
                }
                else {
                    unpackedRequiredProperties.push(key);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var packedPropertyEncodings = Object.keys(propertyEncodings).reduce(function (accumulator, key) {
            if (!packedRequiredProperties_1.includes(key)) {
                accumulator[key] = propertyEncodings[key];
            }
            return accumulator;
        }, {});
        if (typeof schema.maxProperties === 'number' &&
            schema.maxProperties === packedRequiredProperties_1.length +
                unpackedRequiredProperties.length +
                booleanRequiredProperties.length) {
            return {
                type: encoder_1.EncodingType.Object,
                encoding: 'PACKED_BOUNDED_REQUIRED_OBJECT',
                options: {
                    packedEncoding: additionalProperties,
                    packedRequiredProperties: packedRequiredProperties_1.sort(function (left, right) {
                        return left.localeCompare(right);
                    }),
                    propertyEncodings: packedPropertyEncodings,
                    requiredProperties: unpackedRequiredProperties.sort(function (left, right) {
                        return left.localeCompare(right);
                    }),
                    booleanRequiredProperties: booleanRequiredProperties
                }
            };
        }
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'PACKED_UNBOUNDED_OBJECT',
            options: {
                packedEncoding: additionalProperties,
                packedRequiredProperties: packedRequiredProperties_1.sort(function (left, right) {
                    return left.localeCompare(right);
                }),
                encoding: {
                    type: encoder_1.EncodingType.Any,
                    encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                    options: {}
                },
                propertyEncodings: packedPropertyEncodings,
                optionalProperties: optionalProperties,
                requiredProperties: unpackedRequiredProperties.sort(function (left, right) {
                    return left.localeCompare(right);
                }),
                booleanRequiredProperties: booleanRequiredProperties,
                keyEncoding: keyEncoding
            }
        };
    }
    if (allRequiredProperties.length > 0 && optionalProperties.length > 0) {
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'MIXED_UNBOUNDED_TYPED_OBJECT',
            options: {
                propertyEncodings: propertyEncodings,
                optionalProperties: optionalProperties,
                requiredProperties: requiredProperties,
                booleanRequiredProperties: booleanRequiredProperties,
                keyEncoding: keyEncoding,
                encoding: additionalProperties
            }
        };
    }
    else if (allRequiredProperties.length > 0 && optionalProperties.length === 0) {
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT',
            options: {
                encoding: additionalProperties,
                propertyEncodings: propertyEncodings,
                keyEncoding: keyEncoding,
                requiredProperties: requiredProperties,
                booleanRequiredProperties: booleanRequiredProperties
            }
        };
    }
    else if (allRequiredProperties.length === 0 && optionalProperties.length > 0) {
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'OPTIONAL_UNBOUNDED_TYPED_OBJECT',
            options: {
                encoding: additionalProperties,
                propertyEncodings: propertyEncodings,
                keyEncoding: keyEncoding,
                optionalProperties: optionalProperties
            }
        };
    }
    return {
        type: encoder_1.EncodingType.Object,
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            encoding: additionalProperties,
            keyEncoding: keyEncoding
        }
    };
};
exports.getObjectEncoding = getObjectEncoding;
