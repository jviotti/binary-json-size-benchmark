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
Object.defineProperty(exports, "__esModule", { value: true });
// As documented in https://www.json.org
var JSONType;
(function (JSONType) {
    JSONType["number"] = "number";
    JSONType["boolean"] = "boolean";
    JSONType["string"] = "string";
    JSONType["null"] = "null";
    JSONType["object"] = "object";
    JSONType["array"] = "array";
})(JSONType = exports.JSONType || (exports.JSONType = {}));
var JSONTypeCategory;
(function (JSONTypeCategory) {
    JSONTypeCategory["numeric"] = "numeric";
    JSONTypeCategory["textual"] = "textual";
    JSONTypeCategory["boolean"] = "boolean";
    JSONTypeCategory["structural"] = "structural";
})(JSONTypeCategory = exports.JSONTypeCategory || (exports.JSONTypeCategory = {}));
exports.getJSONType = function (value) {
    if (typeof value === 'boolean') {
        return JSONType.boolean;
    }
    else if (typeof value === 'number') {
        return JSONType.number;
    }
    else if (typeof value === 'string') {
        return JSONType.string;
    }
    else if (Array.isArray(value)) {
        return JSONType.array;
    }
    else if (value === null) {
        return JSONType.null;
    }
    return JSONType.object;
};
exports.getJSONTypeCategory = function (type) {
    if (type === JSONType.boolean || type === JSONType.null) {
        return JSONTypeCategory.boolean;
    }
    else if (type === JSONType.string) {
        return JSONTypeCategory.textual;
    }
    else if (type === JSONType.number) {
        return JSONTypeCategory.numeric;
    }
    return JSONTypeCategory.structural;
};
exports.getElement = function (document, key) {
    if (!Array.isArray(document)) {
        return document[key];
    }
    if (typeof key === 'string') {
        return null;
    }
    return document[key];
};
exports.getJSONSize = function (document) {
    return Buffer.byteLength(JSON.stringify(document), 'utf8');
};
//# sourceMappingURL=json.js.map