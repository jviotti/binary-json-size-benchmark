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
Object.defineProperty(exports, "__esModule", { value: true });
var json_1 = require("./json");
/*
 * A JSON Pointer is a Unicode string containing a sequence of zero
 * or more reference tokens, each prefixed by a '/' (%x2F) character.
 */
var TOKEN_SEPARATOR = '/';
/*
 * If the currently referenced value is a JSON array, the reference
 * token may contain exactly the single character "-", making the new
 * referenced value the (nonexistent) member after the last array element.
 */
var NONEXISTENT_CHARACTER = '-';
/*
 * The reference token may contain: characters comprised of digits
 * (see ABNF below; note that leading zeros are not allowed) that
 * represent an unsigned base-10 integer value.
 * See https://tools.ietf.org/html/rfc6901#section-4
 */
var isReferenceToken = function (input) {
    // Don't match numbers with leading zeroes
    return !/^(0\d+)$/.test(input) &&
        // Match strings that don't include "~" or "/", or that
        // include "~0" or "~1".
        /^([^~/]|~0|~1)*$/.test(input);
};
/*
 * Check if a fragment string must be URI encoded.
 * Notice that JSON Pointer allows Unicode characters
 * inside fragments, so we must not encode those.
 * See https://tools.ietf.org/html/rfc3986#section-2
 */
