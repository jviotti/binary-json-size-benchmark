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
Object.defineProperty(exports, "__esModule", { value: true });
var vocabularies_1 = require("./vocabularies");
var validate_1 = require("./validate");
var validate_2 = require("./validate");
exports.ValidateOutputMode = validate_2.ValidateOutputMode;
/*
 * Check if a JSON Value matches the given JSON Schema string type.
 *
 * The set of primitive types in a JSON Schema document.
 * See http://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.1.1
 *
 * > String values MUST be one of the six primitive types ("null", "boolean",
 * "object", "array", "number", or "string"), or "integer" which matches any
 * number with a zero fractional part.
 *
 * Notice that "any" is not present in this list as its only defined in
 * "draft3".
 */
exports.isTypeOf = function (type, value) {
    switch (type) {
        case 'string':
            return typeof value === 'string';
        case 'object':
            return typeof value === 'object' &&
                !Array.isArray(value) &&
                value !== null;
        case 'array':
            return Array.isArray(value);
        case 'null':
            return value === null;
        case 'integer':
            return typeof value === 'number' &&
                Number.isInteger(value) &&
                !isNaN(value);
        case 'number':
            return typeof value === 'number';
        case 'boolean':
            return typeof value === 'boolean';
        default:
            return false;
    }
};
/*
 * Fetch a schema by its URI.
 */
exports.defaultResolver = function (uri) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        // An implementation MAY normalize a URI ending with an empty
        // fragment by removing the fragment.
        // We try both here for completeness.
        // See http://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.8.2.2
        return [2 /*return*/, (_a = vocabularies_1.getMetaSchemaById(uri)) !== null && _a !== void 0 ? _a : vocabularies_1.getMetaSchemaById(uri + "#")];
    });
}); };
/*
 * Validate a JSON value against a JSON Schema document.
 */
exports.validate = function (mode, schema, instance, resolver) {
    if (resolver === void 0) { resolver = exports.defaultResolver; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, validate_1.validate(mode, schema, instance, resolver)];
        });
    });
};
//# sourceMappingURL=index.js.map