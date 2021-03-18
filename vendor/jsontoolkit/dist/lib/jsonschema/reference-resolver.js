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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vocabularies_1 = require("./vocabularies");
var jsonpointer_1 = require("../jsonpointer");
var json_1 = require("../json");
var uri_1 = require("../uri");
var localSchemaResolver = function (schema, context, pointer, keywordLocation) {
    /*
     * We can't resolve any pointer on boolean schemas.
     */
    if (typeof schema === 'boolean') {
        return null;
    }
    /*
     * Traverse the pointer using a custom JSON accessor that
     * updates the context scope as we go deep in the document.
     */
    var scope = context.scope;
    var value = jsonpointer_1.getValue(schema, pointer, function (document, key) {
        var result = json_1.getElement(document, key);
        // TODO: This should only happen if "result" is a JSON Schema
        // document, as "id" may appear in other places without
        // the semantics that we expect here.
        if (typeof result === 'object' &&
            !Array.isArray(result) &&
            result !== null) {
            var id = vocabularies_1.getSchemaId(context.metaschemaId, result);
            scope = scope === null ? id : uri_1.resolve(scope, id);
        }
        return result;
    });
    /*
     * We expect a JSON Schema out of this function. We can abort if the
     * pointer resolution result does not match the schema type.
     */
    if (typeof value !== 'boolean' && (typeof value !== 'object' || Array.isArray(value) || value === null)) {
        return null;
    }
    return {
        schema: value,
        keywordLocation: keywordLocation,
        context: scope === null
            ? context
            : {
                root: context.root,
                anchor: context.anchor,
                evaluationScopes: context.evaluationScopes,
                metaschemaId: context.metaschemaId,
                scope: context.scope === null ? scope : uri_1.resolve(context.scope, scope)
            }
    };
};
var resolveSchemaReference = function (context, reference, keywordLocation, options) { return __awaiter(void 0, void 0, void 0, function () {
    var schemaPointer, scopeSchema, baseSchema, currentScope, originalUri, newRoot, schema, absoluteUri, newRoot, schema, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                schemaPointer = jsonpointer_1.parseURI(reference);
                /*
                 * (2) If the reference is just a pointer fragment without
                 * an underlying URI, then we can just locally resolve it
                 * against the current root.
                 */
                if (schemaPointer.baseUri === null) {
                    if (!options.anchored || context.anchor === null) {
                        if (context.scope === null) {
                            return [2 /*return*/, localSchemaResolver(context.root, context, schemaPointer.pointer, keywordLocation)];
                        }
                        scopeSchema = options.cache.getSchema(context.scope);
                        baseSchema = scopeSchema !== null && scopeSchema !== void 0 ? scopeSchema : context.root;
                        return [2 /*return*/, localSchemaResolver(baseSchema, context, schemaPointer.pointer, keywordLocation)];
                    }
                    // Make use of the anchor as the root & scope
                    return [2 /*return*/, localSchemaResolver(context.anchor, {
                            root: context.anchor,
                            anchor: context.anchor,
                            evaluationScopes: context.evaluationScopes,
                            metaschemaId: context.metaschemaId,
                            scope: vocabularies_1.getSchemaId(context.metaschemaId, context.anchor)
                        }, schemaPointer.pointer, keywordLocation)];
                }
                currentScope = (_a = context.scope) !== null && _a !== void 0 ? _a : vocabularies_1.getSchemaId(context.metaschemaId, context.root);
                originalUri = currentScope === null ? reference : uri_1.resolve(currentScope, reference);
                if (originalUri !== null && options.cache.hasSchema(originalUri)) {
                    newRoot = options.cache.getRootSchema(originalUri);
                    schema = options.cache.getSchema(originalUri);
                    if (newRoot !== null && schema !== null) {
                        return [2 /*return*/, {
                                schema: schema,
                                keywordLocation: keywordLocation,
                                context: {
                                    root: newRoot,
                                    anchor: context.anchor,
                                    evaluationScopes: context.evaluationScopes,
                                    scope: originalUri,
                                    metaschemaId: context.metaschemaId
                                }
                            }];
                    }
                }
                absoluteUri = currentScope === null
                    ? schemaPointer.baseUri
                    : uri_1.resolve(currentScope, schemaPointer.baseUri);
                if (absoluteUri === null) {
                    return [2 /*return*/, null];
                }
                /*
                 * (5) Fetch the base schema from the cache if its there,
                 * and resolve the JSON Pointer, if any.
                 */
                if (options.cache.hasSchema(absoluteUri)) {
                    newRoot = options.cache.getRootSchema(absoluteUri);
                    schema = options.cache.getSchema(absoluteUri);
                    if (newRoot !== null && schema !== null) {
                        return [2 /*return*/, localSchemaResolver(schema, {
                                root: newRoot,
                                anchor: context.anchor,
                                evaluationScopes: context.evaluationScopes,
                                scope: absoluteUri,
                                metaschemaId: context.metaschemaId
                            }, schemaPointer.pointer, keywordLocation)];
                    }
                }
                return [4 /*yield*/, options.resolver(absoluteUri)];
            case 1:
                result = _b.sent();
                if (result === null) {
                    return [2 /*return*/, null];
                }
                options.cache.setCanonical(absoluteUri, result);
                /*
                 * (7) If we were able to resolve the schema, then resolve the
                 * pointer fragment of the original reference, if any, on it.
                 * The resulting schema is the new context.
                 */
                return [2 /*return*/, localSchemaResolver(result, {
                        root: result,
                        anchor: context.anchor,
                        evaluationScopes: context.evaluationScopes,
                        scope: absoluteUri,
                        metaschemaId: context.metaschemaId
                    }, schemaPointer.pointer, keywordLocation)];
        }
    });
}); };
var mergeSchemas = function (context, schemaPointer, schema, rest) {
    var _a;
    // TODO: Use constants rather than hardcoding these strings
    var overrideSiblingKeywords = [
        'http://json-schema.org/draft-03/schema#',
        'http://json-schema.org/draft-04/schema#',
        'http://json-schema.org/draft-06/schema#',
        'http://json-schema.org/draft-07/schema#'
    ].includes(context.metaschemaId);
    if (overrideSiblingKeywords ||
        (typeof schema === 'boolean' && !schema)) {
        return schema;
    }
    if (typeof schema === 'object' &&
        !Array.isArray(schema) &&
        schema.hasOwnProperty(vocabularies_1.METASCHEMA_KEYWORD)) {
        Reflect.deleteProperty(rest, vocabularies_1.METASCHEMA_KEYWORD);
    }
    if (Object.keys(rest).length === 0) {
        return schema;
    }
    var conjunctions = (_a = rest.allOf) !== null && _a !== void 0 ? _a : [];
    conjunctions.push(schema);
    context.evaluationScopes.add(jsonpointer_1.serializePointer(schemaPointer.concat(['allOf', conjunctions.length - 1])));
    return Object.assign({}, rest, {
        allOf: conjunctions
    });
};
exports.resolveObjectRef = function (schema, context, schemaPointer, options) { return __awaiter(void 0, void 0, void 0, function () {
    var reference, isRecursiveRef, newSchemaPointer, resolution, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $ref, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $recursiveRef, rest, mergedSchema, schemaId, newContext;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (typeof schema === 'boolean') {
                    return [2 /*return*/, {
                            schema: schema,
                            keywordLocation: schemaPointer,
                            context: context
                        }];
                }
                reference = (_a = schema.$ref) !== null && _a !== void 0 ? _a : schema.$recursiveRef;
                isRecursiveRef = reference === schema.$recursiveRef;
                // If the schema doesn't have a reference that we need
                // to resolve, then we don't need to do anything else.
                if (typeof reference === 'undefined') {
                    return [2 /*return*/, {
                            schema: schema,
                            keywordLocation: schemaPointer,
                            context: context
                        }];
                }
                // If there is a reference, but its invalid,
                // then we can't proceed.
                if (typeof reference !== 'string') {
                    return [2 /*return*/, null];
                }
                newSchemaPointer = schemaPointer.concat(isRecursiveRef ? '$recursiveRef' : '$ref');
                return [4 /*yield*/, resolveSchemaReference(context, reference, newSchemaPointer, {
                        cache: options.cache,
                        resolver: options.resolver,
                        anchored: isRecursiveRef
                    })];
            case 1:
                resolution = _b.sent();
                if (resolution === null) {
                    return [2 /*return*/, null];
                }
                $ref = schema.$ref, $recursiveRef = schema.$recursiveRef, rest = __rest(schema, ["$ref", "$recursiveRef"]);
                mergedSchema = mergeSchemas(resolution.context, resolution.keywordLocation, resolution.schema, rest);
                schemaId = vocabularies_1.getSchemaId(resolution.context.metaschemaId, mergedSchema);
                newContext = typeof mergedSchema !== 'boolean' &&
                    mergedSchema.$recursiveAnchor === true &&
                    schemaId !== null &&
                    resolution.context.anchor === null
                    ? {
                        root: resolution.context.root,
                        metaschemaId: resolution.context.metaschemaId,
                        evaluationScopes: resolution.context.evaluationScopes,
                        scope: resolution.context.scope,
                        anchor: mergedSchema
                    }
                    : resolution.context;
                // Recurse with the new schema and context in case there
                // is a further reference we need to resolve.
                return [2 /*return*/, exports.resolveObjectRef(mergedSchema, newContext, resolution.keywordLocation, options)];
        }
    });
}); };
//# sourceMappingURL=reference-resolver.js.map