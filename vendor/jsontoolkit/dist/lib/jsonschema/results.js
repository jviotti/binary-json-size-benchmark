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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var validate_1 = require("./validate");
var jsonpointer_1 = require("../jsonpointer");
/*
 * A validation result that maps to the "flag" output structure.
 * It consists of a single "valid" boolean without additional
 * metadata nor nested results.
 */
var getFlagResult = function (valid) {
    return {
        valid: valid
    };
};
/*
 * Return the additional metadata that may be attached
 * to a validation result, independently of whether the
 * result is failure or success.
 */
var getResultMetadata = function (scope, keyword, instance) {
    // We might not be able to extract any metadata
    if (keyword === undefined || instance === undefined) {
        return {};
    }
    var parsedKeywordLocation = typeof keyword === 'string'
        ? jsonpointer_1.parsePointerURIFragment(keyword)
        : keyword;
    // This should never happen at this point, but
    // we still need to deal with this case somehow
    // in order to keep TypeScript happy.
    if (parsedKeywordLocation === null) {
        throw new Error('Keyword location cannot be parsed');
    }
    var fragments = new Set(parsedKeywordLocation);
    var hasReferences = fragments.has('$ref') || fragments.has('$recursiveRef');
    var keywordLocation = jsonpointer_1.serializePointerAsFragment(parsedKeywordLocation);
    var extra = scope === null || !hasReferences ? {} : {
        absoluteKeywordLocation: "" + scope + keywordLocation
    };
    return __assign({ keywordLocation: keywordLocation, instanceLocation: typeof instance === 'string'
            ? instance
            : jsonpointer_1.serializePointerAsFragment(instance) }, extra);
};
/*
 * A validation result that maps to the "basic" output structure.
 * It consists of error metadata (instance and keyword locations)
 * and a string error message, without a "valid" boolean flag
 * and without nested validation results.
 */
var getBasicResult = function (message, scope, keyword, instance) {
    var description = message === null ? {} : {
        error: message
    };
    return __assign(__assign({}, description), getResultMetadata(scope, keyword, instance));
};
/*
 * A validation result that maps to the "verbose" output structure.
 * The result contains a single validation result (i.e. a leaf),
 * it contains a "valid" boolean, and related location metadata.
 */
var getVerboseLeafResult = function (valid, message, keyword, instance, scope) {
    return __assign(__assign({}, getFlagResult(valid)), getBasicResult(message, scope, keyword, instance));
};
/*
 * An validation result that is meant to be completed later.
 * An incomplete result is only lacking the related
 * meadata such as instance and keyword location pointers.
 */
var getIncompleteResult = function (valid, message) {
    var rest = valid ? {} : {
        error: message !== null && message !== void 0 ? message : 'A subschema had errors'
    };
    return __assign(__assign({}, getFlagResult(valid)), rest);
};
var assertion = function (mode, valid, message, keyword, instance, scope) {
    if (mode === validate_1.ValidateOutputMode.Flag) {
        return getFlagResult(valid);
    }
    else if (keyword === undefined || instance === undefined) {
        return valid || message === null
            ? getIncompleteResult(valid)
            : getIncompleteResult(valid, message);
    }
    return getVerboseLeafResult(valid, message, keyword, instance, scope !== null && scope !== void 0 ? scope : null);
};
/*
 * A validation helper that represent success.
 * If the optional arguments are omitted, then the result is
 * an incomplete validation result meant to be completed later.
 */
exports.ok = function (mode, keyword, instance, scope) {
    return assertion(mode, true, null, keyword, instance, scope);
};
/*
 * A validation helper that represent failure.
 * If the optional arguments are omitted, then the result is
 * an incomplete validation result meant to be completed later.
 */
exports.fail = function (mode, message, keyword, instance, scope) {
    return assertion(mode, false, message, keyword, instance, scope);
};
// TODO: Refactor and simplify this whole function
exports.wrap = function (mode, result, keyword, instance, scope) {
    var e_1, _a;
    var _b, _c;
    if (mode === validate_1.ValidateOutputMode.Flag) {
        return getFlagResult(result.valid);
    }
    if (mode === validate_1.ValidateOutputMode.Basic) {
        if (result.valid) {
            return __assign(__assign({}, getFlagResult(true)), { errors: [] });
        }
        if (!('errors' in result)) {
            var valid = result.valid, rest = __rest(result, ["valid"]);
            return __assign(__assign({}, getFlagResult(valid)), { errors: [
                    __assign(__assign({}, getResultMetadata(scope, keyword, instance)), rest)
                ] });
        }
        var metadata_1 = getResultMetadata(scope, keyword, instance);
        var errors = [
            __assign({ 
                // TODO: Get rid of this default
                error: (_b = result.error) !== null && _b !== void 0 ? _b : 'A subschema had errors' }, metadata_1)
        ];
        try {
            for (var _d = __values((_c = result.errors) !== null && _c !== void 0 ? _c : []), _e = _d.next(); !_e.done; _e = _d.next()) {
                var error = _e.value;
                if ('errors' in error) {
                    errors.push.apply(errors, __spread(error.errors));
                }
                else {
                    if (metadata_1.instanceLocation === error.instanceLocation &&
                        // TODO: Get rid of this default
                        error.error === 'A subschema had errors') {
                        continue;
                    }
                    if (metadata_1.keywordLocation === error.keywordLocation &&
                        metadata_1.instanceLocation === error.instanceLocation &&
                        metadata_1.absoluteKeywordLocation === error.absoluteKeywordLocation) {
                        continue;
                    }
                    Reflect.deleteProperty(error, 'valid');
                    errors.push(error);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return __assign(__assign({}, getFlagResult(result.valid)), { errors: errors });
    }
    var metadata = getResultMetadata(scope, keyword, instance);
    if ('keywordLocation' in metadata &&
        'instanceLocation' in metadata &&
        !('keywordLocation' in result) &&
        !('instanceLocation' in result)) {
        return __assign(__assign({}, result), metadata);
    }
    if (metadata.keywordLocation === result.keywordLocation &&
        metadata.instanceLocation === result.instanceLocation &&
        metadata.absoluteKeywordLocation === result.absoluteKeywordLocation) {
        return result;
    }
    var completeResult = __assign(__assign({}, metadata), result);
    return __assign(__assign(__assign({}, getFlagResult(result.valid)), { errors: [completeResult] }), metadata);
};
//# sourceMappingURL=results.js.map