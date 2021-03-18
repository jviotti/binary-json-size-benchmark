"use strict";
/*
 * Copyright 2021 Juan Cruz Viotti
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tap = require("tap");
var stats_1 = require("../../lib/stats");
tap.test('should qualify the survey test object', function (test) {
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
        'small',
        'numeric',
        'non-redundant',
        'nested'
    ];
    test.strictSame(stats_1.qualify(stats_1.summarize(stats_1.analyze(document))), qualifiers);
    test.end();
});
//# sourceMappingURL=qualify.spec.js.map