var fragmentRequiresURIEncoding = function (input) {
    return !/^([\u00AA-\uFFFF]|[!#$&-;=?-[\]_a-z~]|%[0-9a-fA-F]{2})*$/.test(input);
};
var parseReferenceToken = function (reference) {
    // Evaluation of each reference token begins by decoding any escaped
    // character sequence. This is performed by first transforming any
    // occurrence of the sequence '~1' to '/', and then transforming any
    // occurrence of the sequence '~0' to '~'.
    // See https://tools.ietf.org/html/rfc6901
    var unescapedReference = reference
        .replace(/~1/g, TOKEN_SEPARATOR)
        .replace(/~0/g, '~');
    // Parse reference tokens consisting of numbers.
    // We assume that the pointer string has been validated
    // before calling this function, and that therefore the
    // number reference token does not contain leading zeroes.
    if (/^\d+$/.test(unescapedReference)) {
        // We can assume based on the regular expression that
        // the result of this call can never be NaN.
        return parseInt(unescapedReference, 10);
    }
    // Cannot use negative integer indexes.
    // The referenced value is array element with the
    // zero-based index identified by the token.
    // See https://tools.ietf.org/html/rfc6901#section-4
    if (/^-\d+$/.test(unescapedReference)) {
        return null;
    }
    return unescapedReference;
};
var isPointerStringValid = function (pointer, referencePredicate) {
    var e_1, _a;
    if (pointer.length > 0 && !pointer.startsWith(TOKEN_SEPARATOR)) {
        return false;
    }
    try {
        for (var _b = __values(pointer.split(TOKEN_SEPARATOR).slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var referenceToken = _c.value;
            if (!referencePredicate(referenceToken)) {
                return false;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
};
/*
 * A JSON Pointer is a Unicode string containing a sequence of zero or more
 * reference tokens, each prefixed by a '/' (%x2F) character. Because the
 * characters '~' (%x7E) and '/' (%x2F) have special meanings in JSON Pointer,
 * '~' needs to be encoded as '~0' and '/' needs to be encoded as '~1' when
 * these characters appear in a reference token.
 * See https://tools.ietf.org/html/rfc6901#section-3
 */
exports.isPointerString = function (pointer) {
    return isPointerStringValid(pointer, isReferenceToken);
};
// See https://tools.ietf.org/html/rfc6901#section-6
exports.isPointerURIFragment = function (fragment) {
    return fragment.startsWith('#') &&
        isPointerStringValid(fragment.slice(1), function (reference) {
            return isReferenceToken(reference) &&
                !fragmentRequiresURIEncoding(reference);
        });
};
var parsePointer = function (pointer, referenceMap) {
    var e_2, _a;
    var tokens = [];
    if (pointer.length === 0) {
        return tokens;
    }
    if (!pointer.startsWith(TOKEN_SEPARATOR)) {
        return null;
    }
    try {
        for (var _b = __values(pointer.split(TOKEN_SEPARATOR).slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var token = _c.value;
            var mappedToken = referenceMap(token);
            if (!isReferenceToken(mappedToken)) {
                return null;
            }
            var parsedToken = parseReferenceToken(mappedToken);
            if (parsedToken === null) {
                return null;
            }
            tokens.push(parsedToken);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return tokens;
};
exports.parsePointerString = function (pointer) {
    return parsePointer(pointer, function (reference) {
        return reference;
    });
};
exports.parsePointerURIFragment = function (fragment) {
    if (!exports.isPointerURIFragment(fragment)) {
        return null;
    }
    return parsePointer(fragment.slice(1), function (reference) {
        return decodeURIComponent(reference);
    });
};
exports.parseURI = function (input) {
    var _a;
    var index = input.lastIndexOf('#');
    var prefix = index === -1 ? input : input.slice(0, index);
    var suffix = index === -1
        ? undefined : input.slice(index + 1);
    if (typeof suffix === 'undefined' || !exports.isPointerString(suffix)) {
        return {
            baseUri: input,
            pointer: []
        };
    }
    return {
        baseUri: prefix.length > 0 ? prefix : null,
        pointer: (_a = exports.parsePointerURIFragment("#" + suffix)) !== null && _a !== void 0 ? _a : []
    };
};
exports.serializePointer = function (pointer) {
    if (pointer.length === 0) {
        return '';
    }
    var referenceTokens = pointer.map(function (token) {
        // Encode ~ and / back into ~0 and ~1
        return String(token).replace(/~/g, '~0').replace(/\//g, '~1')
            // Encode characters that need URI encoding
            // TODO: Make sure this list is complete *without*
            // including UTF-8 characters outside of the ASCII range
            .replace(/[[\]{}\n"'\\\r\t\f\s|^%]/g, function (match) {
            return encodeURIComponent(match);
        });
    });
    return "" + TOKEN_SEPARATOR + referenceTokens.join(TOKEN_SEPARATOR);
};
exports.serializePointerAsFragment = function (pointer) {
    return "#" + exports.serializePointer(pointer);
};
exports.getValue = function (document, pointer, accessor) {
    var e_3, _a;
    if (accessor === void 0) { accessor = json_1.getElement; }
    var value = document;
    try {
        for (var pointer_1 = __values(pointer), pointer_1_1 = pointer_1.next(); !pointer_1_1.done; pointer_1_1 = pointer_1.next()) {
            var token = pointer_1_1.value;
            // Can't happen by definition in this operation.
            if (token === NONEXISTENT_CHARACTER) {
                return undefined;
            }
            // eslint-disable-next-line no-undef-init
            var newValue = undefined;
            if (Array.isArray(value) &&
                typeof token === 'number' &&
                token < value.length) {
                newValue = accessor(value, token);
            }
            else if (!Array.isArray(value) &&
                typeof value === 'object' &&
                value !== null &&
                typeof token !== 'number') {
                newValue = accessor(value, token);
            }
            if (typeof newValue === 'undefined') {
                return undefined;
            }
            value = newValue;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (pointer_1_1 && !pointer_1_1.done && (_a = pointer_1.return)) _a.call(pointer_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return value;
};
exports.removeValue = function (document, pointer, accessor) {
    if (accessor === void 0) { accessor = json_1.getElement; }
    if (pointer.length === 0) {
        if (!Array.isArray(document)) {
            Reflect.deleteProperty(document, '');
        }
        return document;
    }
    var base = exports.getValue(document, pointer.slice(0, pointer.length - 1), accessor);
    var property = pointer[pointer.length - 1];
    if (Array.isArray(base)) {
        if (property === NONEXISTENT_CHARACTER) {
            return document;
        }
        else if (typeof property === 'string') {
            return undefined;
        }
        base.splice(property, 1);
    }
    else if (typeof base === 'object' && base !== null) {
        Reflect.deleteProperty(base, property);
    }
    return document;
};
//# sourceMappingURL=jsonpointer.js.map