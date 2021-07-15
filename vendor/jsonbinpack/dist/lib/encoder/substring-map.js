"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MINIMUM_LENGTH = 3;
var LIMIT = 100;
var SubstringMap = (function () {
    function SubstringMap() {
        this.data = new Map();
    }
    SubstringMap.prototype.has = function (value) {
        return this.data.has(value);
    };
    SubstringMap.prototype.get = function (value) {
        return this.data.get(value);
    };
    SubstringMap.prototype.set = function (value, offset) {
        if (value.length < MINIMUM_LENGTH || this.data.size >= LIMIT) {
            return;
        }
        this.data.set(value, offset);
    };
    return SubstringMap;
}());
exports.default = SubstringMap;
