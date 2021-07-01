"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultEncodingContext = void 0;
var substring_map_1 = __importDefault(require("./substring-map"));
var getDefaultEncodingContext = function () {
    return {
        strings: new substring_map_1.default(),
        keys: new substring_map_1.default()
    };
};
exports.getDefaultEncodingContext = getDefaultEncodingContext;
