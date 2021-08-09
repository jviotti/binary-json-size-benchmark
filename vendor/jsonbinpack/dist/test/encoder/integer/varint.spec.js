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
var varint_1 = require("../../../lib/encoder/integer/varint");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('should encode 1 as 0x01', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, BigInt(1));
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode 300 as 0xAC 0x02', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, BigInt(300));
    test.strictSame(buffer.getBuffer(), Buffer.from([0xAC, 0x02]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('should encode 23 as 0x17', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, BigInt(23));
    test.strictSame(buffer.getBuffer(), Buffer.from([0x17]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode 50399 as 0xDF 0x89 0x03', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(3));
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, BigInt(50399));
    test.strictSame(buffer.getBuffer(), Buffer.from([0xDF, 0x89, 0x03]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('should decode 0xAC 0x02 as 300', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.from([0xAC, 0x02]));
    var offset = 0;
    var result = varint_1.varintDecode(buffer, offset);
    test.is(result.value, BigInt(300));
    test.is(result.bytes, 2);
    test.end();
});
tap_1.default.test('should encode and decode 4294967294', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(5));
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, BigInt(4294967294));
    test.is(bytesWritten, 5);
    var result = varint_1.varintDecode(buffer, offset);
    test.is(result.bytes, 5);
    test.is(result.value, BigInt(4294967294));
    test.end();
});
tap_1.default.test('should encode and decode 696667952522107300000', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, BigInt(696667952522107300000));
    test.is(bytesWritten, 10);
    var result = varint_1.varintDecode(buffer, offset);
    test.is(result.bytes, 10);
    test.is(result.value, BigInt(696667952522107300000));
    test.end();
});
tap_1.default.test('should decode a varint encoded unsigned integer', function (test) {
    fc.assert(fc.property(fc.integer({
        min: 0
    }), function (value) {
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
        var offset = 0;
        var bytesWritten = varint_1.varintEncode(buffer, offset, BigInt(value));
        var result = varint_1.varintDecode(buffer, offset);
        return bytesWritten > 0 &&
            result.bytes === bytesWritten && result.value === BigInt(value);
    }), {
        verbose: false
    });
    test.end();
});
