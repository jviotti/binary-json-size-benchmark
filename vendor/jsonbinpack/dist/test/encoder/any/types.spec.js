"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var types_1 = require("../../../lib/encoder/any/types");
tap_1.default.test('Type.Null should match 0000 0111', function (test) {
    test.true(types_1.isType(types_1.Type.Null, 7));
    test.end();
});
tap_1.default.test('Type.Null should match 1100 0111', function (test) {
    test.true(types_1.isType(types_1.Type.Null, 199));
    test.end();
});
tap_1.default.test('Type.Null should match 1101 0111', function (test) {
    test.true(types_1.isType(types_1.Type.Null, 215));
    test.end();
});
tap_1.default.test('Type.Null should match 1111 0111', function (test) {
    test.true(types_1.isType(types_1.Type.Null, 247));
    test.end();
});
tap_1.default.test('Type.Null should not match 1111 `111', function (test) {
    test.false(types_1.isType(types_1.Type.Null, 255));
    test.end();
});
tap_1.default.test('getTypeTag() Null + 0000', function (test) {
    test.true(types_1.isType(types_1.Type.Null, types_1.getTypeTag(types_1.Type.Null, 0)));
    test.end();
});
tap_1.default.test('getTypeTag() Null + 0001', function (test) {
    test.true(types_1.isType(types_1.Type.Null, types_1.getTypeTag(types_1.Type.Null, 1)));
    test.end();
});
tap_1.default.test('getTypeTag() Null + 1111', function (test) {
    test.true(types_1.isType(types_1.Type.Null, types_1.getTypeTag(types_1.Type.Null, 15)));
    test.end();
});
