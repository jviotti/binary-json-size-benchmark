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
var jsonpointer_1 = require("../../jsonpointer");
var draft4_1 = require("./draft4");
var results_1 = require("../results");
var draft4_2 = require("./draft4");
exports.required = draft4_2.required;
exports.type = draft4_2.type;
exports.not = draft4_2.not;
exports.anyOf = draft4_2.anyOf;
exports.allOf = draft4_2.allOf;
exports.oneOf = draft4_2.oneOf;
exports.items = draft4_2.items;
exports.minProperties = draft4_2.minProperties;
exports.maxProperties = draft4_2.maxProperties;
exports.exclusiveMaximum = draft4_2.exclusiveMaximum;
exports.exclusiveMinimum = draft4_2.exclusiveMinimum;
exports.minItems = draft4_2.minItems;
exports.maxItems = draft4_2.maxItems;
exports.multipleOf = draft4_2.multipleOf;
exports.minLength = draft4_2.minLength;
exports.maxLength = draft4_2.maxLength;
exports.maximum = draft4_2.maximum;
exports.minimum = draft4_2.minimum;
exports.pattern = draft4_2.pattern;
exports._enum = draft4_2._enum;
exports.uniqueItems = draft4_2.uniqueItems;
exports.dependencies = draft4_2.dependencies;
exports.properties = draft4_2.properties;
exports.patternProperties = draft4_2.patternProperties;
exports.additionalProperties = draft4_2.additionalProperties;
// eslint-disable-next-line no-underscore-dangle
exports._const = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, draft4_1._enum(mode, [arg], instance)];
    });
}); };
exports.contains = function (mode, arg, instance, schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var minimumMatches, maximumMatches, matches, _a, _b, _c, index, element, result, e_1_1;
    var e_1, _d;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                if (typeof arg === 'boolean') {
                    if (!Array.isArray(instance)) {
                        return [2 /*return*/, results_1.ok(mode)];
                    }
                    else if (arg && instance.length > 0) {
                        return [2 /*return*/, results_1.ok(mode)];
                    }
                    return [2 /*return*/, results_1.fail(mode, 'The instance is not empty')];
                }
                if (typeof arg !== 'object' ||
                    Array.isArray(arg) ||
                    arg === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument is not an object')];
                }
                if (!Array.isArray(instance)) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                minimumMatches = (_e = schema.minContains) !== null && _e !== void 0 ? _e : 1;
                maximumMatches = (_f = schema.maxContains) !== null && _f !== void 0 ? _f : Infinity;
                if (minimumMatches === 0) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                matches = 0;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 6, 7, 8]);
                _a = __values(instance.entries()), _b = _a.next();
                _g.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                _c = __read(_b.value, 2), index = _c[0], element = _c[1];
                return [4 /*yield*/, validate(arg, element, instancePointer.concat(index), keywordPointer, evaluatedPointers)];
            case 3:
                result = _g.sent();
                if (result.valid) {
                    matches += 1;
                    // Short circuit
                    if (matches >= minimumMatches && maximumMatches === Infinity) {
                        return [2 /*return*/, result];
                    }
                }
                _g.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 8:
                if (matches < minimumMatches || matches > maximumMatches) {
                    return [2 /*return*/, results_1.fail(mode, 'The number of matches is out of bounds')];
                }
                return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
exports.format = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var hashIndex, base, fragment, isValidFragment;
    return __generator(this, function (_a) {
        if (arg === 'date-time' ||
            arg === 'date' ||
            arg === 'uri' ||
            arg === 'regex' ||
            arg === 'hostname' ||
            arg === 'email' ||
            arg === 'ipv4' ||
            arg === 'ipv6') {
            return [2 /*return*/, draft4_1.format(mode, arg, instance)];
        }
        if (typeof arg !== 'string') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a string')];
        }
        else if (typeof instance !== 'string') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        if (arg === 'uri-reference') {
            hashIndex = instance.indexOf('#');
            base = hashIndex === -1
                ? instance
                : instance.slice(0, hashIndex);
            fragment = hashIndex === -1
                ? null
                : instance.slice(hashIndex);
            isValidFragment = fragment === null ||
                fragment.length === 0 ||
                jsonpointer_1.isPointerURIFragment(fragment) ||
                /^[a-z0-9]+$/i.test(fragment.slice(1));
            if (!isValidFragment) {
                return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
            }
            else if (base.length === 0 ||
                /^\/\/?[^\s]+$/i.test(base) ||
                /^[a-z0-9]+$/i.test(base)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, draft4_1.format(mode, 'uri', base)];
        }
        else if (arg === 'uri-template') {
            // eslint-disable-next-line max-len, no-control-regex
            if (/^(?:(?:[^\x00-\x20"\\'<>%^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'json-pointer') {
            if (jsonpointer_1.isPointerString(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        return [2 /*return*/, results_1.ok(mode)];
    });
}); };
exports.propertyNames = function (mode, arg, instance, _schema, _scope, validate, instancePointer, _schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, key, result, e_2_1;
    var e_2, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (typeof instance !== 'object' ||
                    Array.isArray(instance) ||
                    instance === null) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                if (typeof arg === 'boolean') {
                    if (arg) {
                        return [2 /*return*/, results_1.ok(mode)];
                    }
                    else if (Object.keys(instance).length === 0) {
                        return [2 /*return*/, results_1.ok(mode)];
                    }
                    return [2 /*return*/, results_1.fail(mode, 'The argument is a falsy boolean and the instance object is not empty')];
                }
                if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The argument must be a boolean or an object')];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, 7, 8]);
                _a = __values(Object.keys(instance)), _b = _a.next();
                _d.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                key = _b.value;
                return [4 /*yield*/, validate(arg, key, instancePointer.concat(key), keywordPointer, evaluatedPointers)];
            case 3:
                result = _d.sent();
                if (!result.valid) {
                    return [2 /*return*/, result];
                }
                _d.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_2_1 = _d.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
//# sourceMappingURL=draft6.js.map