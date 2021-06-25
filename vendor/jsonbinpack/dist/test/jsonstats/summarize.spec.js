"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var jsonstats_1 = require("../../contrib/jsonstats");
tap_1.default.test('should summarize a string document', function (test) {
    var document = 'foo bar';
    var result = {
        size: jsonstats_1.JSONStatsSizeQualifier.tiny,
        keysRedundancy: 0,
        valuesRedundancy: 0,
        nestingWeight: 0,
        numericWeight: 0,
        textualWeight: 100,
        booleanWeight: 0,
        structuralWeight: 0
    };
    test.strictSame(jsonstats_1.summarize(jsonstats_1.analyze(document)), result);
    test.end();
});
tap_1.default.test('should summarize the survey test object', function (test) {
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
        size: jsonstats_1.JSONStatsSizeQualifier.small,
        keysRedundancy: 30.76923076923077,
        valuesRedundancy: 20.833333333333332,
        nestingWeight: 12,
        numericWeight: 3.804347826086956,
        textualWeight: 0.951086956521739,
        booleanWeight: 1.5398550724637683,
        structuralWeight: 17.357336956521735
    };
    test.strictSame(jsonstats_1.summarize(jsonstats_1.analyze(document)), result);
    test.end();
});
