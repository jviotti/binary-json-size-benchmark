"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../lib/encoder/boolean/encode");
var decode_1 = require("../../lib/encoder/boolean/decode");
var encoder_1 = require("../../lib/encoder");
tap_1.default.test('BOOLEAN_8BITS__ENUM_FIXED: false', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var value = false;
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, value, {}, context);
    var result = decode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, {});
    test.is(bytesWritten, 1);
    test.is(bytesWritten, result.bytes);
    test.is(result.value, value);
    test.end();
});
tap_1.default.test('BOOLEAN_8BITS__ENUM_FIXED: false with offset > 0', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var value = false;
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(6));
    var bytesWritten = encode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 5, value, {}, context);
    var result = decode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 5, {});
    test.is(bytesWritten, 1);
    test.is(bytesWritten, result.bytes);
    test.is(result.value, value);
    test.end();
});
tap_1.default.test('BOOLEAN_8BITS__ENUM_FIXED: true', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var value = true;
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, value, {}, context);
    var result = decode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, {});
    test.is(bytesWritten, 1);
    test.is(bytesWritten, result.bytes);
    test.is(result.value, value);
    test.end();
});
tap_1.default.test('BOOLEAN_8BITS__ENUM_FIXED: true with offset > 0', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var value = true;
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(6));
    var bytesWritten = encode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 5, value, {}, context);
    var result = decode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 5, {});
    test.is(bytesWritten, 1);
    test.is(bytesWritten, result.bytes);
    test.is(result.value, value);
    test.end();
});
