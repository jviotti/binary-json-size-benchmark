"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var fc = __importStar(require("fast-check"));
var util = __importStar(require("util"));
var encode_1 = require("../../lib/encoder/any/encode");
var decode_1 = require("../../lib/encoder/any/decode");
var encoder_1 = require("../../lib/encoder");
tap_1.default.test('ANY__TYPE_PREFIX: should handle " "', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2048));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, ' ', {}, context);
    test.is(bytesWritten, 3);
    var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
    test.is(result.bytes, 3);
    test.is(result.value, ' ');
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should handle {"foo":"bar","baz":1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(100));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {}, context);
    test.is(bytesWritten, 15);
    var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
    test.is(result.bytes, 15);
    test.strictSame(result.value, {
        foo: 'bar',
        baz: 1
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should handle [ "foo", true, 2000 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(100));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {}, context);
    test.is(bytesWritten, 11);
    var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
    test.is(result.bytes, 11);
    test.strictSame(result.value, ['foo', true, 2000]);
    test.end();
});
tap_1.default.skip('ANY__TYPE_PREFIX: should encode { "": -11492746249590654 }', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(12));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, {
        '': -11492746249590654
    }, {}, context);
    test.is(bytesWritten, 12);
    var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
    test.is(result.bytes, 12);
    test.strictSame(result.value, {
        '': -11492746249590654
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should handle shared strings', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(100));
    var bytesWritten1 = encode_1.ANY__TYPE_PREFIX(buffer, 0, 'foo', {}, context);
    var bytesWritten2 = encode_1.ANY__TYPE_PREFIX(buffer, bytesWritten1, 'foo', {}, context);
    test.is(bytesWritten1, 5);
    test.is(bytesWritten2, 3);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    var decode1 = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
    test.is(decode1.bytes, bytesWritten1);
    test.is(decode1.value, 'foo');
    var decode2 = decode_1.ANY__TYPE_PREFIX(buffer, bytesWritten1, {});
    test.is(decode2.bytes, bytesWritten2);
    test.is(decode2.value, 'foo');
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: scalars', function (test) {
    fc.assert(fc.property(fc.nat(10), fc.oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.float(), fc.double(), fc.string({
        maxLength: 1000
    })), function (offset, value) {
        var context = encoder_1.getDefaultEncodingContext();
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, offset, value, {}, context);
        var result = decode_1.ANY__TYPE_PREFIX(buffer, offset, {});
        return bytesWritten > 0 &&
            result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: JSON', function (test) {
    fc.assert(fc.property(fc.json(), function (json) {
        var context = encoder_1.getDefaultEncodingContext();
        var value = JSON.parse(json);
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {}, context);
        var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: JSON with small ResizableBuffer', function (test) {
    fc.assert(fc.property(fc.json(), function (json) {
        var context = encoder_1.getDefaultEncodingContext();
        var value = JSON.parse(json);
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {}, context);
        var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: JSON with 0 ResizableBuffer', function (test) {
    fc.assert(fc.property(fc.json(), function (json) {
        var context = encoder_1.getDefaultEncodingContext();
        var value = JSON.parse(json);
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(0));
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {}, context);
        var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
