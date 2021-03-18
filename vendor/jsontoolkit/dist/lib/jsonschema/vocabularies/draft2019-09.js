"use strict";
/*
 * Copyright 2020 Juan Cruz Viotti
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var ISO8601_REGEXES = require("./iso8601.json");
var jsonpointer_1 = require("../../jsonpointer");
var results_1 = require("../results");
var draft7_1 = require("./draft7");
var ISO8601_DURATION_REGEX = new RegExp(ISO8601_REGEXES.duration);
var draft7_2 = require("./draft7");
exports._const = draft7_2._const;
exports.contains = draft7_2.contains;
exports.propertyNames = draft7_2.propertyNames;
exports.required = draft7_2.required;
exports.type = draft7_2.type;
exports.not = draft7_2.not;
exports.anyOf = draft7_2.anyOf;
exports.allOf = draft7_2.allOf;
exports.oneOf = draft7_2.oneOf;
exports.items = draft7_2.items;
exports.minProperties = draft7_2.minProperties;
exports.maxProperties = draft7_2.maxProperties;
exports.exclusiveMaximum = draft7_2.exclusiveMaximum;
exports.exclusiveMinimum = draft7_2.exclusiveMinimum;
exports.minItems = draft7_2.minItems;
exports.maxItems = draft7_2.maxItems;
exports.multipleOf = draft7_2.multipleOf;
exports.minLength = draft7_2.minLength;
exports.maxLength = draft7_2.maxLength;
exports.maximum = draft7_2.maximum;
exports.minimum = draft7_2.minimum;
exports.pattern = draft7_2.pattern;
exports._enum = draft7_2._enum;
exports.uniqueItems = draft7_2.uniqueItems;
exports.dependencies = draft7_2.dependencies;
exports.properties = draft7_2.properties;
exports.patternProperties = draft7_2.patternProperties;
exports.additionalProperties = draft7_2.additionalProperties;
exports._if = draft7_2._if;
exports.dependentRequired = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, key, requirements, requirements_1, requirements_1_1, requirement;
    var e_1, _d, e_2, _e;
    return __generator(this, function (_f) {
        if (typeof instance !== 'object' ||
            Array.isArray(instance) ||
            instance === null) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
            return [2 /*return*/, results_1.fail(mode, 'The argument must be an object')];
        }
        try {
            for (_a = __values(Object.entries(arg)), _b = _a.next(); !_b.done; _b = _a.next()) {
                _c = __read(_b.value, 2), key = _c[0], requirements = _c[1];
                if (!Array.isArray(requirements)) {
                    return [2 /*return*/, results_1.fail(mode, 'The key requirements must be arrays')];
                }
                if (!(key in instance)) {
                    continue;
                }
                try {
                    for (requirements_1 = (e_2 = void 0, __values(requirements)), requirements_1_1 = requirements_1.next(); !requirements_1_1.done; requirements_1_1 = requirements_1.next()) {
                        requirement = requirements_1_1.value;
                        if (typeof requirement !== 'string') {
                            return [2 /*return*/, results_1.fail(mode, 'Requirements must be strings')];
                        }
                        else if (!(requirement in instance)) {
                            return [2 /*return*/, results_1.fail(mode, "The property \"" + requirement + "\" is required")];
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (requirements_1_1 && !requirements_1_1.done && (_e = requirements_1.return)) _e.call(requirements_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return [2 /*return*/, results_1.ok(mode)];
    });
}); };
exports.dependentSchemas = function (mode, arg, instance, _schema, _scope, validate, instancePointer, schemaPointer, _keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, key, schema, result, e_3_1;
    var e_3, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (typeof instance !== 'object' ||
                    Array.isArray(instance) ||
                    instance === null) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                else if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be an object')];
                }
                _e.label = 1;
            case 1:
                _e.trys.push([1, 7, 8, 9]);
                _a = __values(Object.entries(arg)), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 6];
                _c = __read(_b.value, 2), key = _c[0], schema = _c[1];
                if (!(key in instance)) {
                    return [3 /*break*/, 5];
                }
                if (!(typeof schema === 'object' &&
                    !Array.isArray(schema) &&
                    schema !== null &&
                    schema !== undefined)) return [3 /*break*/, 4];
                return [4 /*yield*/, validate(schema, instance, instancePointer, schemaPointer.concat(['dependentRequired', key]), evaluatedPointers)];
            case 3:
                result = _e.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                return [3 /*break*/, 5];
            case 4:
                if (typeof schema === 'boolean' && !schema && key in instance) {
                    return [2 /*return*/, results_1.fail(mode, "The \"" + key + "\" property must not exist")];
                }
                _e.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_3_1 = _e.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
