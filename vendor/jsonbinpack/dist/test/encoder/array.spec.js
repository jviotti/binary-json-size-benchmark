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
var mapper_1 = require("../../lib/mapper");
var encode_1 = require("../../lib/encoder/array/encode");
var decode_1 = require("../../lib/encoder/array/decode");
var encoder_1 = require("../../lib/encoder");
tap_1.default.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: [ "foo", true, 2000 ] (2..3 [])', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var value = ['foo', true, 2000];
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        prefixEncodings: [],
        minimum: 2,
        maximum: 3
    };
    var bytesWritten = encode_1.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, value, options, context);
    var result = decode_1.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, options);
    test.is(bytesWritten, 10);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX: [] ([])', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var value = [];
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var options = {
        prefixEncodings: []
    };
    var bytesWritten = encode_1.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, value, options, context);
    var result = decode_1.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, options);
    test.is(bytesWritten, 1);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX (scalars)', function (test) {
    fc.assert(fc.property(fc.array(fc.oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.float(), fc.double(), fc.string({
        maxLength: 10
    }))), function (value) {
        var context = encoder_1.getDefaultEncodingContext();
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2048));
        var offset = 0;
        var bytesWritten = encode_1.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset, value, {
            prefixEncodings: []
        }, context);
        var result = decode_1.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset, {
            prefixEncodings: []
        });
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('UNBOUNDED_TYPED__LENGTH_PREFIX ([], integer)', function (test) {
    fc.assert(fc.property(fc.array(fc.integer()), function (value) {
        var context = encoder_1.getDefaultEncodingContext();
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2048));
        var offset = 0;
        var encoding = mapper_1.getEncoding({
            type: 'integer'
        }, 1);
        var bytesWritten = encode_1.UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, offset, value, {
            prefixEncodings: [],
            encoding: encoding
        }, context);
        var result = decode_1.UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, offset, {
            prefixEncodings: [],
            encoding: encoding
        });
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
