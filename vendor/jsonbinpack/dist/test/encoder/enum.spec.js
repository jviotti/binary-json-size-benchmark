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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var fc = __importStar(require("fast-check"));
var util = __importStar(require("util"));
var encode_1 = require("../../lib/encoder/enum/encode");
var decode_1 = require("../../lib/encoder/enum/decode");
var encoder_1 = require("../../lib/encoder");
tap_1.default.test('TOP_LEVEL_8BIT_CHOICE_INDEX: should handle 1 of [ 1, 0, 0 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(0));
    var offset = 0;
    var value = 1;
    var options = {
        choices: [1, 0, 0]
    };
    var bytesWritten = encode_1.TOP_LEVEL_8BIT_CHOICE_INDEX(buffer, offset, value, options, context);
    test.is(bytesWritten, 0);
    var result = decode_1.TOP_LEVEL_8BIT_CHOICE_INDEX(buffer, offset, options);
    test.is(result.value, value);
    test.is(result.bytes, bytesWritten);
    test.end();
});
tap_1.default.test('TOP_LEVEL_8BIT_CHOICE_INDEX: should handle 1 of [ 0, 1, 0 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(0));
    var offset = 0;
    var value = 1;
    var options = {
        choices: [0, 1, 0]
    };
    var bytesWritten = encode_1.TOP_LEVEL_8BIT_CHOICE_INDEX(buffer, offset, value, options, context);
    test.is(bytesWritten, 1);
    var result = decode_1.TOP_LEVEL_8BIT_CHOICE_INDEX(buffer, offset, options);
    test.is(result.value, value);
    test.is(result.bytes, bytesWritten);
    test.end();
});
tap_1.default.test('TOP_LEVEL_8BIT_CHOICE_INDEX: should handle 1 of [ 0, 0, 1 ]', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(0));
    var offset = 0;
    var value = 1;
    var options = {
        choices: [0, 0, 1]
    };
    var bytesWritten = encode_1.TOP_LEVEL_8BIT_CHOICE_INDEX(buffer, offset, value, options, context);
    test.is(bytesWritten, 1);
    var result = decode_1.TOP_LEVEL_8BIT_CHOICE_INDEX(buffer, offset, options);
    test.is(result.value, value);
    test.is(result.bytes, bytesWritten);
    test.end();
});
tap_1.default.test('BOUNDED_CHOICE_INDEX', function (test) {
    var arbitrary = fc.integer(1, 20).chain(function (length) {
        return fc.tuple(fc.integer(0, length - 1), fc.array(fc.json(), {
            minLength: 1,
            maxLength: length
        }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 2), index = _b[0], array = _b[1];
        fc.pre(index < array.length);
        var context = encoder_1.getDefaultEncodingContext();
        var choices = array.map(function (json) {
            var value = JSON.parse(json);
            return value;
        });
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
        var bytesWritten = encode_1.BOUNDED_CHOICE_INDEX(buffer, 0, choices[index], {
            choices: choices
        }, context);
        var result = decode_1.BOUNDED_CHOICE_INDEX(buffer, 0, {
            choices: choices
        });
        return bytesWritten === 1 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, choices[index]);
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('LARGE_BOUNDED_CHOICE_INDEX', function (test) {
    var arbitrary = fc.integer(1, 20).chain(function (length) {
        return fc.tuple(fc.integer(0, length - 1), fc.array(fc.json(), {
            minLength: 1,
            maxLength: length
        }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 2), index = _b[0], array = _b[1];
        fc.pre(index < array.length);
        var context = encoder_1.getDefaultEncodingContext();
        var choices = array.map(function (json) {
            var value = JSON.parse(json);
            return value;
        });
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
        var bytesWritten = encode_1.LARGE_BOUNDED_CHOICE_INDEX(buffer, 0, choices[index], {
            choices: choices
        }, context);
        var result = decode_1.LARGE_BOUNDED_CHOICE_INDEX(buffer, 0, {
            choices: choices
        });
        return bytesWritten === 1 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, choices[index]);
    }), {
        verbose: false
    });
    test.end();
});
