"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var permutation_1 = require("../../lib/utils/permutation");
tap_1.default.test('should generate a 0-permutation', function (test) {
    var result = permutation_1.generatePermutations();
    test.strictSame(result, [[]]);
    test.end();
});
tap_1.default.test('should generate the 0-permutations of [ null ]', function (test) {
    var result = permutation_1.generatePermutations([null]);
    test.strictSame(result, [[null]]);
    test.end();
});
tap_1.default.test('should generate a 1-permutation of no choice', function (test) {
    var result = permutation_1.generatePermutations([]);
    test.strictSame(result, [[]]);
    test.end();
});
tap_1.default.test('should generate a 1-permutation of one choice', function (test) {
    var result = permutation_1.generatePermutations([null]);
    test.strictSame(result, [[null]]);
    test.end();
});
tap_1.default.test('should generate a 1-permutation of two choices', function (test) {
    var result = permutation_1.generatePermutations([false, true]);
    test.strictSame(result, [
        [false],
        [true]
    ]);
    test.end();
});
tap_1.default.test('should generate a 2-permutation of two choices each', function (test) {
    var result = permutation_1.generatePermutations([false, true], [false, true]);
    test.strictSame(result, [
        [false, false],
        [false, true],
        [true, false],
        [true, true]
    ]);
    test.end();
});
tap_1.default.test('should generate a 2-permutation of different choices-sets', function (test) {
    var result = permutation_1.generatePermutations([false, true], ['A']);
    test.strictSame(result, [
        [false, 'A'],
        [true, 'A']
    ]);
    test.end();
});
tap_1.default.test('should generate a 3-permutation of different choices-sets', function (test) {
    var result = permutation_1.generatePermutations([false, true], [1, 2, 3], ['AA', 'BB']);
    test.strictSame(result, [
        [false, 1, 'AA'],
        [false, 1, 'BB'],
        [false, 2, 'AA'],
        [false, 2, 'BB'],
        [false, 3, 'AA'],
        [false, 3, 'BB'],
        [true, 1, 'AA'],
        [true, 1, 'BB'],
        [true, 2, 'AA'],
        [true, 2, 'BB'],
        [true, 3, 'AA'],
        [true, 3, 'BB']
    ]);
    test.end();
});
