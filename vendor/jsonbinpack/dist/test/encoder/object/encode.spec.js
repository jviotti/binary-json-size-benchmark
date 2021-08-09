"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/object/encode");
var mapper_1 = require("../../../lib/mapper");
var string_1 = require("../../../lib/mapper/string");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(16));
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }, 1),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02,
        0x04, 0x66, 0x6f, 0x6f,
        0x21, 0x62, 0x61, 0x72,
        0x04, 0x62, 0x61, 0x7a,
        0x15
    ]));
    test.is(bytesWritten, 14);
    test.end();
});
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(16));
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: string_1.getStringEncoding({
            type: 'string',
            minLength: 3
        }, 1),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02,
        0x01, 0x66, 0x6f, 0x6f,
        0x21, 0x62, 0x61, 0x72,
        0x01, 0x62, 0x61, 0x7a,
        0x15
    ]));
    test.is(bytesWritten, 14);
    test.end();
});
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(7));
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }, 1),
            bar: mapper_1.getEncoding({}, 1),
            qux: mapper_1.getEncoding({}, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04,
        5,
        0x01,
        0x04, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 7);
    test.end();
});
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }, 1),
            bar: mapper_1.getEncoding({}, 1),
            qux: mapper_1.getEncoding({}, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04,
        0
    ]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode a bounded empty object', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
        propertyEncodings: {},
        requiredProperties: [],
        booleanRequiredProperties: []
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([]));
    test.is(bytesWritten, 0);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(5));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['baz', 'foo'],
        booleanRequiredProperties: [],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x04, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1,baz:true,qux:false}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(6));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        bar: 1,
        baz: true,
        qux: false
    }, {
        requiredProperties: ['bar', 'foo'],
        booleanRequiredProperties: ['baz', 'qux'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            bar: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            qux: mapper_1.getEncoding({
                type: 'boolean'
            }, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        1,
        0x01,
        0x04, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 6);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode three boolean properties', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: true,
        bar: false,
        baz: true
    }, {
        requiredProperties: [],
        booleanRequiredProperties: ['foo', 'bar', 'baz'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            bar: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'boolean'
            }, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([5]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode eight boolean properties', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: true,
        bar: false,
        baz: true,
        qux: true,
        xxx: false,
        yyy: false,
        zzz: true,
        qqq: true
    }, {
        requiredProperties: [],
        booleanRequiredProperties: ['foo', 'bar', 'baz', 'qux', 'xxx', 'yyy', 'zzz', 'qqq'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            bar: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            qux: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            xxx: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            yyy: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            zzz: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            qqq: mapper_1.getEncoding({
                type: 'boolean'
            }, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([205]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode nine boolean properties', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: true,
        bar: false,
        baz: true,
        qux: true,
        xxx: false,
        yyy: false,
        zzz: true,
        qqq: true,
        ppp: false
    }, {
        requiredProperties: [],
        booleanRequiredProperties: ['foo', 'bar', 'baz', 'qux', 'xxx', 'yyy', 'zzz', 'qqq', 'ppp'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            bar: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            qux: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            xxx: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            yyy: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            zzz: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            qqq: mapper_1.getEncoding({
                type: 'boolean'
            }, 1),
            ppp: mapper_1.getEncoding({
                type: 'boolean'
            }, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([205, 0x00]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one required', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(7));
    var bytesWritten = encode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        optionalProperties: ['baz'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x01,
        0x01
    ]));
    test.is(bytesWritten, 7);
    test.end();
});
tap_1.default.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one missing optional', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(6));
    var bytesWritten = encode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar'
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        optionalProperties: ['baz'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x00
    ]));
    test.is(bytesWritten, 6);
    test.end();
});
tap_1.default.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(11));
    var bytesWritten = encode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1)
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }, 1),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01,
        0x04, 0x62, 0x61, 0x7a,
        0x15
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode typed {foo:"bar"}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(5));
    var bytesWritten = encode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar'
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1)
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }, 1),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x00
    ]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(13));
    var bytesWritten = encode_1.OPTIONAL_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        optionalProperties: ['foo'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1)
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }, 1),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x01,
        0x04, 0x62, 0x61, 0x72,
        0x01,
        0x04, 0x62, 0x61, 0x7a,
        0x15
    ]));
    test.is(bytesWritten, 12);
    test.end();
});
tap_1.default.test('MIXED_UNBOUNDED_TYPED_OBJECT: should encode mixed {foo:"bar",baz:1,qux:null}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(13));
    var bytesWritten = encode_1.MIXED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1,
        qux: null
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        optionalProperties: ['baz'],
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }, 1),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }, 1)
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x01,
        0x01,
        0x01,
        0x04, 0x71, 0x75, 0x78,
        0x17
    ]));
    test.is(bytesWritten, 13);
    test.end();
});
tap_1.default.test('PACKED_UNBOUNDED_OBJECT: should encode a complex object', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(21));
    var bytesWritten = encode_1.PACKED_UNBOUNDED_OBJECT(buffer, 0, {
        foo: 1,
        bar: 2,
        baz: 0,
        qux: 2,
        extra: 1,
        name: 'john',
        flag: true,
        random: 'x'
    }, {
        packedRequiredProperties: ['bar', 'baz', 'extra', 'foo', 'qux'],
        packedEncoding: {
            type: encoder_1.EncodingType.Integer,
            encoding: 'BOUNDED_8BITS_ENUM_FIXED',
            options: {
                minimum: 0,
                maximum: 2
            }
        },
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            name: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            age: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }, 1),
            flag: mapper_1.getEncoding({
                type: 'boolean'
            }, 1)
        },
        optionalProperties: ['age'],
        requiredProperties: ['name'],
        booleanRequiredProperties: ['flag'],
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }, 1)
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x05,
        161,
        1,
        0x01,
        0x05,
        0x6a, 0x6f, 0x68, 0x6e,
        0x01,
        0x00,
        0x01,
        0x07,
        0x72, 0x61, 0x6e, 0x64, 0x6f, 0x6d,
        0x11, 0x78
    ]));
    test.is(bytesWritten, 21);
    test.end();
});
tap_1.default.test('PACKED_BOUNDED_REQUIRED_OBJECT: should encode a complex object', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(8));
    var bytesWritten = encode_1.PACKED_BOUNDED_REQUIRED_OBJECT(buffer, 0, {
        foo: 1,
        bar: 2,
        baz: 0,
        qux: 2,
        extra: 1,
        name: 'john',
        flag: true
    }, {
        packedRequiredProperties: ['bar', 'baz', 'extra', 'foo', 'qux'],
        packedEncoding: {
            type: encoder_1.EncodingType.Integer,
            encoding: 'BOUNDED_8BITS_ENUM_FIXED',
            options: {
                minimum: 0,
                maximum: 2
            }
        },
        propertyEncodings: {
            name: mapper_1.getEncoding({
                type: 'string'
            }, 1),
            flag: mapper_1.getEncoding({
                type: 'boolean'
            }, 1)
        },
        requiredProperties: ['name'],
        booleanRequiredProperties: ['flag']
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        161,
        1,
        0x01,
        0x05,
        0x6a, 0x6f, 0x68, 0x6e
    ]));
    test.is(bytesWritten, 8);
    test.end();
});
