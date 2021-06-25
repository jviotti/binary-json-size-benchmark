"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var jsonstats_1 = require("../../contrib/jsonstats");
tap_1.default.test('should analyze the survey test object', function (test) {
    var document = {
        tags: [],
        tz: -25200,
        days: [1, 1, 2, 1],
        coord: [-90.0715, 29.9510],
        data: [
            {
                name: 'ox03',
                staff: true
            },
            {
                name: null,
                staff: false,
                extra: {
                    info: ''
                }
            },
            {
                name: 'ox03',
                staff: true
            },
            {}
        ]
    };
    var result = {
        byteSize: 184,
        maxNestingDepth: 4,
        largestLevel: 3,
        duplicatedKeys: 4,
        duplicatedValues: 5,
        keys: {
            count: 13,
            byteSize: 81
        },
        values: {
            numeric: {
                count: 7,
                byteSize: 24
            },
            textual: {
                count: 3,
                byteSize: 14
            },
            boolean: {
                count: 4,
                byteSize: 17
            },
            structural: {
                count: 10,
                byteSize: 48
            }
        }
    };
    test.strictSame(jsonstats_1.analyze(document), result);
    test.is(result.byteSize, result.keys.byteSize +
        result.values.numeric.byteSize +
        result.values.textual.byteSize +
        result.values.boolean.byteSize +
        result.values.structural.byteSize);
    var VALUES_COUNT = result.values.numeric.count +
        result.values.textual.count +
        result.values.boolean.count +
        result.values.structural.count;
    test.ok(VALUES_COUNT >= result.keys.count);
    test.ok(VALUES_COUNT >= result.duplicatedValues);
    test.end();
});
