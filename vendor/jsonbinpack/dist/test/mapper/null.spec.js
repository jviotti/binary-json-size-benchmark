"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../lib/mapper");
tap_1.default.test('should encode a null value', function (test) {
    var schema = {
        type: 'null'
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.strictSame(mapper_1.getStates(schema), [null]);
    test.strictSame(result, {
        type: 'null',
        encoding: 'NULL_8BITS_ENUM_FIXED',
        options: {}
    });
    test.end();
});
