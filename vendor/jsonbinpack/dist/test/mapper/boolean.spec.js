"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../lib/mapper");
tap_1.default.test('should encode a boolean value', function (test) {
    var schema = {
        type: 'boolean'
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.strictSame(mapper_1.getStates(schema), [false, true]);
    test.strictSame(result, {
        type: 'boolean',
        encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
        options: {}
    });
    test.end();
});
