"use strict";
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
exports.getArrayEncoding = exports.getArrayStates = void 0;
var lodash_1 = require("lodash");
var encoder_1 = require("../encoder");
var index_1 = require("./index");
var limits_1 = require("../utils/limits");
var permutation_1 = require("../utils/permutation");
var enum_1 = require("./enum");
var getArrayStates = function (schema) {
    var _a;
    if (typeof schema.maxItems === 'number' &&
        (typeof schema.items !== 'undefined' || typeof schema.prefixItems !== 'undefined')) {
        var choices_1 = lodash_1.range(0, schema.maxItems).reduce(function (accumulator, index) {
            var _a, _b, _c;
            var states = index_1.getStates((_c = (_b = ((_a = schema.prefixItems) !== null && _a !== void 0 ? _a : [])[index]) !== null && _b !== void 0 ? _b : schema.items) !== null && _c !== void 0 ? _c : {});
            if (Array.isArray(accumulator) && Array.isArray(states)) {
                accumulator.push(states);
            }
            else if (typeof accumulator !== 'number' && !Array.isArray(states)) {
                return states + accumulator.reduce(function (subaccumulator, choice) {
                    return subaccumulator + choice.length;
                }, 0);
            }
            else if (!Array.isArray(accumulator)) {
                return accumulator + (Array.isArray(states) ? states.length : states);
            }
            return accumulator;
        }, []);
        if (typeof choices_1 === 'number') {
            return choices_1;
        }
        return lodash_1.range((_a = schema.minItems) !== null && _a !== void 0 ? _a : 0, schema.maxItems + 1)
            .reduce(function (accumulator, maximum) {
            return accumulator.concat(permutation_1.generatePermutations.apply(void 0, __spreadArray([], __read(choices_1.slice(0, maximum)))));
        }, []);
    }
    return Infinity;
};
exports.getArrayStates = getArrayStates;
var getArrayEncoding = function (schema, level) {
    var _a;
    var states = exports.getArrayStates(schema);
    if (Array.isArray(states) && states.length < limits_1.UINT8_MAX) {
        return enum_1.getEnumEncoding({
            enum: states
        }, level);
    }
    var encodingSchema = schema.items;
    var prefixEncodings = ((_a = schema.prefixItems) !== null && _a !== void 0 ? _a : []).map(function (subschema) {
        return index_1.getEncoding(subschema, level + 1);
    });
    if (typeof encodingSchema === 'undefined') {
        if (typeof schema.minItems !== 'undefined' &&
            typeof schema.maxItems !== 'undefined') {
            if (schema.maxItems - schema.minItems <= limits_1.UINT8_MAX) {
                return {
                    type: encoder_1.EncodingType.Array,
                    encoding: 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX',
                    options: {
                        minimum: schema.minItems,
                        maximum: schema.maxItems,
                        prefixEncodings: prefixEncodings,
                        encoding: {
                            type: encoder_1.EncodingType.Any,
                            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                            options: {}
                        }
                    }
                };
            }
            return {
                type: encoder_1.EncodingType.Array,
                encoding: 'BOUNDED_TYPED_LENGTH_PREFIX',
                options: {
                    minimum: schema.minItems,
                    maximum: schema.maxItems,
                    prefixEncodings: prefixEncodings,
                    encoding: {
                        type: encoder_1.EncodingType.Any,
                        encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                        options: {}
                    }
                }
            };
        }
        else if (typeof schema.minItems === 'undefined' &&
            typeof schema.maxItems !== 'undefined') {
            if (schema.maxItems <= limits_1.UINT8_MAX) {
                return {
                    type: encoder_1.EncodingType.Array,
                    encoding: 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX',
                    options: {
                        minimum: 0,
                        maximum: schema.maxItems,
                        prefixEncodings: prefixEncodings,
                        encoding: {
                            type: encoder_1.EncodingType.Any,
                            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                            options: {}
                        }
                    }
                };
            }
            return {
                type: encoder_1.EncodingType.Array,
                encoding: 'ROOF_TYPED_LENGTH_PREFIX',
                options: {
                    maximum: schema.maxItems,
                    prefixEncodings: prefixEncodings,
                    encoding: {
                        type: encoder_1.EncodingType.Any,
                        encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                        options: {}
                    }
                }
            };
        }
        else if (typeof schema.minItems !== 'undefined' &&
            typeof schema.maxItems === 'undefined') {
            return {
                type: encoder_1.EncodingType.Array,
                encoding: 'FLOOR_TYPED_LENGTH_PREFIX',
                options: {
                    minimum: schema.minItems,
                    prefixEncodings: prefixEncodings,
                    encoding: {
                        type: encoder_1.EncodingType.Any,
                        encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                        options: {}
                    }
                }
            };
        }
        return {
            type: encoder_1.EncodingType.Array,
            encoding: 'FLOOR_TYPED_LENGTH_PREFIX',
            options: {
                minimum: 0,
                prefixEncodings: prefixEncodings,
                encoding: {
                    type: encoder_1.EncodingType.Any,
                    encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
                    options: {}
                }
            }
        };
    }
    if (typeof schema.minItems !== 'undefined' &&
        typeof schema.maxItems !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Array,
            encoding: (schema.maxItems - schema.minItems <= limits_1.UINT8_MAX)
                ? 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX' : 'BOUNDED_TYPED_LENGTH_PREFIX',
            options: {
                minimum: schema.minItems,
                maximum: schema.maxItems,
                encoding: index_1.getEncoding(encodingSchema, level + 1),
                prefixEncodings: prefixEncodings
            }
        };
    }
    else if (typeof schema.minItems === 'undefined' &&
        typeof schema.maxItems !== 'undefined') {
        if (schema.maxItems <= limits_1.UINT8_MAX) {
            return {
                type: encoder_1.EncodingType.Array,
                encoding: 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX',
                options: {
                    minimum: 0,
                    maximum: schema.maxItems,
                    encoding: index_1.getEncoding(encodingSchema, level + 1),
                    prefixEncodings: prefixEncodings
                }
            };
        }
        return {
            type: encoder_1.EncodingType.Array,
            encoding: 'ROOF_TYPED_LENGTH_PREFIX',
            options: {
                maximum: schema.maxItems,
                encoding: index_1.getEncoding(encodingSchema, level + 1),
                prefixEncodings: prefixEncodings
            }
        };
    }
    else if (typeof schema.minItems !== 'undefined' &&
        typeof schema.maxItems === 'undefined') {
        return {
            type: encoder_1.EncodingType.Array,
            encoding: 'FLOOR_TYPED_LENGTH_PREFIX',
            options: {
                minimum: schema.minItems,
                encoding: index_1.getEncoding(encodingSchema, level + 1),
                prefixEncodings: prefixEncodings
            }
        };
    }
    return {
        type: encoder_1.EncodingType.Array,
        encoding: 'FLOOR_TYPED_LENGTH_PREFIX',
        options: {
            minimum: 0,
            encoding: index_1.getEncoding(encodingSchema, level + 1),
            prefixEncodings: prefixEncodings
        }
    };
};
exports.getArrayEncoding = getArrayEncoding;
