"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/number/encode");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a positive real number', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, 3.14, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0xf4, 0x04, 0x02]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a positive integer', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, 5, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0a, 0x00]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a negative real number', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, -3.14, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0xf3, 0x04, 0x04]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a negative integer', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, -5, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x09, 0x00]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode zero', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, 0, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x00, 0x00]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a positive real number with an exponent', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(9));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, 2.980232223226409e-7, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0xd2, 0xe8, 0x9b, 0xb0, 0xac, 0xa0, 0xcb, 0x0a, 0x0d]));
    test.is(bytesWritten, 9);
    test.end();
});
