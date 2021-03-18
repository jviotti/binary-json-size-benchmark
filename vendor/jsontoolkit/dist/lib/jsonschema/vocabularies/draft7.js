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
var urijs = require("uri-js");
// eslint-disable-next-line node/no-deprecated-api
var punycode = require("punycode");
var unicode_1 = require("../../unicode");
var draft6_1 = require("./draft6");
var results_1 = require("../results");
var draft6_2 = require("./draft6");
exports._const = draft6_2._const;
exports.contains = draft6_2.contains;
exports.propertyNames = draft6_2.propertyNames;
exports.required = draft6_2.required;
exports.type = draft6_2.type;
exports.not = draft6_2.not;
exports.anyOf = draft6_2.anyOf;
exports.allOf = draft6_2.allOf;
exports.oneOf = draft6_2.oneOf;
exports.items = draft6_2.items;
exports.minProperties = draft6_2.minProperties;
exports.maxProperties = draft6_2.maxProperties;
exports.exclusiveMaximum = draft6_2.exclusiveMaximum;
exports.exclusiveMinimum = draft6_2.exclusiveMinimum;
exports.minItems = draft6_2.minItems;
exports.maxItems = draft6_2.maxItems;
exports.multipleOf = draft6_2.multipleOf;
exports.minLength = draft6_2.minLength;
exports.maxLength = draft6_2.maxLength;
exports.maximum = draft6_2.maximum;
exports.minimum = draft6_2.minimum;
exports.pattern = draft6_2.pattern;
exports._enum = draft6_2._enum;
exports.uniqueItems = draft6_2.uniqueItems;
exports.dependencies = draft6_2.dependencies;
exports.properties = draft6_2.properties;
exports.patternProperties = draft6_2.patternProperties;
exports.additionalProperties = draft6_2.additionalProperties;
var BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
var decode = function (value, encoding) {
    if (encoding === 'base64') {
        if (typeof value !== 'string') {
            return null;
        }
        return Buffer.from(value, 'base64').toString('utf-8');
    }
    return value;
};
exports.contentMediaType = function (mode, arg, instance, schema, _scope, validate, instancePointer, schemaPointer, _keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedInstance, isJSON, result, parsedInstance, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // The only content encodings we support right now.
                // We validate correctly if we don't understand the encoding.
                if (typeof schema.contentEncoding === 'string' &&
                    schema.contentEncoding !== 'base64') {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                decodedInstance = decode(instance, schema.contentEncoding);
                if (!(arg === 'application/json')) return [3 /*break*/, 8];
                if (!(typeof decodedInstance !== 'string')) return [3 /*break*/, 4];
                isJSON = typeof decodedInstance === 'boolean' ||
                    typeof decodedInstance === 'object' ||
                    typeof decodedInstance === 'number' ||
                    Array.isArray(decodedInstance);
                if (!isJSON) return [3 /*break*/, 3];
                if (!('contentSchema' in schema && schema.contentSchema !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, validate(schema.contentSchema, decodedInstance, instancePointer, schemaPointer.concat('contentSchema'), evaluatedPointers)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
            case 2: return [2 /*return*/, results_1.ok(mode)];
            case 3: return [2 /*return*/, results_1.fail(mode, 'The instance is not a valid JSON document')];
            case 4:
                _a.trys.push([4, 7, , 8]);
                parsedInstance = JSON.parse(decodedInstance);
                if (!('contentSchema' in schema && schema.contentSchema !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, validate(schema.contentSchema, parsedInstance, instancePointer, schemaPointer.concat('contentSchema'), evaluatedPointers)];
            case 5:
                result = _a.sent();
                return [2 /*return*/, result];
            case 6: return [2 /*return*/, results_1.ok(mode)];
            case 7:
                error_1 = _a.sent();
                return [2 /*return*/, results_1.fail(mode, 'The instance is not a valid JSON document')];
            case 8: return [2 /*return*/, results_1.ok(mode)];
        }
    });
}); };
exports.contentEncoding = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (arg === 'base64') {
            if (typeof instance !== 'string') {
                return [2 /*return*/, results_1.ok(mode)];
            }
            else if (BASE64_REGEX.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance is not a valid base64 string')];
        }
        return [2 /*return*/, results_1.ok(mode)];
    });
}); };
// eslint-disable-next-line no-underscore-dangle
exports._if = function (mode, arg, instance, schema, _scope, validate, instancePointer, schemaPointer, keywordPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (arg === undefined ||
                    arg === null ||
                    typeof arg === 'string' ||
                    typeof arg === 'number' ||
                    Array.isArray(arg)) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                return [4 /*yield*/, validate(arg, instance, instancePointer, keywordPointer, evaluatedPointers)];
            case 1:
                result = _a.sent();
                if (result.valid) {
                    if (schema.then === undefined) {
                        return [2 /*return*/, results_1.ok(mode)];
                    }
                    return [2 /*return*/, validate(schema.then, instance, instancePointer, schemaPointer.concat('then'), evaluatedPointers)];
                }
                if (schema.else === undefined) {
                    return [2 /*return*/, results_1.ok(mode)];
                }
                return [2 /*return*/, validate(schema.else, instance, instancePointer, schemaPointer.concat('else'), evaluatedPointers)];
        }
    });
}); };
var punycodeDecode = function (input) {
    try {
        return punycode.toUnicode(input);
    }
    catch (error) {
        if (error instanceof RangeError) {
            return null;
        }
        throw error;
    }
};
exports.format = function (mode, arg, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var result, result, decodedInstance, fragments, _a, _b, _c, index, fragment;
    var e_1, _d;
    return __generator(this, function (_e) {
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
            arg === 'ipv6') {
            return [2 /*return*/, draft6_1.format(mode, arg, instance)];
        }
        if (typeof arg !== 'string') {
            return [2 /*return*/, results_1.fail(mode, 'The argument is not a string')];
        }
        else if (typeof instance !== 'string') {
            return [2 /*return*/, results_1.ok(mode)];
        }
        if (arg === 'time') {
            if (/^\d{1,2}:\d{2}:\d{2}(\.\d+Z)?$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'relative-json-pointer') {
            // See https://tools.ietf.org/html/draft-handrews-relative-json-pointer-01
            if (/^\d#$/.test(instance)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            else if (!/^\d$/.test(instance[0])) {
                return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
            }
            return [2 /*return*/, draft6_1.format(mode, 'json-pointer', instance.slice(1))];
        }
        else if (arg === 'iri') {
            result = urijs.parse(instance, {
                tolerant: false,
                iri: true,
                unicodeSupport: true
            });
            if (result.path !== undefined &&
                result.reference !== undefined &&
                result.path.indexOf(':') === result.path.lastIndexOf(':') &&
                (result.reference === 'uri' || result.reference === 'absolute')) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'iri-reference') {
            result = urijs.parse(instance, {
                tolerant: false,
                iri: true,
                unicodeSupport: true
            });
            if (result.reference !== undefined &&
                !instance.includes('\\') &&
                ['same-document', 'relative', 'uri'].includes(result.reference)) {
                return [2 /*return*/, results_1.ok(mode)];
            }
            return [2 /*return*/, results_1.fail(mode, 'The instance does not match the format')];
        }
        else if (arg === 'idn-email') {
            return [2 /*return*/, draft6_1.format(mode, 'email', instance)
                // TODO: Extract out and refactor this logic
            ];
            // TODO: Extract out and refactor this logic
        }
        else if (arg === 'idn-hostname') {
            decodedInstance = punycodeDecode(instance);
            if (decodedInstance === null) {
                return [2 /*return*/, results_1.fail(mode, 'The input is not a valid punycode string')];
            }
            fragments = decodedInstance
                .split(/\u094d\u200c|\u200c|\u094d\u200d|\./);
            try {
                for (_a = __values(fragments.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    _c = __read(_b.value, 2), index = _c[0], fragment = _c[1];
                    // eslint-disable-next-line max-len
                    if (/\u3031|\u3032|\u3033|\u3034|\u3035|\u302e|\u302f|\u303b|\u0640|\u07fa/u.test(fragment)) {
                        return [2 /*return*/, results_1.fail(mode, "The fragment \"" + fragment + "\" contains disallowed characters")];
                    }
                    // eslint-disable-next-line max-len
                    if (/([\u06f0-\u06f9]+[\u0660-\u0669]+)|([\u0660-\u0669]+[\u06f0-\u06f9]+)/u.test(fragment)) {
                        return [2 /*return*/, results_1.fail(mode, 
                            // eslint-disable-next-line max-len
                            "The fragment \"" + fragment + "\" mixes Arabic-Indic and Eastern Arabic-Indic digits")];
                    }
                    // eslint-disable-next-line max-len
                    if (!/^\u30fb?(\p{L}|\p{M}|\p{N}|l\u00b7l|\u00df|\u03c2|\u0f0b|\u3007|\u06fd|\u06fe)+$/u.test(fragment) &&
                        !/[\u0590-\u05ff]+(\u05f3|\u05f4)/u.test(fragment) &&
                        !/\u0375[\u0370-\u03ff]+/u.test(fragment)) {
                        return [2 /*return*/, results_1.fail(mode, "The fragment \"" + fragment + "\" is not a set of unicode letters")];
                    }
                    // eslint-disable-next-line max-len
                    if (!/^\u30fb?(\p{L}|\p{N}|l\u00b7l|\u00df|\u03c2|\u0f0b|\u3007|\u06fd|\u06fe)+$/u.test(fragment) &&
                        !/[\u0590-\u05ff]+(\u05f3|\u05f4)/u.test(fragment) &&
                        !/\u0375[\u0370-\u03ff]+/u.test(fragment) &&
                        index === 0) {
                        return [2 /*return*/, results_1.fail(mode, "A hostname cannot start with \"" + fragment + "\"")];
                    }
                    if (unicode_1.unicodeLength(fragment) >= 63) {
                        return [2 /*return*/, results_1.fail(mode, 'The fragment is too large')];
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
        }
        return [2 /*return*/, results_1.ok(mode)];
    });
}); };
//# sourceMappingURL=draft7.js.map