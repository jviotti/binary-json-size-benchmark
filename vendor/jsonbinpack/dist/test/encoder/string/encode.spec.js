"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/string/encode");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('STRING_DICTIONARY_COMPRESSOR: should encode "" with [ bar ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.STRING_DICTIONARY_COMPRESSOR(buffer, 0, '', {
        index: ['bar'],
        dictionary: {
            bar: 0
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x00]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('STRING_DICTIONARY_COMPRESSOR: should encode "foo bar baz" with [ bar ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.STRING_DICTIONARY_COMPRESSOR(buffer, 0, 'foo bar baz', {
        index: ['bar'],
        dictionary: {
            bar: 0
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x0b,
        0x07, 0x66, 0x6f, 0x6f,
        0x02,
        0x07, 0x62, 0x61, 0x7a
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('STRING_DICTIONARY_COMPRESSOR: should encode "foo bar foo" with [ bar ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(11));
    var bytesWritten = encode_1.STRING_DICTIONARY_COMPRESSOR(buffer, 0, 'foo bar foo', {
        index: ['bar'],
        dictionary: {
            bar: 0
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x0b,
        0x07, 0x66, 0x6f, 0x6f,
        0x02,
        0x00,
        0x03, 0x06
    ]));
    test.is(bytesWritten, 9);
    test.end();
});
tap_1.default.test('STRING_DICTIONARY_COMPRESSOR: should encode "bar foo foo" with [ bar ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.STRING_DICTIONARY_COMPRESSOR(buffer, 0, 'bar foo foo', {
        index: ['bar'],
        dictionary: {
            bar: 0
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x0b,
        0x02,
        0x0f,
        0x66, 0x6f, 0x6f, 0x20, 0x66, 0x6f, 0x6f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('URL_PROTOCOL_HOST_REST: should encode "https://google.com"', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.URL_PROTOCOL_HOST_REST(buffer, 0, 'https://google.com', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x07,
        0x68, 0x74, 0x74, 0x70, 0x73, 0x3a,
        0x0b,
        0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x63, 0x6f, 0x6d,
        0x01
    ]));
    test.is(bytesWritten, 19);
    test.end();
});
tap_1.default.test('URL_PROTOCOL_HOST_REST: should encode "https://google.com/"', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.URL_PROTOCOL_HOST_REST(buffer, 0, 'https://google.com/', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x07,
        0x68, 0x74, 0x74, 0x70, 0x73, 0x3a,
        0x0b,
        0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x63, 0x6f, 0x6d,
        0x02,
        0x2f
    ]));
    test.is(bytesWritten, 20);
    test.end();
});
tap_1.default.test('URL_PROTOCOL_HOST_REST: should encode "https://google.com/foo"', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.URL_PROTOCOL_HOST_REST(buffer, 0, 'https://google.com/foo', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x07,
        0x68, 0x74, 0x74, 0x70, 0x73, 0x3a,
        0x0b,
        0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x63, 0x6f, 0x6d,
        0x05,
        0x2f, 0x66, 0x6f, 0x6f
    ]));
    test.is(bytesWritten, 23);
    test.end();
});
tap_1.default.test('RFC3339_DATE_INTEGER_TRIPLET: should encode "2014-10-01"', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.RFC3339_DATE_INTEGER_TRIPLET(buffer, 0, '2014-10-01', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0xde, 0x07, 0x0a, 0x01]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (2..4)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
        minimum: 2,
        maximum: 4
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x02, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_8BIT_FIXED: should encode "foo" (..4)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, 'foo', {
        maximum: 4
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x04, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (..4)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
        maximum: 4
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x02, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode "fooo" (..4)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'fooo', {
        maximum: 4
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01, 0x66, 0x6f, 0x6f, 0x6f]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (3..)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
        minimum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode "foo"', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, 'foo', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x04, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode ""', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, '', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode " "', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, ' ', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x02, 0x20]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('BOUNDED__PREFIX_LENGTH_8BIT_FIXED: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        minimum: 0,
        maximum: 4
    };
    var bytesWritten1 = encode_1.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        minimum: 0,
        maximum: 4
    };
    var bytesWritten1 = encode_1.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_8BIT_FIXED: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        maximum: 4
    };
    var bytesWritten1 = encode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        maximum: 4
    };
    var bytesWritten1 = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02, 0x66, 0x6f, 0x6f,
        0x00,
        0x02,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('UTF8_STRING_NO_LENGTH: should encode a string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.UTF8_STRING_NO_LENGTH(buffer, 0, 'foo', {
        size: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x66, 0x6f, 0x6f
    ]));
    test.is(context.strings.get('foo'), 0);
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('SHARED_STRING_POINTER_RELATIVE_OFFSET: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten1 = encode_1.UTF8_STRING_NO_LENGTH(buffer, 0, 'foo', {
        size: 3
    }, context);
    var bytesWritten2 = encode_1.SHARED_STRING_POINTER_RELATIVE_OFFSET(buffer, bytesWritten1, 'foo', {
        size: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x66, 0x6f, 0x6f,
        0x03
    ]));
    test.is(context.strings.get('foo'), 0);
    test.is(bytesWritten1, 3);
    test.is(bytesWritten2, 1);
    test.end();
});
tap_1.default.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        minimum: 3
    };
    var bytesWritten1 = encode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x66, 0x6f, 0x6f,
        0x00,
        0x01,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten1 = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, 'foo', {}, context);
    var bytesWritten2 = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, bytesWritten1, 'foo', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
