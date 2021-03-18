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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tap = require("tap");
var path = require("path");
var fs = require("fs");
var url = require("url");
var OUTPUT_SCHEMA_DRAFT2019_09 = require("../../lib/jsonschema/schemas/json-schema.org/draft/2019-09/output/schema.json");
var OUTPUT_SCHEMA_FLAG = require("./schemas/output-flag.json");
var OUTPUT_SCHEMA_BASIC = require("./schemas/output-basic.json");
var vocabularies_1 = require("../../lib/jsonschema/vocabularies");
var jsonpointer_1 = require("../../lib/jsonpointer");
var jsonschema_1 = require("../../lib/jsonschema");
// eslint-disable-next-line no-process-env
var basePath = process.env.JSON_SCHEMA_TESTS_BASE_PATH;
var remotesPath = 
// eslint-disable-next-line no-process-env
process.env.JSON_SCHEMA_TESTS_REMOTES_PATH;
// eslint-disable-next-line no-process-env
var testPath = process.env.JSON_SCHEMA_TEST_PATH;
var ignoreRegex = 
// eslint-disable-next-line no-process-env
typeof process.env.JSON_SCHEMA_TEST_IGNORE_PATTERN === 'string'
    // eslint-disable-next-line no-process-env
    ? new RegExp(process.env.JSON_SCHEMA_TEST_IGNORE_PATTERN)
    // Regex that matches nothing. See https://stackoverflow.com/a/2930280/1641422
    : /\b\B/;
