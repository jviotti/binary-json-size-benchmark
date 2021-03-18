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
var util_1 = require("util");
var CSS_COLORS = require("./css-colors.json");
var IP_REGEXES = require("./ip-regexes.json");
var unicode_1 = require("../../unicode");
var jsonpointer_1 = require("../../jsonpointer");
var uri_1 = require("../../uri");
var __1 = require("..");
var results_1 = require("../results");
var IPV4_REGEX = new RegExp(IP_REGEXES.v4);
var IPV6_REGEX = new RegExp(IP_REGEXES.v6);
exports.type = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var types, _a, _b, _c, index, element, newSchemaPointer, result, e_1_1;
    var e_1, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (typeof arg !== 'string' && !Array.isArray(arg)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be a string or an array')];
                }
                types = Array.isArray(arg) ? arg : [arg];
                _e.label = 1;
            case 1:
                _e.trys.push([1, 7, 8, 9]);
                _a = __values(types.entries()), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 6];
                _c = __read(_b.value, 2), index = _c[0], element = _c[1];
                if (!(typeof element === 'string')) return [3 /*break*/, 3];
                if (element === 'any') {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                if (element !== 'string' &&
                    element !== 'object' &&
                    element !== 'array' &&
                    element !== 'null' &&
                    element !== 'integer' &&
                    element !== 'number' &&
                    element !== 'boolean') {
                    return [2 /*return*/, results_1.fail(mode, "The type \"" + String(element) + "\" is not valid")];
                }
                if (__1.isTypeOf(element, instance)) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                return [3 /*break*/, 5];
            case 3:
                if (!(typeof element === 'object' &&
                    !Array.isArray(element) &&
                    element !== null)) return [3 /*break*/, 5];
                newSchemaPointer = Array.isArray(arg)
                    ? keywordPointer.concat(index)
                    : keywordPointer;
                return [4 /*yield*/, validate(element, instance, instancePointer, newSchemaPointer, evaluatedPointers)];
            case 4:
                result = _e.sent();
                if (result.valid) {
                    return [2 /*return*/, result];
                }
                _e.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, results_1.fail(mode, 'The instance does not match the type')];
        }
    });
}); };
exports.properties = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, key, subschema, value, result, result, e_2_1;
    var e_2, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be a schema')];
                }
                if (typeof instance !== 'object' ||
                    Array.isArray(instance) ||
                    instance === null) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                _e.label = 1;
            case 1:
                _e.trys.push([1, 8, 9, 10]);
                _a = __values(Object.entries(arg)), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 7];
                _c = __read(_b.value, 2), key = _c[0], subschema = _c[1];
                if (typeof subschema !== 'object' ||
                    Array.isArray(subschema) ||
                    subschema === null) {
                    return [2 /*return*/, results_1.fail(mode, "The subschema \"" + key + "\" is not a schema")];
                }
                value = instance[key];
                if (!(typeof subschema.required === 'boolean' && subschema.required)) return [3 /*break*/, 4];
                if (typeof value === 'undefined') {
                    return [2 /*return*/, results_1.fail(mode, "The property " + String(key) + " is required")];
                }
                return [4 /*yield*/, validate(subschema, value, instancePointer.concat(key), keywordPointer.concat(key), evaluatedPointers)];
            case 3:
                result = _e.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                return [3 /*break*/, 6];
            case 4:
                if (!(typeof value !== 'undefined')) return [3 /*break*/, 6];
                return [4 /*yield*/, validate(subschema, value, instancePointer.concat(key), keywordPointer.concat(key), evaluatedPointers)];
            case 5:
                result = _e.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                _e.label = 6;
            case 6:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
