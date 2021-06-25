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
var util_1 = require("util");
var encode_1 = require("../../lib/encoder/const/encode");
var decode_1 = require("../../lib/encoder/const/decode");
var encoder_1 = require("../../lib/encoder");
tap_1.default.test('CONST_NONE: scalars', function (test) {
    fc.assert(fc.property(fc.nat(10), fc.oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.float(), fc.double(), fc.string({
        maxLength: 1000
    })), function (offset, value) {
        var context = encoder_1.getDefaultEncodingContext();
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
        var bytesWritten = encode_1.CONST_NONE(buffer, offset, value, {
            value: value
        }, context);
        var result = decode_1.CONST_NONE(buffer, offset, {
            value: value
        });
        return bytesWritten === 0 &&
            result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('CONST_NONE: JSON', function (test) {
    fc.assert(fc.property(fc.json(), function (json) {
        var context = encoder_1.getDefaultEncodingContext();
        var value = JSON.parse(json);
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
        var bytesWritten = encode_1.CONST_NONE(buffer, 0, value, {
            value: value
        }, context);
        var result = decode_1.CONST_NONE(buffer, 0, {
            value: value
        });
        return bytesWritten === 0 && result.bytes === bytesWritten &&
            util_1.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
