"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/any/encode");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('ANY__TYPE_PREFIX: should encode null as 0x17', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, null, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x17]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode false as 0x07', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, false, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x07]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode true as 0x0f', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, true, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0f]));
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
tap_1.default.test('ANY__TYPE_PREFIX: should encode "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" (30)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(31));
    var value = 'x'.repeat(30);
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0xf9,
        0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78,
        0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78,
        0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78
    ]));
    test.is(bytesWritten, 31);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" (31)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(32));
    var value = 'x'.repeat(31);
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02,
        0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78,
        0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78,
        0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78, 0x78,
        0x78
    ]));
    test.is(bytesWritten, 32);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode "https://soundcloud.com/dandymusicnl"', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(36));
    var value = 'https://soundcloud.com/dandymusicnl';
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x22,
        0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x73,
        0x6f, 0x75, 0x6e, 0x64, 0x63, 0x6c, 0x6f, 0x75, 0x64,
        0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x64, 0x61, 0x6e, 0x64,
        0x79, 0x6d, 0x75, 0x73, 0x69, 0x63, 0x6e, 0x6c
    ]));
    test.is(bytesWritten, 36);
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
        0x2f, 0xf4, 0x04, 0x02
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 256 as 0x1f + varint', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 256, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x1f, 0x80, 0x02]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 255 as 0x05 0xff', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 255, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x05, 0xff]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode 0 as 0x0d', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 0, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0d]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -257 as 0x27 + 256 varint', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -257, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x27, 0x80, 0x02]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -1 as 0x0e', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -1, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0e]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode -256 as 0x06 0xff', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, -256, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x06, 0xff]));
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
        0x1b,
        0x04, 0x66, 0x6f, 0x6f,
        0x21, 0x62, 0x61, 0x72,
        0x04, 0x62, 0x61, 0x7a,
        0x15
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
        0x24,
        0x21, 0x66, 0x6f, 0x6f,
        0x0f,
        0x1f, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 9);
    test.end();
});
