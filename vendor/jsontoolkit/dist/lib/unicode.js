"use strict";
/*
 * Copyright 2020 Juan Cruz Viotti
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
// See https://github.com/chalk/ansi-regex
var ANSI_REGEX = new RegExp([
    // eslint-disable-next-line max-len
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
].join('|'), 'g');
// See https://github.com/mathiasbynens/esrever/blob/master/scripts/export-data.js
var REGEX_SYMBOLS = new RegExp([
    // eslint-disable-next-line max-len
    '([\\0-\\u02FF\\u0370-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uDC00-\\uFE1F\\uFE30-\\uFFFF]',
    '[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]',
    // eslint-disable-next-line max-len
    '[\\uD800-\\uDBFF])([\\u0300-\\u036F\\u1DC0-\\u1DFF\\u20D0-\\u20FF\\uFE20-\\uFE2F]+)'
].join('|'), 'g');
exports.unicodeLength = function (input) {
    var stripped = input
        .replace(ANSI_REGEX, '')
        .replace(REGEX_SYMBOLS, function (_match, element) {
        return element;
    });
    var counter = 0;
    var result = 0;
    // Based on https://github.com/bestiejs/punycode.js
    while (counter < stripped.length) {
        result += 1;
        var value = stripped.charCodeAt(counter);
        counter += 1;
        if (value >= 0xD800 &&
            value <= 0xDBFF &&
            counter < stripped.length &&
            // eslint-disable-next-line no-bitwise
            (stripped.charCodeAt(counter) & 0xFC00) === 0xDC00) {
            counter += 1;
        }
    }
    return result;
};
//# sourceMappingURL=unicode.js.map