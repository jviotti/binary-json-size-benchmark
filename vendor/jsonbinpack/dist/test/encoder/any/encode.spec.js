"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/any/encode");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('ANY__TYPE_PREFIX: should encode null as 0x07', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, null, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x07]));
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
tap_1.default.test('ANY__TYPE_PREFIX: should encode true as 0x05', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, true, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x05]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode "foo" as 0x01 0x04 + string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(5));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 'foo', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01, 0x04, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode " " as 0x01 0x02 0x20', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, ' ', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01, 0x02, 0x20]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 3.14 as 0x04 + double', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 3.14, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0xf4, 0x04, 0x02
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 256 as 0x08 + varint', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 256, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x08, 0x80, 0x02]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 255 as 0x0a 0xff', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 255, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0a, 0xff]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 0 as 0x0a 0x00', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 0, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x1a]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -257 as 0x09 + 256 varint', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -257, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x09, 0x80, 0x02]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -1 as 0x1b', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -1, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x1b]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -256 as 0x0b 0xff', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -256, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0b, 0xff]));
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
        0x32,
        0x04, 0x66, 0x6f, 0x6f,
        0x01, 0x04, 0x62, 0x61, 0x72,
        0x04, 0x62, 0x61, 0x7a,
        0x2a
    ]));
    test.is(bytesWritten, 15);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(11));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, [
        'foo',
        true,
        2000
    ], {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x03,
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 11);
    test.end();
});
