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
var jsonpointer_1 = require("../jsonpointer");
var schema_cache_1 = require("./schema-cache");
var reference_resolver_1 = require("./reference-resolver");
var vocabularies_1 = require("./vocabularies");
var results_1 = require("./results");
var uri_1 = require("../uri");
/*
 * All the validation output modes defined by JSON Schema.
 * See http://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.10.4
 */
var ValidateOutputMode;
(function (ValidateOutputMode) {
    ValidateOutputMode["Flag"] = "flag";
    ValidateOutputMode["Basic"] = "basic";
    ValidateOutputMode["Detailed"] = "detailed";
    ValidateOutputMode["Verbose"] = "verbose";
})(ValidateOutputMode = exports.ValidateOutputMode || (exports.ValidateOutputMode = {}));
var runHandler = function (mode, metaschemaId, key, value, instance, recurse, resolution, schema, instancePointer, schemaPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var keywordPointer, handler, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keywordPointer = schemaPointer.concat(key);
                if (value === undefined) {
                    return [2 /*return*/, results_1.ok(mode, keywordPointer, instancePointer, resolution.context.scope)];
                }
                handler = vocabularies_1.getHandler(metaschemaId, key);
                if (handler === null) {
                    return [2 /*return*/, results_1.ok(mode, keywordPointer, instancePointer, resolution.context.scope)];
                }
                return [4 /*yield*/, handler(mode, value, instance, schema, resolution.context.scope, recurse, instancePointer, schemaPointer, keywordPointer, evaluatedPointers)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, results_1.wrap(mode, result, keywordPointer, instancePointer, resolution.context.scope)];
        }
    });
}); };
var getAnchor = function (schema, anchor) {
    if (typeof schema !== 'boolean' &&
        '$recursiveAnchor' in schema &&
        schema.$recursiveAnchor === true) {
        if (anchor === null) {
            return schema;
        }
        return anchor;
    }
    if (anchor !== null) {
        return schema;
    }
    return anchor;
};
var innerValidate = function (mode, schema, instance, options, context, instancePointer, schemaPointer, evaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
    var schemaId, newContext, resolution, recurse, metaschemaId, entries, additionalKeys, serializedSchemaPointer, isNewEvaluationScope, evaluationScope, valid, validationResults, entries_1, entries_1_1, _a, key, value, result, e_1_1, additionalKeys_1, additionalKeys_1_1, key, value, result, e_2_1, evaluationScope_1, evaluationScope_1_1, pointer, outerResult;
    var e_1, _b, e_2, _c, e_3, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                schemaId = vocabularies_1.getSchemaId(context.metaschemaId, schema);
                newContext = schemaId === null
                    ? context
                    : {
                        root: context.root,
                        anchor: getAnchor(schema, context.anchor),
                        evaluationScopes: context.evaluationScopes,
                        metaschemaId: context.metaschemaId,
                        scope: context.scope === null
                            ? schemaId : uri_1.resolve(context.scope, schemaId)
                    };
                return [4 /*yield*/, reference_resolver_1.resolveObjectRef(schema, newContext, schemaPointer, options)
                    // We can't proceed if the resolution failed
                ];
            case 1:
                resolution = _e.sent();
                // We can't proceed if the resolution failed
                if (resolution === null) {
                    return [2 /*return*/, results_1.fail(mode, 'The resolution failed', schemaPointer, instancePointer, schemaId)];
                }
                /*
                 * (3) Validate boolean schemas.
                 */
                // If the schema is a boolean, then the result of
                // the validation is the schema value. We don't
                // need to continue any further.
                if (typeof resolution.schema === 'boolean') {
                    if (resolution.schema) {
                        return [2 /*return*/, results_1.ok(mode, resolution.keywordLocation, instancePointer, resolution.context.scope)];
                    }
                    return [2 /*return*/, results_1.fail(mode, 'The schema is a falsy boolean', resolution.keywordLocation, instancePointer, resolution.context.scope)];
                }
                recurse = function (subschema, subinstance, subinstancePointer, subschemaPointer, subevaluatedPointers) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, innerValidate(mode, subschema, subinstance, options, resolution.context, subinstancePointer, subschemaPointer, subevaluatedPointers)];
                    });
                }); };
                metaschemaId = resolution.context.metaschemaId;
                entries = Object.entries(resolution.schema);
                additionalKeys = [];
                serializedSchemaPointer = jsonpointer_1.serializePointer(resolution.keywordLocation);
                isNewEvaluationScope = context.evaluationScopes.has(serializedSchemaPointer);
                evaluationScope = isNewEvaluationScope ? new Set() : evaluatedPointers;
                valid = true;
                validationResults = [];
                _e.label = 2;
            case 2:
                _e.trys.push([2, 7, 8, 9]);
                entries_1 = __values(entries), entries_1_1 = entries_1.next();
                _e.label = 3;
            case 3:
                if (!!entries_1_1.done) return [3 /*break*/, 6];
                _a = __read(entries_1_1.value, 2), key = _a[0], value = _a[1];
                if (key === 'unevaluatedProperties' || key === 'unevaluatedItems') {
                    additionalKeys.push(key);
                    return [3 /*break*/, 5];
                }
                // Special keywords do not have associated handlers
                if (key.startsWith('$')) {
                    return [3 /*break*/, 5];
                }
                return [4 /*yield*/, runHandler(mode, metaschemaId, key, value, instance, recurse, resolution, resolution.schema, instancePointer, resolution.keywordLocation, evaluationScope)];
            case 4:
                result = _e.sent();
                if (!result.valid) {
                    if (mode === ValidateOutputMode.Flag) {
                        return [2 /*return*/, result];
                    }
                    valid = false;
                }
                else if (mode !== ValidateOutputMode.Verbose) {
                    return [3 /*break*/, 5];
                }
                validationResults.push(result);
                _e.label = 5;
            case 5:
                entries_1_1 = entries_1.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (entries_1_1 && !entries_1_1.done && (_b = entries_1.return)) _b.call(entries_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9:
                _e.trys.push([9, 14, 15, 16]);
                additionalKeys_1 = __values(additionalKeys), additionalKeys_1_1 = additionalKeys_1.next();
                _e.label = 10;
            case 10:
                if (!!additionalKeys_1_1.done) return [3 /*break*/, 13];
                key = additionalKeys_1_1.value;
                value = resolution.schema[key];
                return [4 /*yield*/, runHandler(mode, metaschemaId, key, value, instance, recurse, resolution, resolution.schema, instancePointer, resolution.keywordLocation, evaluationScope)];
            case 11:
                result = _e.sent();
                if (!result.valid) {
                    if (mode === ValidateOutputMode.Flag) {
                        return [2 /*return*/, result];
                    }
                    valid = false;
                }
                else if (mode !== ValidateOutputMode.Verbose) {
                    return [3 /*break*/, 12];
                }
                validationResults.push(result);
                _e.label = 12;
            case 12:
                additionalKeys_1_1 = additionalKeys_1.next();
                return [3 /*break*/, 10];
            case 13: return [3 /*break*/, 16];
            case 14:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 16];
            case 15:
                try {
                    if (additionalKeys_1_1 && !additionalKeys_1_1.done && (_c = additionalKeys_1.return)) _c.call(additionalKeys_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 16:
                if (isNewEvaluationScope) {
                    try {
                        for (evaluationScope_1 = __values(evaluationScope), evaluationScope_1_1 = evaluationScope_1.next(); !evaluationScope_1_1.done; evaluationScope_1_1 = evaluationScope_1.next()) {
                            pointer = evaluationScope_1_1.value;
                            evaluatedPointers.add(pointer);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (evaluationScope_1_1 && !evaluationScope_1_1.done && (_d = evaluationScope_1.return)) _d.call(evaluationScope_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                outerResult = {
                    valid: valid,
                    errors: validationResults
                };
                return [2 /*return*/, results_1.wrap(mode, outerResult, resolution.keywordLocation, instancePointer, resolution.context.scope)];
        }
    });
}); };
var absorbDefinitions = function (metaschemaId, scope, schema, cache) {
    var e_4, _a;
    var _b;
    if (typeof schema === 'boolean') {
        return;
    }
    var definitions = (_b = schema.$defs) !== null && _b !== void 0 ? _b : schema.definitions;
    if (typeof definitions === 'undefined') {
        return;
    }
    try {
        for (var _c = __values(Object.values(definitions)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var value = _d.value;
            // We only care about definitions that are objects
            if (typeof value !== 'object' || value === null || Array.isArray(value)) {
                continue;
            }
            var id = vocabularies_1.getSchemaId(metaschemaId, value);
            var newScope = scope === null ? id : uri_1.resolve(scope, id);
            if (newScope !== null && id !== null) {
                cache.setInline(newScope, value, schema);
            }
            // TODO: Check if $anchor's can happen anywhere
            // on a schema, and not just inside definitions,
            // as otherwise this implementation is incomplete.
            if ('$anchor' in value && typeof value.$anchor === 'string') {
                var uri = newScope === null
                    ? "#" + value.$anchor
                    : uri_1.resolve(newScope, "#" + value.$anchor);
                cache.setInline(uri, value, schema);
            }
            absorbDefinitions(metaschemaId, newScope, value, cache);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_4) throw e_4.error; }
    }
};
exports.validate = function (mode, schema, instance, resolver) { return __awaiter(void 0, void 0, void 0, function () {
    var metaschemaId, schemaId, context, cache, schemaPointer, instancePointer, validationResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                metaschemaId = vocabularies_1.getMetaSchemaIdFromSchema(schema);
                schemaId = vocabularies_1.getSchemaId(metaschemaId, schema);
                context = {
                    root: schema,
                    anchor: null,
                    evaluationScopes: new Set(),
                    metaschemaId: metaschemaId,
                    scope: schemaId
                };
                cache = new schema_cache_1.default();
                // If the passed JSON Schema document has an id, then lets
                // add it to the cache store for future reference.
                if (schemaId !== null) {
                    cache.setCanonical(schemaId, schema);
                }
                // Populate the cache with any JSON Schema "definitions"
                absorbDefinitions(context.metaschemaId, schemaId, schema, cache);
                schemaPointer = [];
                instancePointer = [];
                return [4 /*yield*/, innerValidate(mode, schema, instance, {
                        anchored: false,
                        resolver: resolver,
                        cache: cache
                    }, context, instancePointer, schemaPointer, new Set())];
            case 1:
                validationResult = _a.sent();
                return [2 /*return*/, results_1.wrap(mode, validationResult, schemaPointer, instancePointer, schemaId)];
        }
    });
}); };
//# sourceMappingURL=validate.js.map