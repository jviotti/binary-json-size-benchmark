"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSONSize = exports.getJSONTypeCategory = exports.getJSONType = exports.JSONTypeCategory = exports.JSONType = void 0;
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
var getJSONType = function (value) {
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
exports.getJSONType = getJSONType;
var getJSONTypeCategory = function (type) {
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
exports.getJSONTypeCategory = getJSONTypeCategory;
var getJSONSize = function (document) {
    return Buffer.byteLength(JSON.stringify(document), 'utf8');
};
exports.getJSONSize = getJSONSize;
