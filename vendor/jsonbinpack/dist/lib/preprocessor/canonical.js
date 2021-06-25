"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.canonicalizeSchema = void 0;
var assert_1 = require("assert");
var lodash_1 = require("lodash");
var SCHEMA_BOOLEAN_KEYS = ['type'];
var SCHEMA_INTEGER_KEYS = ['type', 'minimum', 'maximum', 'multipleOf'];
var SCHEMA_NULL_KEYS = ['type'];
var SCHEMA_NUMBER_KEYS = ['type', 'maximum', 'minimum'];
var SCHEMA_STRING_KEYS = ['type', 'maxLength', 'minLength', 'format', 'contentMediaType'];
var SCHEMA_ARRAY_KEYS = ['type', 'maxItems', 'minItems', 'items', 'prefixItems'];
var SCHEMA_OBJECT_KEYS = ['type', 'additionalProperties', 'required', 'propertyNames', 'properties', 'maxProperties'];
var SCHEMA_KEYS = lodash_1.concat(SCHEMA_BOOLEAN_KEYS, SCHEMA_INTEGER_KEYS, SCHEMA_NULL_KEYS, SCHEMA_NUMBER_KEYS, SCHEMA_STRING_KEYS, SCHEMA_ARRAY_KEYS, SCHEMA_OBJECT_KEYS);
var canonicalizeSchema = function (schema) {
    if (typeof schema === 'boolean') {
        return {};
    }
    if (typeof schema.const !== 'undefined') {
        return {
            const: schema.const
        };
    }
    else if (Array.isArray(schema.enum)) {
        return {
            enum: schema.enum
        };
    }
    if (typeof schema.items !== 'undefined') {
        assert_1.strict(typeof schema.items === 'boolean' || (typeof schema.items === 'object' &&
            !Array.isArray(schema.items) &&
            schema.items !== null));
        Reflect.set(schema, 'items', exports.canonicalizeSchema(schema.items));
    }
    if (typeof schema.additionalProperties !== 'undefined') {
        assert_1.strict(typeof schema.additionalProperties === 'boolean' || (typeof schema.additionalProperties === 'object' &&
            !Array.isArray(schema.additionalProperties) &&
            schema.additionalProperties !== null));
        if (schema.additionalProperties !== false) {
            Reflect.set(schema, 'additionalProperties', exports.canonicalizeSchema(schema.additionalProperties));
        }
    }
    if (typeof schema.properties !== 'undefined') {
        assert_1.strict(typeof schema.properties === 'object' &&
            !Array.isArray(schema.properties) &&
            schema.properties !== null);
        Reflect.set(schema, 'properties', lodash_1.mapValues(schema.properties, function (subschema) {
            assert_1.strict(typeof subschema === 'boolean' ||
                (typeof subschema === 'object' &&
                    !Array.isArray(subschema) &&
                    subschema !== null));
            return exports.canonicalizeSchema(subschema);
        }));
    }
    if (typeof schema.propertyNames !== 'undefined') {
        assert_1.strict(typeof schema.propertyNames === 'boolean' || (typeof schema.propertyNames === 'object' &&
            !Array.isArray(schema.propertyNames) &&
            schema.propertyNames !== null));
        Reflect.set(schema, 'propertyNames', exports.canonicalizeSchema(schema.propertyNames));
    }
    if (typeof schema.prefixItems !== 'undefined') {
        assert_1.strict(Array.isArray(schema.prefixItems));
        Reflect.set(schema, 'prefixItems', schema.prefixItems.map(function (subschema) {
            assert_1.strict(typeof subschema === 'boolean' || (typeof subschema === 'object' &&
                !Array.isArray(subschema) &&
                subschema !== null));
            return exports.canonicalizeSchema(subschema);
        }));
    }
    if (Array.isArray(schema.allOf)) {
        return exports.canonicalizeSchema(lodash_1.merge.apply(void 0, __spreadArray([{}], __read(schema.allOf))));
    }
    else if (Array.isArray(schema.oneOf)) {
        var branches = schema.oneOf.map(function (choice) {
            return exports.canonicalizeSchema(lodash_1.merge(lodash_1.cloneDeep(choice), lodash_1.omit(schema, ['oneOf'])));
        });
        var uniqueBranches = lodash_1.uniqWith(branches, lodash_1.isEqual);
        if (uniqueBranches.length === 1) {
            return uniqueBranches[0];
        }
        return {
            oneOf: uniqueBranches
        };
    }
    else if (Array.isArray(schema.anyOf)) {
        var branches = schema.anyOf.map(function (choice) {
            return exports.canonicalizeSchema(lodash_1.merge(lodash_1.cloneDeep(choice), lodash_1.omit(schema, ['anyOf'])));
        });
        var uniqueBranches = lodash_1.uniqWith(branches, lodash_1.isEqual);
        if (uniqueBranches.length === 1) {
            return uniqueBranches[0];
        }
        return {
            anyOf: uniqueBranches
        };
    }
    if (Array.isArray(schema.type)) {
        return {
            anyOf: schema.type.map(function (type) {
                return exports.canonicalizeSchema(__assign(__assign({}, schema), { type: type }));
            })
        };
    }
    switch (schema.type) {
        case 'boolean': return lodash_1.pick(schema, SCHEMA_BOOLEAN_KEYS);
        case 'integer': return lodash_1.pick(schema, SCHEMA_INTEGER_KEYS);
        case 'null': return lodash_1.pick(schema, SCHEMA_NULL_KEYS);
        case 'number': return lodash_1.pick(schema, SCHEMA_NUMBER_KEYS);
        case 'string': return lodash_1.pick(schema, SCHEMA_STRING_KEYS);
        case 'array':
            return lodash_1.pick(schema, SCHEMA_ARRAY_KEYS);
        case 'object': return lodash_1.pick(schema, SCHEMA_OBJECT_KEYS);
        default:
            if (Object.keys(schema).length > 0) {
                var result = Object.assign({}, lodash_1.pick(schema, SCHEMA_KEYS), {
                    type: [
                        'boolean',
                        'integer',
                        'null',
                        'number',
                        'string',
                        'array',
                        'object'
                    ]
                });
                if (typeof schema.patternProperties !== 'undefined' &&
                    (typeof result.additionalProperties !== 'boolean' ||
                        result.additionalProperties === false)) {
                    result.additionalProperties = true;
                }
                return exports.canonicalizeSchema(result);
            }
            return {};
    }
};
exports.canonicalizeSchema = canonicalizeSchema;
