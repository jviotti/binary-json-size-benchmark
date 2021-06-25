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
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var util_1 = require("util");
var fs_1 = require("fs");
var path_1 = require("path");
var lib_1 = require("../../lib");
var schema_1 = require("../../lib/schema");
var preprocessor_1 = require("../../lib/preprocessor");
var TEST_DIRECTORY = __dirname;
var SRC_TEST_DIRECTORY = path_1.resolve(__dirname, '..', '..', '..', 'test', 'e2e');
var safeReadFile = function (filePath) {
    try {
        return fs_1.readFileSync(filePath, 'utf8');
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return null;
        }
        throw error;
    }
};
var writeResult = function (testCase, name, value) {
    var destination = path_1.resolve(SRC_TEST_DIRECTORY, testCase, name);
    var currentContent = safeReadFile(destination);
    if (typeof currentContent === 'string' &&
        util_1.isDeepStrictEqual(JSON.parse(currentContent), value)) {
        return;
    }
    var content = JSON.stringify(value, null, 2);
    fs_1.writeFileSync(destination, content + "\n", 'utf8');
};
var _loop_1 = function (testCase) {
    var testCasePath = path_1.resolve(TEST_DIRECTORY, testCase);
    if (!fs_1.statSync(testCasePath).isDirectory()) {
        return "continue";
    }
    tap_1.default.test(testCase, function (test) { return __awaiter(void 0, void 0, void 0, function () {
        var schema, value, encodingSchema, encoding, buffer, result, size;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = JSON.parse(fs_1.readFileSync(path_1.resolve(testCasePath, 'schema.json'), 'utf8'));
                    value = JSON.parse(fs_1.readFileSync(path_1.resolve(testCasePath, 'document.json'), 'utf8'));
                    return [4, preprocessor_1.preprocessSchema(schema)];
                case 1:
                    encodingSchema = _a.sent();
                    test.true(schema_1.validateSchema(encodingSchema, value));
                    return [4, lib_1.compileSchema(schema)];
                case 2:
                    encoding = _a.sent();
                    writeResult(testCase, 'encoding.json', encoding);
                    writeResult(testCase, 'canonical.json', encodingSchema);
                    buffer = lib_1.encode(encoding, value);
                    result = lib_1.decode(encoding, buffer);
                    fs_1.writeFileSync(path_1.resolve(SRC_TEST_DIRECTORY, testCase, 'output.bin'), buffer);
                    size = String(buffer.length);
                    fs_1.writeFileSync(path_1.resolve(SRC_TEST_DIRECTORY, testCase, 'size'), size + "\n", 'utf8');
                    test.strictSame(value, result);
                    test.end();
                    return [2];
            }
        });
    }); });
};
try {
    for (var _b = __values(fs_1.readdirSync(TEST_DIRECTORY)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var testCase = _c.value;
        _loop_1(testCase);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
