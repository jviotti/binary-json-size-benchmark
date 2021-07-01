"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/any/encode");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('ANY__TYPE_PREFIX: should encode null as 0x16', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, null, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x16]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode false as 0x06', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, false, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x06]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode true as 0x0e', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, true, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0e]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode "foo" as 0x21 + string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 'foo', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x21, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode " " as 0x11 0x20', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, ' ', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x11, 0x20]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 3.14 as 0x2e + double', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 3.14, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x2e, 0xf4, 0x04, 0x02
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 256 as 0x1e + varint', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 256, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x1e, 0x80, 0x02]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 255 as 0x04 0xff', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 255, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x04, 0xff]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 0 as 0x0c', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 0, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0c]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -257 as 0x26 + 256 varint', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -257, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x26, 0x80, 0x02]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -1 as 0x0d', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -1, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0d]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -256 as 0x05 0xff', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -256, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x05, 0xff]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(17));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x1a,
        0x04, 0x66, 0x6f, 0x6f,
        0x21, 0x62, 0x61, 0x72,
        0x04, 0x62, 0x61, 0x7a,
        0x14
    ]));
    test.is(bytesWritten, 14);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, [
        'foo',
        true,
        2000
    ], {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x23,
        0x21, 0x66, 0x6f, 0x6f,
        0x0e,
        0x1e, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 9);
    test.end();
});
