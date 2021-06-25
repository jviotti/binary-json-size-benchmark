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
var encode_1 = require("../../lib/encoder/number/encode");
var decode_1 = require("../../lib/encoder/number/decode");
var encoder_1 = require("../../lib/encoder");
tap_1.default.test('DOUBLE_VARINT_TUPLE: 2.980232223226409e-7', function (test) {
    var offset = 0;
    var value = 2.980232223226409e-7;
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(9));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context);
    var result = decode_1.DOUBLE_VARINT_TUPLE(buffer, offset, {});
    test.is(bytesWritten, 9);
    test.is(result.bytes, bytesWritten);
    test.is(result.value, value);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: 234.9e-1', function (test) {
    var offset = 0;
    var value = 234.9e-1;
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context);
    var result = decode_1.DOUBLE_VARINT_TUPLE(buffer, offset, {});
    test.is(bytesWritten, 3);
    test.is(result.bytes, bytesWritten);
    test.is(result.value, value);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: 234.9e-1', function (test) {
    var offset = 0;
    var value = -5e-324;
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context);
    var result = decode_1.DOUBLE_VARINT_TUPLE(buffer, offset, {});
    test.is(bytesWritten, 3);
    test.is(result.bytes, bytesWritten);
    test.is(result.value, value);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: 0', function (test) {
    var offset = 0;
    var value = 0;
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context);
    var result = decode_1.DOUBLE_VARINT_TUPLE(buffer, offset, {});
    test.is(bytesWritten, 2);
    test.is(result.bytes, bytesWritten);
    test.is(result.value, value);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE', function (test) {
    fc.assert(fc.property(fc.nat(10), fc.double(), function (offset, value) {
        var context = encoder_1.getDefaultEncodingContext();
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(offset + 20));
        var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context);
        var result = decode_1.DOUBLE_VARINT_TUPLE(buffer, offset, {});
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
