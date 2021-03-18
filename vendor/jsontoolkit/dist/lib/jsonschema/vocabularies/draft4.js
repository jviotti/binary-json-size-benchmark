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
var draft3_1 = require("./draft3");
var validate_1 = require("../validate");
var jsonpointer_1 = require("../../jsonpointer");
var __1 = require("..");
var results_1 = require("../results");
var draft3_2 = require("./draft3");
exports.minItems = draft3_2.minItems;
exports.maxItems = draft3_2.maxItems;
exports.multipleOf = draft3_2.divisibleBy;
exports.minLength = draft3_2.minLength;
exports.maxLength = draft3_2.maxLength;
exports.exclusiveMaximum = draft3_2.exclusiveMaximum;
exports.exclusiveMinimum = draft3_2.exclusiveMinimum;
exports.maximum = draft3_2.maximum;
exports.minimum = draft3_2.minimum;
exports.pattern = draft3_2.pattern;
exports.patternProperties = draft3_2.patternProperties;
exports._enum = draft3_2._enum;
exports.uniqueItems = draft3_2.uniqueItems;
exports.dependencies = draft3_2.dependencies;
exports.items = draft3_2.items;
exports.additionalProperties = draft3_2.additionalProperties;
exports.required = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var arg_1, arg_1_1, key;
    var e_1, _a;
    return __generator(this, function (_b) {
        if (!Array.isArray(arg)) {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not an array')];
        }
        if (typeof instance !== 'object' ||
            Array.isArray(instance) ||
            instance === null) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        try {
            for (arg_1 = __values(arg), arg_1_1 = arg_1.next(); !arg_1_1.done; arg_1_1 = arg_1.next()) {
                key = arg_1_1.value;
                if (typeof key !== 'string' || !instance.hasOwnProperty(key)) {
                    return [2 /*return*/, results_1.fail(mode, "Required property '" + String(key) + "' not found")];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (arg_1_1 && !arg_1_1.done && (_a = arg_1.return)) _a.call(arg_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return [2 /*return*/, results_1.ok(mode)];
    });
}); };
exports.type = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var types, types_1, types_1_1, element;
    var e_2, _a;
    return __generator(this, function (_b) {
        if (typeof arg !== 'string' && !Array.isArray(arg)) {
            return [2 /*return*/, results_1.fail(mode, 'The argument must be a string or an array')];
        }
        types = Array.isArray(arg) ? arg : [arg];
        try {
            for (types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
                element = types_1_1.value;
                if (element !== 'string' &&
                    element !== 'object' &&
                    element !== 'array' &&
                    element !== 'null' &&
                    element !== 'integer' &&
                    element !== 'number' &&
                    element !== 'boolean') {
                    return [2 /*return*/, results_1.fail(mode, "The \"" + String(element) + "\" type is invalid")];
                }
                if (__1.isTypeOf(element, instance)) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (types_1_1 && !types_1_1.done && (_a = types_1.return)) _a.call(types_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return [2 /*return*/, results_1.fail(mode, "Property must be of type " + types.join(', '))];
    });
}); };
exports.format = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (arg === 'date-time' ||
            arg === 'date' ||
            arg === 'regex' ||
            arg === 'uri' ||
            arg === 'email' ||
            arg === 'ipv6') {
            return [2 /*return*/, draft3_1.format(mode, arg, instance)];
        }
        else if (arg === 'ipv4') {
            return [2 /*return*/, draft3_1.format(mode, 'ip-address', instance)];
        }
        else if (arg === 'hostname') {
            return [2 /*return*/, draft3_1.format(mode, 'host-name', instance)];
        }
        if (typeof arg === 'string') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
    });
}); };
exports.properties = function (mode, arg, instance, _schema, scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var valid, validationResults, _a, _b, _c, key, schema, newInstancePointer, newSchemaPointer, value, result, localResult, genericError, e_3_1, outerResult;
    var e_3, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be an object')];
                }
                if (typeof instance !== 'object' ||
                    Array.isArray(instance) ||
                    instance === null) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                valid = true;
                validationResults = [];
                _e.label = 1;
            case 1:
                _e.trys.push([1, 8, 9, 10]);
                _a = __values(Object.entries(arg)), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 7];
                _c = __read(_b.value, 2), key = _c[0], schema = _c[1];
                newInstancePointer = instancePointer.concat(key);
                newSchemaPointer = keywordPointer.concat(key);
                if (!(typeof schema === 'object' &&
                    !Array.isArray(schema) &&
                    schema !== null &&
                    schema !== undefined)) return [3 /*break*/, 4];
                value = instance[key];
                if (typeof value === 'undefined') {
                    if (mode === validate_1.ValidateOutputMode.Verbose) {
                        validationResults.push(results_1.ok(mode, newSchemaPointer, newInstancePointer, scope));
                    }
                    return [3 /*break*/, 6];
                }
                return [4 /*yield*/, validate(schema, value, newInstancePointer, newSchemaPointer, evaluatedPointers)];
            case 3:
                result = _e.sent();
                if (result.valid) {
                    evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                    if (mode === validate_1.ValidateOutputMode.Verbose) {
                        validationResults.push(result);
                    }
                    return [3 /*break*/, 6];
                }
                else {
                    localResult = results_1.wrap(mode, result, newSchemaPointer, newInstancePointer, scope);
                    // TODO: Can we do this before calling "wrap()"
                    if (mode === validate_1.ValidateOutputMode.Flag) {
                        return [2 /*return*/, localResult];
                    }
                    valid = false;
                    validationResults.push(localResult);
                    return [3 /*break*/, 6];
                }
                return [3 /*break*/, 5];
            case 4:
                if (typeof schema === 'boolean') {
                    if (schema || !instance.hasOwnProperty(key)) {
                        evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                        if (mode === validate_1.ValidateOutputMode.Verbose) {
                            validationResults.push(results_1.ok(mode, newSchemaPointer, newInstancePointer, scope));
                        }
                        return [3 /*break*/, 6];
                    }
                }
                _e.label = 5;
            case 5:
                genericError = results_1.fail(mode, "The contents of \"" + key + "\" do not match the schema", newSchemaPointer, newInstancePointer, scope);
                if (mode === validate_1.ValidateOutputMode.Flag) {
                    return [2 /*return*/, genericError];
                }
                valid = false;
                validationResults.push(genericError);
                _e.label = 6;
            case 6:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_3_1 = _e.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 10:
                outerResult = {
                    valid: valid,
                    errors: validationResults
                };
                return [2 /*return*/, results_1.wrap(mode, outerResult, keywordPointer, instancePointer, scope)];
        }
    });
}); };
exports.minProperties = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (typeof instance !== 'object' ||
            Array.isArray(instance) ||
            instance === null) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (Object.keys(instance).length >= arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance properties are less than the argument')];
    });
}); };
exports.maxProperties = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (typeof instance !== 'object' ||
            Array.isArray(instance) ||
            instance === null) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (Object.keys(instance).length <= arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance properties are greater than the argument')];
    });
}); };
exports.not = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (typeof arg === 'boolean') {
                    if (!arg) {
                        return [2 /*return*/, results_1.ok(mode)];
                    }
                    return [2 /*return*/, results_1.fail(mode, 'The argument is a truthy boolean')];
                }
                if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument is not a schema')];
                }
                return [4 /*yield*/, validate(arg, instance, instancePointer, keywordPointer, new Set())];
            case 1:
                result = _a.sent();
                if (result.valid) {
                    // TODO: Move this logic to results.ts
                    Reflect.deleteProperty(result, 'errors');
                    return [2 /*return*/, Object.assign({}, result, {
                            valid: !result.valid,
                            error: 'The schema should not match'
                        })];
                }
                // TODO: Move this logic to results.ts
                return [2 /*return*/, Object.assign({}, result, {
                        valid: !result.valid
                    })];
        }
    });
}); };
exports.allOf = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, index, subschema, localEvaluatedPointers, result, localEvaluatedPointers_1, localEvaluatedPointers_1_1, pointer, e_4_1;
    var e_4, _d, e_5, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!Array.isArray(arg)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument is not an array')];
                }
                _f.label = 1;
            case 1:
                _f.trys.push([1, 6, 7, 8]);
                _a = __values(arg.entries()), _b = _a.next();
                _f.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                _c = __read(_b.value, 2), index = _c[0], subschema = _c[1];
                if (typeof subschema === 'boolean') {
                    if (!subschema) {
                        return [2 /*return*/, results_1.fail(mode, 'One of the schemas is a falsy schema')];
                    }
                    return [3 /*break*/, 4];
                }
                else if (typeof subschema !== 'object' ||
                    Array.isArray(subschema) ||
                    subschema === null) {
                    return [2 /*return*/, results_1.fail(mode, 'One of the argument elements is not a schema')];
                }
                localEvaluatedPointers = new Set();
                return [4 /*yield*/, validate(subschema, instance, instancePointer, keywordPointer.concat(index), localEvaluatedPointers)];
            case 3:
                result = _f.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                try {
                    for (localEvaluatedPointers_1 = (e_5 = void 0, __values(localEvaluatedPointers)), localEvaluatedPointers_1_1 = localEvaluatedPointers_1.next(); !localEvaluatedPointers_1_1.done; localEvaluatedPointers_1_1 = localEvaluatedPointers_1.next()) {
                        pointer = localEvaluatedPointers_1_1.value;
                        evaluatedPointers.add(pointer);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (localEvaluatedPointers_1_1 && !localEvaluatedPointers_1_1.done && (_e = localEvaluatedPointers_1.return)) _e.call(localEvaluatedPointers_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                _f.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_4_1 = _f.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
exports.anyOf = function (mode, arg, instance, schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var successfulResult, unevaluatedProperties, unevaluatedItems, shouldCheckAllBranches, _a, _b, _c, index, subschema, result, e_6_1;
    var e_6, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!Array.isArray(arg)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument is not an array')];
                }
                successfulResult = null;
                unevaluatedProperties = 'unevaluatedProperties' in schema &&
                    (typeof schema.unevaluatedProperties !== 'boolean' ||
                        !schema.unevaluatedProperties);
                unevaluatedItems = 'unevaluatedItems' in schema &&
                    (typeof schema.unevaluatedItems !== 'boolean' ||
                        !schema.unevaluatedItems);
                shouldCheckAllBranches = unevaluatedProperties || unevaluatedItems;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, 7, 8]);
                _a = __values(arg.entries()), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                _c = __read(_b.value, 2), index = _c[0], subschema = _c[1];
                if (typeof subschema === 'boolean' && subschema) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                else if (typeof subschema !== 'object' ||
                    Array.isArray(subschema) ||
                    subschema === null) {
                    return [3 /*break*/, 4];
                }
                return [4 /*yield*/, validate(subschema, instance, instancePointer, keywordPointer.concat(index), evaluatedPointers)];
            case 3:
                result = _e.sent();
                if (result.valid) {
                    successfulResult = result;
                    if (shouldCheckAllBranches) {
                        return [3 /*break*/, 4];
                    }
                    return [2 /*return*/, result];
                }
                _e.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_6_1 = _e.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_6) throw e_6.error; }
                return [7 /*endfinally*/];
            case 8:
                if (shouldCheckAllBranches && successfulResult !== null) {
                    return [2 /*return*/, successfulResult];
                }
                return [2 /*return*/, results_1.fail(mode, 'The instance does not match any schemas')];
        }
    });
}); };
exports.oneOf = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var match, _a, _b, _c, index, subschema, result, e_7_1;
    var e_7, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!Array.isArray(arg)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument is not an array')];
                }
                match = false;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, 7, 8]);
                _a = __values(arg.entries()), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                _c = __read(_b.value, 2), index = _c[0], subschema = _c[1];
                if (typeof subschema === 'boolean') {
                    if (!subschema) {
                        return [3 /*break*/, 4];
                    }
                }
                else if (typeof subschema !== 'object' ||
                    Array.isArray(subschema) ||
                    subschema === null) {
                    return [3 /*break*/, 4];
                }
                return [4 /*yield*/, validate(subschema, instance, instancePointer, keywordPointer.concat(index), evaluatedPointers)];
            case 3:
                result = _e.sent();
                if (!result.valid) {
                    return [3 /*break*/, 4];
                }
                if (match) {
                    return [2 /*return*/, results_1.fail(mode, 'More than one schema matches the instance')];
                }
                match = true;
                _e.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_7_1 = _e.sent();
                e_7 = { error: e_7_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_7) throw e_7.error; }
                return [7 /*endfinally*/];
            case 8:
                if (match) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                return [2 /*return*/, results_1.fail(mode, 'No schema matches the instance')];
        }
    });
}); };
//# sourceMappingURL=draft4.js.map