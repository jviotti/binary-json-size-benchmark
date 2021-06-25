"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var dictionaries_1 = require("../../../lib/encoder/string/dictionaries");
tap_1.default.test('ENGLISH_DICTIONARY', function (test) {
    test.is(dictionaries_1.ENGLISH_DICTIONARY.index.length, Object.keys(dictionaries_1.ENGLISH_DICTIONARY.dictionary).length);
    test.is(Array.from(new Set(dictionaries_1.ENGLISH_DICTIONARY.index)).length, dictionaries_1.ENGLISH_DICTIONARY.index.length);
    test.true(dictionaries_1.ENGLISH_DICTIONARY.index.every(function (word, index) {
        return dictionaries_1.ENGLISH_DICTIONARY.dictionary[word] === index;
    }));
    test.end();
});
