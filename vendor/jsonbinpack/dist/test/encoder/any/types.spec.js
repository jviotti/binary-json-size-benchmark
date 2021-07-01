"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var types_1 = require("../../../lib/encoder/any/types");
tap_1.default.test('Type.Object should match 00000 011', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 3));
    test.end();
});
tap_1.default.test('Type.Object should match 11000 011', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 195));
    test.end();
});
tap_1.default.test('Type.Object should match 11010 011', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 211));
    test.end();
});
tap_1.default.test('Type.Object should match 11110 011', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 243));
    test.end();
});
tap_1.default.test('Type.Object should match 11111 011', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 251));
    test.end();
});
tap_1.default.test('Type.Object should not match 11111 111', function (test) {
    test.false(types_1.isType(types_1.Type.Object, 255));
    test.end();
});
tap_1.default.test('getTypeTag() Object + 00000', function (test) {
    test.true(types_1.isType(types_1.Type.Object, types_1.getTypeTag(types_1.Type.Object, 0)));
    test.end();
});
tap_1.default.test('getTypeTag() Object + 00001', function (test) {
    test.true(types_1.isType(types_1.Type.Object, types_1.getTypeTag(types_1.Type.Object, 1)));
    test.end();
});
tap_1.default.test('getTypeTag() Object + 01111', function (test) {
    test.true(types_1.isType(types_1.Type.Object, types_1.getTypeTag(types_1.Type.Object, 15)));
    test.end();
});
tap_1.default.test('getTypeTag() Object + 11111', function (test) {
    test.true(types_1.isType(types_1.Type.Object, types_1.getTypeTag(types_1.Type.Object, 31)));
    test.end();
});
