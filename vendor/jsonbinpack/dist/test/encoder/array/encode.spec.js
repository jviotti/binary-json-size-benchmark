"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../../lib/mapper");
var encoder_1 = require("../../../lib/encoder");
var encode_1 = require("../../../lib/encoder/array/encode");
tap_1.default.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        prefixEncodings: []
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        prefixEncodings: [],
        minimum: 2,
        maximum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: same max/min', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(9));
    var bytesWritten = encode_1.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        prefixEncodings: [],
        minimum: 3,
        maximum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 9);
    test.end();
});
tap_1.default.test('BOUNDED_SEMITYPED__LENGTH_PREFIX: same max/min', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(9));
    var bytesWritten = encode_1.BOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        prefixEncodings: [],
        minimum: 3,
        maximum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 9);
    test.end();
});
tap_1.default.test('BOUNDED_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.BOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        prefixEncodings: [],
        minimum: 2,
        maximum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('FLOOR_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.FLOOR_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        prefixEncodings: [],
        minimum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x00,
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('ROOF_8BITS_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.ROOF_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        prefixEncodings: [],
        maximum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('ROOF_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten = encode_1.ROOF_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        prefixEncodings: [],
        maximum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x00,
        0x01, 0x04, 0x66, 0x6f, 0x6f,
        0x05,
        0x08, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('BOUNDED_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.BOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        minimum: 0,
        maximum: 3,
        prefixEncodings: [],
        encoding: encoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00, 0x01
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('BOUNDED_TYPED__LENGTH_PREFIX: same max/min', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.BOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        minimum: 3,
        maximum: 3,
        prefixEncodings: [],
        encoding: encoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x00, 0x01
    ]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.BOUNDED_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        minimum: 0,
        maximum: 3,
        prefixEncodings: [],
        encoding: encoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00, 0x01
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS_TYPED__LENGTH_PREFIX: same max/min', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.BOUNDED_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        minimum: 3,
        maximum: 3,
        prefixEncodings: [],
        encoding: encoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x00, 0x01
    ]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ROOF_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        maximum: 3,
        prefixEncodings: [],
        encoding: encoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x00,
        0x01, 0x00, 0x01
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF_8BITS_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        maximum: 3,
        prefixEncodings: [],
        encoding: encoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00, 0x01
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('FLOOR_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.FLOOR_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        minimum: 3,
        prefixEncodings: [],
        encoding: encoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x00,
        0x01, 0x00, 0x01
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('UNBOUNDED_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        prefixEncodings: [],
        encoding: encoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00, 0x01
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        minimum: 0,
        maximum: 3,
        prefixEncodings: [encoding, encoding]
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00, 0x05
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('BOUNDED_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.BOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        minimum: 0,
        maximum: 3,
        prefixEncodings: [encoding, encoding]
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00, 0x05
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('FLOOR_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.FLOOR_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        minimum: 2,
        prefixEncodings: [encoding, encoding]
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x01, 0x00, 0x05
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        maximum: 3,
        prefixEncodings: [encoding, encoding]
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x00,
        0x01, 0x00, 0x05
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF_8BITS_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        maximum: 3,
        prefixEncodings: [encoding, encoding]
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00, 0x05
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var encoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, true
    ], {
        prefixEncodings: [encoding, encoding]
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00, 0x05
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('BOUNDED_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var booleanEncoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var integerEncoding = mapper_1.getEncoding({
        type: 'integer'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.BOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, 5
    ], {
        minimum: 2,
        maximum: 3,
        prefixEncodings: [booleanEncoding, booleanEncoding],
        encoding: integerEncoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x01, 0x00,
        0x0a
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var booleanEncoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var integerEncoding = mapper_1.getEncoding({
        type: 'integer'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.BOUNDED_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, 5
    ], {
        minimum: 2,
        maximum: 3,
        prefixEncodings: [booleanEncoding, booleanEncoding],
        encoding: integerEncoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x01, 0x00,
        0x0a
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var booleanEncoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var integerEncoding = mapper_1.getEncoding({
        type: 'integer'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, 5
    ], {
        maximum: 3,
        prefixEncodings: [booleanEncoding, booleanEncoding],
        encoding: integerEncoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x00,
        0x01, 0x00,
        0x0a
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF_8BITS_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var booleanEncoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var integerEncoding = mapper_1.getEncoding({
        type: 'integer'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, 5
    ], {
        maximum: 3,
        prefixEncodings: [booleanEncoding, booleanEncoding],
        encoding: integerEncoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00,
        0x0a
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('FLOOR_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var booleanEncoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var integerEncoding = mapper_1.getEncoding({
        type: 'integer'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.FLOOR_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, 5
    ], {
        minimum: 2,
        prefixEncodings: [booleanEncoding, booleanEncoding],
        encoding: integerEncoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x01, 0x00,
        0x0a
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('UNBOUNDED_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var booleanEncoding = mapper_1.getEncoding({
        type: 'boolean'
    }, 1);
    var integerEncoding = mapper_1.getEncoding({
        type: 'integer'
    }, 1);
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
        true, false, 5
    ], {
        prefixEncodings: [booleanEncoding, booleanEncoding],
        encoding: integerEncoding
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x03,
        0x01, 0x00,
        0x0a
    ]));
    test.is(bytesWritten, 4);
    test.end();
});
