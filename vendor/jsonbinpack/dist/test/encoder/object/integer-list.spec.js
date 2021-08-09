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
var util_1 = require("util");
var integer_list_1 = require("../../../lib/encoder/object/integer-list");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('should encode [] (1:3) as []', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(0));
    var offset = 0;
    var integers = [];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 1,
        maximum: 3
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([]));
    test.is(bytesWritten, 0);
    test.end();
});
tap_1.default.test('should encode [ 1, 2, 3 ] (1:3) as REVERSE(00 01 10 00)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var offset = 0;
    var integers = [1, 2, 3];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 1,
        maximum: 3
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([24]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ 1, 2, 3, 2 ] (1:3) as REVERSE(00 01 10 01)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var offset = 0;
    var integers = [1, 2, 3, 2];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 1,
        maximum: 3
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([152]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ 1, 2, 3, 2, 2 ] (1:3) as REVERSE(00 01 10 01) ++ REVERSE(01 000000)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var offset = 0;
    var integers = [1, 2, 3, 2, 2];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 1,
        maximum: 3
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([152, 2]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('should encode [ 1, 2, 3, 2, 2, 3 ] (1:3) as REVERSE(00 01 10 01) ++ REVERSE(01 10 0000)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var offset = 0;
    var integers = [1, 2, 3, 2, 2, 3];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 1,
        maximum: 3
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([152, 6]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('should encode [ 5, 6, 6, 5 ] (5:6) as REVERSE(0110 0000)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var offset = 0;
    var integers = [5, 6, 6, 5];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 5,
        maximum: 6
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([6]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ 1, 2 ] (0:3) as REVERSE(01 10 0000)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var offset = 0;
    var integers = [1, 2];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 0,
        maximum: 3
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([6]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ 1, 2 ] (0:4) as REVERSE(001 010 00)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var offset = 0;
    var integers = [1, 2];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 0,
        maximum: 4
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([20]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ 1, 2, 3 ] (0:4) as REVERSE(001 010 01) ++ REVERSE(1 0000000)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var offset = 0;
    var integers = [1, 2, 3];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 0,
        maximum: 4
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([148, 1]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('should encode [ 1, 2, 3, 4 ] (0:4) as REVERSE(001 010 01) ++ REVERSE(1 100 0000)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var offset = 0;
    var integers = [1, 2, 3, 4];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 0,
        maximum: 4
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([148, 3]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('should encode [ 3, 2 ] (0:127) as REVERSE(0000011 0) ++ REVERSE(000010 00)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var offset = 0;
    var integers = [3, 2];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 0,
        maximum: 127
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([96, 16]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('should encode/decode [ 1, 2, 3 ] (1:3)', function (test) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var offset = 0;
    var integers = [1, 2, 3];
    var bytesWritten = integer_list_1.integerListEncode(buffer, offset, integers, {
        minimum: 1,
        maximum: 3
    });
    var result = integer_list_1.integerListDecode(buffer, offset, integers.length, {
        minimum: 1,
        maximum: 3
    });
    test.strictSame(result.value, integers);
    test.is(bytesWritten, result.bytes);
    test.end();
});
tap_1.default.test('should encode/decode random arrays of bounded integers', function (test) {
    var arbitrary = fc.integer().chain(function (minimum) {
        return fc.integer(minimum, minimum + 400).chain(function (maximum) {
            return fc.tuple(fc.nat(10), fc.constant(minimum), fc.constant(maximum), fc.array(fc.integer(minimum, maximum)));
        });
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 4), offset = _b[0], minimum = _b[1], maximum = _b[2], value = _b[3];
        var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(20));
        var bytesWritten = integer_list_1.integerListEncode(buffer, offset, value, {
            minimum: minimum,
            maximum: maximum
        });
        var result = integer_list_1.integerListDecode(buffer, offset, value.length, {
            minimum: minimum,
            maximum: maximum
        });
        return bytesWritten >= 0 && result.bytes === bytesWritten &&
            util_1.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