if (basePath === undefined ||
    remotesPath === undefined ||
    testPath === undefined) {
    console.error('Please set the following environment variables:');
    console.error('  Path to the JSON Schema tests suites');
    console.error('    JSON_SCHEMA_TESTS_BASE_PATH');
    console.error('  Path to the JSON Schema tests suite remotes');
    console.error('    JSON_SCHEMA_TESTS_REMOTES_PATH');
    console.error('  Tests to run, relative to the base path');
    console.error('    JSON_SCHEMA_TEST_PATH');
    console.error('  Pattern to ignore certain tests');
    console.error('    JSON_SCHEMA_TEST_IGNORE_PATTERN');
    process.exit(1);
}
var METASCHEMAS = {
    'draft2019-09': 'https://json-schema.org/draft/2019-09/schema',
    draft7: 'http://json-schema.org/draft-07/schema#',
    draft6: 'http://json-schema.org/draft-06/schema#',
    draft4: 'http://json-schema.org/draft-04/schema#',
    draft3: 'http://json-schema.org/draft-03/schema#'
};
var isMockedUri = function (uri) {
    // eslint-disable-next-line node/no-deprecated-api
    return uri.protocol === 'http:' &&
        uri.hostname === 'localhost' &&
        uri.port === '1234';
};
var resolver = function (uri) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedUrl;
    return __generator(this, function (_a) {
        parsedUrl = url.parse(uri);
        if (!isMockedUri(parsedUrl)) {
            return [2 /*return*/, jsonschema_1.defaultResolver(uri)];
        }
        return [2 /*return*/, new Promise(function (resolve, reject) {
                if (parsedUrl.path === null) {
                    resolve(null);
                    return;
                }
                var stubPath = path.join(remotesPath, parsedUrl.path);
                fs.readFile(stubPath, 'utf8', function (error, contents) {
                    if (error !== null) {
                        if (error.code === 'ENOENT') {
                            return resolve(null);
                        }
                        return reject(error);
                    }
                    return resolve(JSON.parse(contents));
                });
            })];
    });
}); };
var resolveSchema = function (standard, schema) {
    if (typeof schema !== 'object' || Array.isArray(schema)) {
        return schema;
    }
    var metaschema = vocabularies_1.getMetaSchemaById(METASCHEMAS[standard]);
    if (metaschema === null) {
        return schema;
    }
    var id = vocabularies_1.getSchemaId(METASCHEMAS[standard], metaschema);
    if (id === null) {
        return schema;
    }
    return Object.assign({}, schema, {
        $schema: id
    });
};
var fileExists = function (filePath) {
    try {
        fs.statSync(filePath);
        return true;
    }
    catch (error) {
        // TS1196: Catch clause variable cannot have a type annotation
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
};
var getTestSuites = function (base, location) {
    var fullPath = path.resolve(base, location);
    if (!fileExists(fullPath) && path.extname(location) === '') {
        return getTestSuites(base, location + ".json");
    }
    var stats = fs.statSync(fullPath);
    if (stats.isSymbolicLink() || location === 'latest') {
        return [];
    }
    if (!stats.isDirectory()) {
        var contents = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        return contents.map(function (suite) {
            return Object.assign(suite, {
                category: path.join(path.dirname(location), path.basename(location, path.extname(location)))
            });
        });
    }
    return fs.readdirSync(fullPath).reduce(function (accumulator, file) {
        return accumulator.concat(getTestSuites(base, path.join(location, file)));
    }, []);
};
var VALIDATION_CACHE = new Map();
var validateSchema = function (mode, schema, value) { return __awaiter(void 0, void 0, void 0, function () {
    var metaschemaId, metaschema, schemaId, metaschemaResult, result, schemas;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                metaschemaId = vocabularies_1.getMetaSchemaIdFromSchema(schema);
                return [4 /*yield*/, resolver(metaschemaId)];
            case 1:
                metaschema = _c.sent();
                if (metaschema === null) {
                    throw new Error("No such metaschema: " + metaschemaId);
                }
                schemaId = vocabularies_1.getSchemaId(metaschemaId, schema);
                if (!(schemaId === null ||
                    !VALIDATION_CACHE.has(metaschemaId) ||
                    !((_a = VALIDATION_CACHE.get(metaschemaId)) !== null && _a !== void 0 ? _a : new Set()).has(schemaId))) return [3 /*break*/, 3];
                return [4 /*yield*/, jsonschema_1.validate(mode, metaschema, schema, resolver)];
            case 2:
                metaschemaResult = _c.sent();
                if (!metaschemaResult.valid) {
                    result = JSON.stringify(metaschemaResult, null, 2);
                    throw new Error("The schema does not match its metaschema: " + result);
                }
                if (schemaId !== null) {
                    schemas = (_b = VALIDATION_CACHE.get(metaschemaId)) !== null && _b !== void 0 ? _b : new Set();
                    schemas.add(schemaId);
                    VALIDATION_CACHE.set(metaschemaId, schemas);
                }
                _c.label = 3;
            case 3: 
            /*
             * Validate the value against the schema
             */
            return [2 /*return*/, jsonschema_1.validate(mode, schema, value, resolver)];
        }
    });
}); };
var _loop_1 = function (suite) {
    var e_2, _a;
    var _loop_2 = function (testCase) {
        var e_3, _a;
        var title = [
            suite.category,
            '@',
            suite.description,
            '-',
            testCase.description
        ].join(' ');
        var standard = suite.category.split('/')[0];
        if (ignoreRegex.test(suite.category)) {
            return "continue";
        }
        var _loop_3 = function (mode) {
            tap.test(title + " (" + mode + ")", function (test) { return __awaiter(void 0, void 0, void 0, function () {
                var schema, validationResult, resultObject, outputValidationResult, modeValidationResult, modeValidationResult, _a, _b, error, pointer, instanceValue;
                var e_4, _c;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            schema = resolveSchema(standard, suite.schema);
                            return [4 /*yield*/, validateSchema(mode, schema, testCase.data)];
                        case 1:
                            validationResult = _e.sent();
                            resultObject = validationResult;
                            return [4 /*yield*/, validateSchema(mode, OUTPUT_SCHEMA_DRAFT2019_09, resultObject)];
                        case 2:
                            outputValidationResult = _e.sent();
                            test.true(outputValidationResult.valid, 'The validation results should match the output schema');
                            if (!(mode === jsonschema_1.ValidateOutputMode.Flag)) return [3 /*break*/, 4];
                            return [4 /*yield*/, validateSchema(mode, OUTPUT_SCHEMA_FLAG, resultObject)];
                        case 3:
                            modeValidationResult = _e.sent();
                            test.true(modeValidationResult.valid, 'The validation results should match the flag output schema');
                            return [3 /*break*/, 6];
                        case 4:
                            if (!(mode === jsonschema_1.ValidateOutputMode.Basic)) return [3 /*break*/, 6];
                            return [4 /*yield*/, validateSchema(mode, OUTPUT_SCHEMA_BASIC, resultObject)];
                        case 5:
                            modeValidationResult = _e.sent();
                            test.true(modeValidationResult.valid, 'The validation results should match the basic output schema');
                            _e.label = 6;
                        case 6:
                            if (testCase.valid) {
                                test.true(validationResult.valid, 'The object should match the schema');
                            }
                            else {
                                test.false(validationResult.valid, 'The object should not match the schema');
                                if (mode === jsonschema_1.ValidateOutputMode.Basic) {
                                    try {
                                        for (_a = __values((_d = validationResult.errors) !== null && _d !== void 0 ? _d : []), _b = _a.next(); !_b.done; _b = _a.next()) {
                                            error = _b.value;
                                            if (!Array.isArray(testCase.data) &&
                                                (typeof testCase.data !== 'object' ||
                                                    Array.isArray(testCase.data) ||
                                                    testCase.data === null)) {
                                                test.true('instanceLocation' in error &&
                                                    error.instanceLocation === '#', [
                                                    'If the input is not traversable then instance locations',
                                                    'are root pointers'
                                                ].join(' '));
                                            }
                                            else if ('instanceLocation' in error &&
                                                error.instanceLocation !== undefined) {
                                                pointer = jsonpointer_1.parsePointerURIFragment(error.instanceLocation);
                                                if (pointer === null) {
                                                    test.bailout([
                                                        'Cannot parse instance location pointer:',
                                                        error.instanceLocation
                                                    ].join(' '));
                                                    return [2 /*return*/];
                                                }
                                                instanceValue = jsonpointer_1.getValue(testCase.data, pointer);
                                                test.false(instanceValue === undefined, 'The instance pointer cannot point to an undefined value');
                                            }
                                            // TODO: Test that if the keyword location does not contain a
                                            // "$ref" component, then the current schema $id is present
                                            // as the beginning of the absoluteKeywordLocation
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                    // TODO: For every error, check if the JSON Pointers
                                    // can be traversed correctly.
                                }
                            }
                            test.end();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        try {
            for (var _b = (e_3 = void 0, __values([jsonschema_1.ValidateOutputMode.Flag, jsonschema_1.ValidateOutputMode.Basic])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mode = _c.value;
                _loop_3(mode);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    try {
        for (var _b = (e_2 = void 0, __values(suite.tests)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var testCase = _c.value;
            _loop_2(testCase);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
};
try {
    for (var _b = __values(getTestSuites(basePath, testPath)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var suite = _c.value;
        _loop_1(suite);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
//# sourceMappingURL=runner.spec.js.map