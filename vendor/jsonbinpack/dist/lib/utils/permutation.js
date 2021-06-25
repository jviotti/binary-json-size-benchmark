"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePermutations = void 0;
var generatePermutations = function () {
    var choices = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        choices[_i] = arguments[_i];
    }
    if (choices.length === 0 || (choices.length === 1 && choices[0].length === 0)) {
        return [[]];
    }
    if (choices.length === 1) {
        return choices[0].map(function (element) {
            return [element];
        });
    }
    return choices[0].flatMap(function (element) {
        return exports.generatePermutations.apply(void 0, __spreadArray([], __read(choices.slice(1)))).map(function (item) {
            return __spreadArray([element], __read(item));
        });
    });
};
exports.generatePermutations = generatePermutations;