exports.unevaluatedProperties = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, key, newInstancePointer, _c, _d, key, newInstancePointer, serializedPointer, value, result, e_4_1;
    var e_5, _e, e_4, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                if (typeof arg !== 'boolean' &&
                    (typeof arg !== 'object' || Array.isArray(arg) || arg === null)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be a boolean or an object')];
                }
                else if (typeof instance !== 'object' ||
                    Array.isArray(instance) ||
                    instance === null) {
                    return [2 /*return*/, results_1.ok(mode)
                        // Early return if "unevaluatedProperties": true
                    ];
                    // Early return if "unevaluatedProperties": true
                }
                else if (typeof arg === 'boolean' && arg) {
                    try {
                        for (_a = __values(Object.keys(instance)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            key = _b.value;
                            newInstancePointer = instancePointer.concat(key);
                            evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    return [2 /*return*/, results_1.ok(mode)];
                }
                _g.label = 1;
            case 1:
                _g.trys.push([1, 6, 7, 8]);
                _c = __values(Object.keys(instance)), _d = _c.next();
                _g.label = 2;
            case 2:
                if (!!_d.done) return [3 /*break*/, 5];
                key = _d.value;
                newInstancePointer = instancePointer.concat(key);
                serializedPointer = jsonpointer_1.serializePointer(newInstancePointer);
                // This property has been already evaluated
                if (evaluatedPointers.has(serializedPointer)) {
                    return [3 /*break*/, 4];
                }
                // The only case this can happen is when the argument is falsy
                if (typeof arg === 'boolean') {
                    return [2 /*return*/, results_1.fail(mode, "The property " + String(key) + " has not been evaluated")];
                }
                value = instance[key];
                if (value === undefined) {
                    return [3 /*break*/, 4];
                }
                evaluatedPointers.add(serializedPointer);
                return [4 /*yield*/, validate(arg, value, newInstancePointer, keywordPointer, evaluatedPointers)];
            case 3:
                result = _g.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                _g.label = 4;
            case 4:
                _d = _c.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_4_1 = _g.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
exports.unevaluatedItems = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, index, newInstancePointer, _c, _d, _e, index, element, newInstancePointer, serializedPointer, result, e_6_1;
    var e_7, _f, e_6, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                if (typeof arg !== 'boolean' &&
                    (typeof arg !== 'object' || Array.isArray(arg) || arg === null)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be a boolean or an object')];
                }
                else if (!Array.isArray(instance)) {
                    return [2 /*return*/, results_1.ok(mode)
                        // Early return if "unevaluatedItems": true
                    ];
                    // Early return if "unevaluatedItems": true
                }
                else if (typeof arg === 'boolean' && arg) {
                    try {
                        for (_a = __values(instance.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                            index = _b.value;
                            newInstancePointer = instancePointer.concat(index);
                            evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    return [2 /*return*/, results_1.ok(mode)];
                }
                _h.label = 1;
            case 1:
                _h.trys.push([1, 6, 7, 8]);
                _c = __values(instance.entries()), _d = _c.next();
                _h.label = 2;
            case 2:
                if (!!_d.done) return [3 /*break*/, 5];
                _e = __read(_d.value, 2), index = _e[0], element = _e[1];
                newInstancePointer = instancePointer.concat(index);
                serializedPointer = jsonpointer_1.serializePointer(newInstancePointer);
                // This property has been already evaluated
                if (evaluatedPointers.has(serializedPointer)) {
                    return [3 /*break*/, 4];
                }
                // The only case this can happen is when the argument is falsy
                if (typeof arg === 'boolean') {
                    return [2 /*return*/, results_1.fail(mode, "The element " + String(index) + " has not been evaluated")];
                }
                evaluatedPointers.add(serializedPointer);
                return [4 /*yield*/, validate(arg, element, newInstancePointer, keywordPointer, evaluatedPointers)];
            case 3:
                result = _h.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                _h.label = 4;
            case 4:
                _d = _c.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_6_1 = _h.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                }
                finally { if (e_6) throw e_6.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
exports.format = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (arg === 'date-time' ||
            arg === 'date' ||
            arg === 'email' ||
            arg === 'hostname' ||
            arg === 'email' ||
            arg === 'regex' ||
            arg === 'json-pointer' ||
            arg === 'uri-reference' ||
            arg === 'uri-template' ||
            arg === 'uri' ||
            arg === 'ipv4' ||
            arg === 'ipv6' ||
            arg === 'time' ||
            arg === 'relative-json-pointer' ||
            arg === 'iri' ||
            arg === 'iri-reference' ||
            arg === 'idn-email' ||
            arg === 'idn-hostname') {
            return [2 /*return*/, draft7_1.format(mode, arg, instance)];
        }
        if (typeof arg !== 'string') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a string')];
        }
        else if (typeof instance !== 'string') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        if (arg === 'duration') {
            if (ISO8601_DURATION_REGEX.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        if (arg === 'uuid') {
            // eslint-disable-next-line max-len
            if (/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        return [2 /*return*/, results_1.ok(mode)];
    });
}); };
//# sourceMappingURL=draft2019-09.js.map