exports.minItems = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (!Array.isArray(instance)) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (instance.length >= arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        expected = instance.length;
        return [2 /*return*/, results_1.fail(mode, "Expected at least " + String(arg) + " items but found " + String(expected))];
    });
}); };
exports.maxItems = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (!Array.isArray(instance)) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (instance.length <= arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        expected = instance.length;
        return [2 /*return*/, results_1.fail(mode, "Expected at most " + String(arg) + " items but found " + String(expected))];
    });
}); };
exports.minLength = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (typeof instance !== 'string') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (unicode_1.unicodeLength(instance) >= arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance length is less than the argument')];
    });
}); };
exports.maxLength = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (typeof instance !== 'string') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (unicode_1.unicodeLength(instance) <= arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance length is greater than the argument')];
    });
}); };
exports.exclusiveMaximum = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (typeof instance !== 'number') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (instance < arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance is greater than or equal to the argument')];
    });
}); };
exports.exclusiveMinimum = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (typeof instance !== 'number') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (instance > arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance is less than or equal to the argument')];
    });
}); };
exports.maximum = function (mode, arg, instance, schema) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (typeof instance !== 'number') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (typeof schema.exclusiveMaximum === 'boolean' &&
            schema.exclusiveMaximum) {
            if (instance < arg) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance is greater than or equal to the argument')];
        }
        else if (instance <= arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance is greater than the argument')];
    });
}); };
exports.minimum = function (mode, arg, instance, schema) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (typeof instance !== 'number') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (typeof schema.exclusiveMinimum === 'boolean' &&
            schema.exclusiveMinimum) {
            if (instance > arg) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance is less than or equal to the argument')];
        }
        else if (instance >= arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance is less than the argument')];
    });
}); };
var parseRegex = function (regex) {
    return new RegExp(regex, 'u');
};
exports.pattern = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'string') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a string')];
        }
        else if (typeof instance !== 'string') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (parseRegex(arg).test(instance)) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance does not match the pattern')];
    });
}); };
var matchesSomeElement = function (regex, list) {
    var e_3, _a;
    try {
        for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
            var element = list_1_1.value;
            if (regex.test(element)) {
                return true;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return false;
};
exports.patternProperties = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, regexString, subschema, regex_1, regex, _d, _e, _f, key, value, newInstancePointer, result, e_4_1, e_5_1;
    var e_5, _g, e_4, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument is not an object')];
                }
                if (typeof instance !== 'object' ||
                    Array.isArray(instance) ||
                    instance === null) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                _j.label = 1;
            case 1:
                _j.trys.push([1, 12, 13, 14]);
                _a = __values(Object.entries(arg)), _b = _a.next();
                _j.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 11];
                _c = __read(_b.value, 2), regexString = _c[0], subschema = _c[1];
                if (typeof subschema === 'boolean') {
                    regex_1 = parseRegex(regexString);
                    if (!subschema && matchesSomeElement(regex_1, Object.keys(instance))) {
                        return [2 /*return*/, results_1.fail(mode, 'There cannot be properties matching a pattern with a falsy schema')];
                    }
                    return [3 /*break*/, 10];
                }
                regex = parseRegex(regexString);
                if (typeof subschema !== 'object' ||
                    Array.isArray(subschema) ||
                    subschema === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The subschema is not an object')];
                }
                _j.label = 3;
            case 3:
                _j.trys.push([3, 8, 9, 10]);
                _d = (e_4 = void 0, __values(Object.entries(instance))), _e = _d.next();
                _j.label = 4;
            case 4:
                if (!!_e.done) return [3 /*break*/, 7];
                _f = __read(_e.value, 2), key = _f[0], value = _f[1];
                if (value === undefined) {
                    return [3 /*break*/, 6];
                }
                newInstancePointer = instancePointer.concat(key);
                if (!regex.test(key)) return [3 /*break*/, 6];
                return [4 /*yield*/, validate(subschema, value, newInstancePointer, keywordPointer.concat(regexString), evaluatedPointers)];
            case 5:
                result = _j.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                _j.label = 6;
            case 6:
                _e = _d.next();
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_4_1 = _j.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 10:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 11: return [3 /*break*/, 14];
            case 12:
                e_5_1 = _j.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 14];
            case 13:
                try {
                    if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 14: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
// eslint-disable-next-line no-underscore-dangle
exports._enum = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var arg_1, arg_1_1, value;
    var e_6, _a;
    return __generator(this, function (_b) {
        if (!Array.isArray(arg)) {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not an array')];
        }
        try {
            for (arg_1 = __values(arg), arg_1_1 = arg_1.next(); !arg_1_1.done; arg_1_1 = arg_1.next()) {
                value = arg_1_1.value;
                if (value === instance || util_1.isDeepStrictEqual(value, instance)) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (arg_1_1 && !arg_1_1.done && (_a = arg_1.return)) _a.call(arg_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance does not match the possible values')];
    });
}); };
var isRegexString = function (value) {
    // Don't support positive/negative look-behind
    // See https://www.regextutorial.org/positive-and-negative-lookbehind-assertions.php
    if (value.includes('(?<=') || value.includes('(?<!')) {
        return false;
    }
    // Don't support \Z anchors
    if (value.includes('\\Z')) {
        return false;
    }
    try {
        // eslint-disable-next-line no-new
        new RegExp(value);
        return true;
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            return false;
        }
        throw error;
    }
};
var isEmail = function (value) {
    var atIndex = value.indexOf('@');
    if (atIndex === -1) {
        return false;
    }
    var dotIndex = value.indexOf('.', atIndex);
    if (dotIndex === -1) {
        return false;
    }
    var prefix = value.slice(0, atIndex);
    var dotFirstIndex = prefix.indexOf('.');
    var dotLastIndex = prefix.lastIndexOf('.');
    if (dotFirstIndex !== dotLastIndex &&
        dotLastIndex - dotFirstIndex === 1) {
        return false;
    }
    if (prefix.startsWith('.') || prefix.endsWith('.')) {
        return false;
    }
    return dotIndex - atIndex > 0 && dotIndex < value.length;
};
exports.format = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof arg !== 'string') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a string')];
        }
        else if (typeof instance !== 'string') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        if (arg === 'regex') {
            if (isRegexString(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'date-time') {
            // eslint-disable-next-line max-len
            if (/^\d\d\d\d-[0-1]\d-[0-3]\d[tT\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:[zZ]|[+-]\d\d:\d\d)$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'date') {
            if (/^\d{4}-\d{2}-\d{2}$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'time') {
            if (/^\d{1,2}:\d{2}:\d{2}(\.\d+Z)?$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'uri') {
            if (uri_1.isURI(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'email') {
            if (isEmail(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'ip-address') {
            if (IPV4_REGEX.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'ipv6') {
            if (IPV6_REGEX.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'host-name') {
            // eslint-disable-next-line max-len
            if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'color') {
            if (CSS_COLORS.includes(instance) ||
                /^#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        return [2 /*return*/, results_1.ok(mode)];
    });
}); };
exports.uniqueItems = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var index, subindex;
    return __generator(this, function (_a) {
        if (typeof arg !== 'boolean') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a boolean')];
        }
        else if (!Array.isArray(instance)) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        else if (!arg) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        for (index = 0; index < instance.length; index++) {
            for (subindex = index + 1; subindex < instance.length; subindex++) {
                if (instance[index] === instance[subindex] ||
                    util_1.isDeepStrictEqual(instance[index], instance[subindex])) {
                    return [2 /*return*/, results_1.fail(mode, 'The items are not unique')];
                }
            }
        }
        return [2 /*return*/, results_1.ok(mode)];
    });
}); };
exports.dependencies = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, property, subschema, result, subschema_1, subschema_1_1, key, e_7_1;
    var e_7, _d, e_8, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (typeof instance !== 'object' ||
                    Array.isArray(instance) ||
                    instance === null) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument is not an object')];
                }
                _f.label = 1;
            case 1:
                _f.trys.push([1, 7, 8, 9]);
                _a = __values(Object.entries(arg)), _b = _a.next();
                _f.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 6];
                _c = __read(_b.value, 2), property = _c[0], subschema = _c[1];
                if (instance[property] === undefined) {
                    return [3 /*break*/, 5];
                }
                if (!(typeof subschema === 'object' &&
                    !Array.isArray(subschema) &&
                    subschema !== null)) return [3 /*break*/, 4];
                return [4 /*yield*/, validate(subschema, instance, instancePointer, keywordPointer.concat(property), evaluatedPointers)];
            case 3:
                result = _f.sent();
                if (result.valid) {
                    return [3 /*break*/, 5];
                }
                _f.label = 4;
            case 4:
                if (typeof subschema === 'boolean') {
                    if (!subschema && instance[property] !== undefined) {
                        return [2 /*return*/, results_1.fail(mode, "The property \"" + String(property) + "\" must not exist")];
                    }
                    return [3 /*break*/, 5];
                }
                if (typeof subschema === 'string') {
                    if (instance[subschema] === undefined) {
                        return [2 /*return*/, results_1.fail(mode, "The property \"" + String(subschema) + "\" does not exist")];
                    }
                    return [3 /*break*/, 5];
                }
                if (!Array.isArray(subschema)) {
                    return [2 /*return*/, results_1.fail(mode, 'The subschema is not an array')];
                }
                try {
                    for (subschema_1 = (e_8 = void 0, __values(subschema)), subschema_1_1 = subschema_1.next(); !subschema_1_1.done; subschema_1_1 = subschema_1.next()) {
                        key = subschema_1_1.value;
                        if (typeof key !== 'string' && typeof key !== 'number') {
                            return [2 /*return*/, results_1.fail(mode, 'The key is not a string nor a number')];
                        }
                        if (!instance.hasOwnProperty(key)) {
                            return [2 /*return*/, results_1.fail(mode, "The instance does not have property \"" + String(key) + "\"")];
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (subschema_1_1 && !subschema_1_1.done && (_e = subschema_1.return)) _e.call(subschema_1);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                _f.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_7_1 = _f.sent();
                e_7 = { error: e_7_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_7) throw e_7.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
var isValidItem = function (mode, schema, element, validate, instancePointer, schemaPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof schema === 'boolean') {
            if (schema || element === undefined) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The element does not match the schema')];
        }
        if (typeof schema !== 'object' || Array.isArray(schema)) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, validate(schema, element, instancePointer, schemaPointer, evaluatedPointers)];
    });
}); };
exports.items = function (mode, arg, instance, schema, _scope, validate, instancePointer, schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, index, element, newInstancePointer, result, e_9_1, _d, _e, _f, index, element, subschema, newInstancePointer, result, newInstancePointer, result, e_10_1;
    var e_9, _g, e_10, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                if (!Array.isArray(instance)) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                if (typeof arg === 'boolean') {
                    if (arg) {
                        return [2 /*return*/, results_1.ok(mode)];
                    }
                    else if (instance.length === 0) {
                        return [2 /*return*/, results_1.ok(mode)];
                    }
                    return [2 /*return*/, results_1.fail(mode, 'The instance does not match the schema')];
                }
                if (!(typeof arg === 'object' && !Array.isArray(arg) && arg !== null)) return [3 /*break*/, 9];
                _j.label = 1;
            case 1:
                _j.trys.push([1, 6, 7, 8]);
                _a = __values(instance.entries()), _b = _a.next();
                _j.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                _c = __read(_b.value, 2), index = _c[0], element = _c[1];
                newInstancePointer = instancePointer.concat(index);
                return [4 /*yield*/, validate(arg, element, newInstancePointer, keywordPointer, evaluatedPointers)];
            case 3:
                result = _j.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                _j.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_9_1 = _j.sent();
                e_9 = { error: e_9_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                }
                finally { if (e_9) throw e_9.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, results_1.ok(mode)];
            case 9:
                if (!Array.isArray(arg)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument is not an array')];
                }
                _j.label = 10;
            case 10:
                _j.trys.push([10, 17, 18, 19]);
                _d = __values(instance.entries()), _e = _d.next();
                _j.label = 11;
            case 11:
                if (!!_e.done) return [3 /*break*/, 16];
                _f = __read(_e.value, 2), index = _f[0], element = _f[1];
                if (!(index < arg.length)) return [3 /*break*/, 13];
                subschema = arg[index];
                if (subschema === null ||
                    typeof subschema === 'string' ||
                    typeof subschema === 'number' ||
                    Array.isArray(subschema)) {
                    return [3 /*break*/, 15];
                }
                newInstancePointer = instancePointer.concat(index);
                return [4 /*yield*/, isValidItem(mode, subschema, element, validate, newInstancePointer, keywordPointer.concat(index), evaluatedPointers)];
            case 12:
                result = _j.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                return [3 /*break*/, 15];
            case 13:
                if (!(typeof schema.additionalItems !== 'undefined')) return [3 /*break*/, 15];
                newInstancePointer = instancePointer.concat(index);
                return [4 /*yield*/, isValidItem(mode, schema.additionalItems, element, validate, newInstancePointer, schemaPointer.concat('additionalItems'), evaluatedPointers)];
            case 14:
                result = _j.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                _j.label = 15;
            case 15:
                _e = _d.next();
                return [3 /*break*/, 11];
            case 16: return [3 /*break*/, 19];
            case 17:
                e_10_1 = _j.sent();
                e_10 = { error: e_10_1 };
                return [3 /*break*/, 19];
            case 18:
                try {
                    if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                }
                finally { if (e_10) throw e_10.error; }
                return [7 /*endfinally*/];
            case 19: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
var matchesAnyPattern = function (input, patterns) {
    var e_11, _a;
    try {
        for (var patterns_1 = __values(patterns), patterns_1_1 = patterns_1.next(); !patterns_1_1.done; patterns_1_1 = patterns_1.next()) {
            var element = patterns_1_1.value;
            if (typeof element !== 'string' || parseRegex(element).test(input)) {
                return true;
            }
        }
    }
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (patterns_1_1 && !patterns_1_1.done && (_a = patterns_1.return)) _a.call(patterns_1);
        }
        finally { if (e_11) throw e_11.error; }
    }
    return false;
};
exports.additionalProperties = function (mode, arg, instance, schema, scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, key, newInstancePointer, patterns, _c, _d, _e, key, subinstance, newInstancePointer, result, e_12_1;
    var e_13, _f, e_12, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                if (typeof arg !== 'boolean' &&
                    (typeof arg !== 'object' || Array.isArray(arg) || arg === null)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be a boolean or an object')];
                }
                else if (typeof instance !== 'object' ||
                    Array.isArray(instance) ||
                    instance === null) {
                    return [2 /*return*/, results_1.ok(mode)
                        // Early return if "additionalProperties": true
                    ];
                    // Early return if "additionalProperties": true
                }
                else if (typeof arg === 'boolean' && arg) {
                    try {
                        for (_a = __values(Object.keys(instance)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            key = _b.value;
                            newInstancePointer = instancePointer.concat(key);
                            evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                        }
                    }
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_13) throw e_13.error; }
                    }
                    return [2 /*return*/, results_1.ok(mode)];
                }
                patterns = typeof schema.patternProperties !== 'undefined' &&
                    typeof schema.patternProperties === 'object' &&
                    !Array.isArray(schema.patternProperties)
                    ? Object.keys(schema.patternProperties) : [];
                _h.label = 1;
            case 1:
                _h.trys.push([1, 6, 7, 8]);
                _c = __values(Object.entries(instance)), _d = _c.next();
                _h.label = 2;
            case 2:
                if (!!_d.done) return [3 /*break*/, 5];
                _e = __read(_d.value, 2), key = _e[0], subinstance = _e[1];
                if (typeof schema.properties === 'object' &&
                    schema.properties[key] !== undefined &&
                    schema.properties[key] !== null) {
                    return [3 /*break*/, 4];
                }
                if (patterns.length > 0 && matchesAnyPattern(key, patterns)) {
                    return [3 /*break*/, 4];
                }
                if (subinstance === undefined) {
                    return [3 /*break*/, 4];
                }
                // Early return if "additionalProperties": false
                if (typeof arg === 'boolean') {
                    return [2 /*return*/, results_1.fail(mode, "Additional property '" + String(key) + "' found but was invalid", keywordPointer, instancePointer.concat(key), scope)];
                }
                newInstancePointer = instancePointer.concat(key);
                evaluatedPointers.add(jsonpointer_1.serializePointer(newInstancePointer));
                return [4 /*yield*/, validate(arg, subinstance, newInstancePointer, keywordPointer, evaluatedPointers)];
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
                e_12_1 = _h.sent();
                e_12 = { error: e_12_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                }
                finally { if (e_12) throw e_12.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
exports.divisibleBy = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var multiplier, magnifiedInstance, magnifiedArgument, magnify, safeInstance, safeArgument;
    return __generator(this, function (_a) {
        if (typeof arg !== 'number') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a number')];
        }
        else if (typeof instance !== 'number') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        multiplier = 10000;
        magnifiedInstance = instance * multiplier;
        magnifiedArgument = arg * multiplier;
        magnify = Number.isFinite(magnifiedInstance) &&
            Number.isFinite(magnifiedArgument);
        safeInstance = magnify
            ? magnifiedInstance : instance;
        safeArgument = magnify
            ? magnifiedArgument : arg;
        if (safeInstance % safeArgument === 0) {
            return [2 /*return*/, results_1.ok(mode)];
        }
        return [2 /*return*/, results_1.fail(mode, 'The instance is not divisible by the argument')];
    });
}); };
exports.disallow = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var schemas, _a, _b, _c, index, subschema, newSchemaPointer, result, e_14_1;
    var e_14, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (typeof arg !== 'string' && !Array.isArray(arg)) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be a string or an array')];
                }
                schemas = Array.isArray(arg) ? arg : [arg];
                _e.label = 1;
            case 1:
                _e.trys.push([1, 7, 8, 9]);
                _a = __values(schemas.entries()), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 6];
                _c = __read(_b.value, 2), index = _c[0], subschema = _c[1];
                if (typeof subschema === 'string') {
                    if (subschema === 'any') {
                        return [3 /*break*/, 5];
                    }
                    if (subschema !== 'string' &&
                        subschema !== 'object' &&
                        subschema !== 'array' &&
                        subschema !== 'null' &&
                        subschema !== 'integer' &&
                        subschema !== 'number' &&
                        subschema !== 'boolean') {
                        return [2 /*return*/, results_1.fail(mode, "The subschema \"" + String(subschema) + "\" is not valid")];
                    }
                    if (!__1.isTypeOf(subschema, instance)) {
                        return [3 /*break*/, 5];
                    }
                }
                if (!(typeof subschema === 'object' &&
                    !Array.isArray(subschema) &&
                    subschema !== null)) return [3 /*break*/, 4];
                newSchemaPointer = Array.isArray(arg)
                    ? keywordPointer.concat(index)
                    : keywordPointer;
                return [4 /*yield*/, validate(subschema, instance, instancePointer, newSchemaPointer, evaluatedPointers)];
            case 3:
                result = _e.sent();
                if (!result.valid) {
                    return [3 /*break*/, 5];
                }
                _e.label = 4;
            case 4: return [2 /*return*/, results_1.fail(mode, 'The instance does not match the schema')];
            case 5:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_14_1 = _e.sent();
                e_14 = { error: e_14_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_14) throw e_14.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
// eslint-disable-next-line no-underscore-dangle
exports._extends = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var schemas, _a, _b, _c, index, subschema, newSchemaPointer, result, e_15_1;
    var e_15, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                schemas = Array.isArray(arg) ? arg : [arg];
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, 7, 8]);
                _a = __values(schemas.entries()), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                _c = __read(_b.value, 2), index = _c[0], subschema = _c[1];
                if (typeof subschema !== 'object' ||
                    Array.isArray(subschema) ||
                    subschema === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The subschema is not an object')];
                }
                newSchemaPointer = Array.isArray(arg)
                    ? keywordPointer.concat(index)
                    : keywordPointer;
                return [4 /*yield*/, validate(subschema, instance, instancePointer, newSchemaPointer, evaluatedPointers)];
            case 3:
                result = _e.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                _e.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_15_1 = _e.sent();
                e_15 = { error: e_15_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_15) throw e_15.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
//# sourceMappingURL=draft3.js.map