"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var e_1, _a, e_2, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var fs_1 = require("fs");
var path_1 = require("path");
var lib_1 = require("../../lib");
var schema_1 = require("../../lib/schema");
var preprocessor_1 = require("../../lib/preprocessor");
var SPECIFICATION = 'draft2020-12';
var ROOT_DIRECTORY = path_1.resolve(__dirname, '..', '..', '..');
var JSON_SCHEMA_TEST_SUITE = path_1.resolve(ROOT_DIRECTORY, 'vendor', 'json-schema-test-suite');
var JSON_SCHEMA_TESTS_PATH = path_1.resolve(JSON_SCHEMA_TEST_SUITE, 'tests', SPECIFICATION);
var recursiveReadDirectory = function (filePath) {
    return fs_1.readdirSync(filePath).reduce(function (accumulator, element) {
        var fullPath = path_1.resolve(filePath, element);
        return fs_1.statSync(fullPath).isDirectory()
            ? accumulator.concat(recursiveReadDirectory(fullPath))
            : accumulator.concat(fullPath);
    }, []);
};
try {
    for (var _c = __values(recursiveReadDirectory(JSON_SCHEMA_TESTS_PATH)), _d = _c.next(); !_d.done; _d = _c.next()) {
        var suitePath = _d.value;
        var name_1 = path_1.basename(suitePath);
        if ([
            'refRemote.json',
            'ref.json',
            'id.json',
            'anchor.json',
            'unknownKeyword.json',
            'format.json',
            'time.json',
            'iri.json',
            'dynamicRef.json',
            'float-overflow.json'
        ].includes(name_1)) {
            continue;
        }
        var suites = JSON.parse(fs_1.readFileSync(suitePath, 'utf8'));
        var _loop_1 = function (suite) {
            var e_3, _e;
            var _loop_2 = function (testCase) {
                if (!testCase.valid) {
                    return "continue";
                }
                tap_1.default.test(name_1 + " | " + suite.description + " -> " + testCase.description, function (test) { return __awaiter(void 0, void 0, void 0, function () {
                    var schema, encoding, buffer, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, preprocessor_1.preprocessSchema(suite.schema)];
                            case 1:
                                schema = _a.sent();
                                test.true(schema_1.validateSchema(schema, testCase.data));
                                return [4, lib_1.compileSchema(schema)];
                            case 2:
                                encoding = _a.sent();
                                buffer = lib_1.encode(encoding, testCase.data);
                                result = lib_1.decode(encoding, buffer);
                                test.strictSame(testCase.data, result);
                                test.end();
                                return [2];
                        }
                    });
                }); });
            };
            try {
                for (var _f = (e_3 = void 0, __values(suite.tests)), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var testCase = _g.value;
                    _loop_2(testCase);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_e = _f.return)) _e.call(_f);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        try {
            for (var suites_1 = (e_2 = void 0, __values(suites)), suites_1_1 = suites_1.next(); !suites_1_1.done; suites_1_1 = suites_1.next()) {
                var suite = suites_1_1.value;
                _loop_1(suite);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (suites_1_1 && !suites_1_1.done && (_b = suites_1.return)) _b.call(suites_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    }
    finally { if (e_1) throw e_1.error; }
}
