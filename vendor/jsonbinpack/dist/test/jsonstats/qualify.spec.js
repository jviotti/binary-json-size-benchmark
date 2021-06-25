"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var jsonstats_1 = require("../../contrib/jsonstats");
tap_1.default.test('should qualify the survey test object', function (test) {
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
    var qualifiers = [
        'minified >= 100 < 1000 bytes',
        'numeric',
        'non-redundant',
        'nested'
    ];
    test.strictSame(jsonstats_1.qualify(jsonstats_1.summarize(jsonstats_1.analyze(document))), qualifiers);
    test.end();
});
