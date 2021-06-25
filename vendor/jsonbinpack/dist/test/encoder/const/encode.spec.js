"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/const/encode");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('CONST_NONE: should encode false as nothing', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.CONST_NONE(buffer, 0, false, {
        value: false
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([]));
    test.is(bytesWritten, 0);
    test.end();
});
