"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var codemirror_1 = __importDefault(require("codemirror"));
var jsonstats_1 = require("../contrib/jsonstats");
var EXAMPLE_JSON = {
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
var editorElement = document.getElementById('editor');
if (editorElement === null) {
    throw new Error('Editor element does not exist');
}
var code = codemirror_1.default(editorElement, {
    lineNumbers: true,
    value: JSON.stringify(EXAMPLE_JSON, null, 2),
    theme: 'idea',
    mode: 'json'
});
var buttonElement = document.getElementById('analyze');
if (buttonElement === null) {
    throw new Error('Button element does not exist');
}
var parseJSON = function (value) {
    try {
        var result = JSON.parse(value);
        return result;
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            document.querySelectorAll('.error-modal').forEach(function (element) {
                element.classList.remove('hidden');
            });
        }
        throw error;
    }
};
var ANALYZE_VALUES_STRUCTURAL_COUNT = document.getElementById('analyze-values-structural-count');
var ANALYZE_VALUES_STRUCTURAL_BYTESIZE = document.getElementById('analyze-values-structural-bytesize');
var ANALYZE_VALUES_NUMERIC_COUNT = document.getElementById('analyze-values-numeric-count');
var ANALYZE_VALUES_NUMERIC_BYTESIZE = document.getElementById('analyze-values-numeric-bytesize');
var ANALYZE_VALUES_BOOLEAN_COUNT = document.getElementById('analyze-values-boolean-count');
var ANALYZE_VALUES_BOOLEAN_BYTESIZE = document.getElementById('analyze-values-boolean-bytesize');
var ANALYZE_VALUES_TEXTUAL_COUNT = document.getElementById('analyze-values-textual-count');
var ANALYZE_VALUES_TEXTUAL_BYTESIZE = document.getElementById('analyze-values-textual-bytesize');
var ANALYZE_KEYS_COUNT = document.getElementById('analyze-keys-count');
var ANALYZE_KEYS_BYTESIZE = document.getElementById('analyze-keys-bytesize');
var ANALYZE_LARGEST_LEVEL = document.getElementById('analyze-largest-level');
var ANALYZE_MAX_NESTING_DEPTH = document.getElementById('analyze-max-nesting-depth');
var ANALYZE_DUPLICATED_KEYS = document.getElementById('analyze-duplicated-keys');
var ANALYZE_DUPLICATED_VALUES = document.getElementById('analyze-duplicated-values');
var ANALYZE_BYTESIZE = document.getElementById('analyze-bytesize');
if (ANALYZE_VALUES_STRUCTURAL_COUNT === null ||
    ANALYZE_VALUES_STRUCTURAL_BYTESIZE === null ||
    ANALYZE_VALUES_NUMERIC_COUNT === null ||
    ANALYZE_VALUES_NUMERIC_BYTESIZE === null ||
    ANALYZE_VALUES_BOOLEAN_COUNT === null ||
    ANALYZE_VALUES_BOOLEAN_BYTESIZE === null ||
    ANALYZE_VALUES_TEXTUAL_COUNT === null ||
    ANALYZE_VALUES_TEXTUAL_BYTESIZE === null ||
    ANALYZE_KEYS_COUNT === null ||
    ANALYZE_KEYS_BYTESIZE === null ||
    ANALYZE_LARGEST_LEVEL === null ||
    ANALYZE_MAX_NESTING_DEPTH === null ||
    ANALYZE_DUPLICATED_KEYS === null ||
    ANALYZE_DUPLICATED_VALUES === null ||
    ANALYZE_BYTESIZE === null) {
    throw new Error('Not all analyze elements exist');
}
var SUMMARY_SIZE = document.getElementById('summary-size');
var SUMMARY_KEYS_REDUNDANCY = document.getElementById('summary-keys-redundancy');
var SUMMARY_VALUES_REDUNDANCY = document.getElementById('summary-values-redundancy');
var SUMMARY_NESTING_WEIGHT = document.getElementById('summary-nesting-weight');
var SUMMARY_NUMERIC_WEIGHT = document.getElementById('summary-numeric-weight');
var SUMMARY_TEXTUAL_WEIGHT = document.getElementById('summary-textual-weight');
var SUMMARY_BOOLEAN_WEIGHT = document.getElementById('summary-boolean-weight');
var SUMMARY_STRUCTURAL_WEIGHT = document.getElementById('summary-structural-weight');
if (SUMMARY_SIZE === null ||
    SUMMARY_KEYS_REDUNDANCY === null ||
    SUMMARY_VALUES_REDUNDANCY === null ||
    SUMMARY_NESTING_WEIGHT === null ||
    SUMMARY_NUMERIC_WEIGHT === null ||
    SUMMARY_TEXTUAL_WEIGHT === null ||
    SUMMARY_BOOLEAN_WEIGHT === null ||
    SUMMARY_STRUCTURAL_WEIGHT === null) {
    throw new Error('Not all summary elements exist');
}
var QUALIFIERS_CONTAINER = document.getElementById('qualifiers');
if (QUALIFIERS_CONTAINER === null) {
    throw new Error('The qualifiers container does not exist');
}
var capitalize = function (text) {
    return text[0].toUpperCase() + text.slice(1);
};
var populate = function (contents) {
    var json = parseJSON(contents);
    var stats = jsonstats_1.analyze(json);
    ANALYZE_BYTESIZE.innerHTML = String(stats.byteSize);
    ANALYZE_DUPLICATED_KEYS.innerHTML =
        String(stats.duplicatedKeys);
    ANALYZE_DUPLICATED_VALUES.innerHTML =
        String(stats.duplicatedValues);
    ANALYZE_MAX_NESTING_DEPTH.innerHTML =
        String(stats.maxNestingDepth);
    ANALYZE_LARGEST_LEVEL.innerHTML =
        String(stats.largestLevel);
    ANALYZE_KEYS_COUNT.innerHTML =
        String(stats.keys.count);
    ANALYZE_KEYS_BYTESIZE.innerHTML =
        String(stats.keys.byteSize);
    ANALYZE_VALUES_NUMERIC_COUNT.innerHTML =
        String(stats.values.numeric.count);
    ANALYZE_VALUES_NUMERIC_BYTESIZE.innerHTML =
        String(stats.values.numeric.byteSize);
    ANALYZE_VALUES_BOOLEAN_COUNT.innerHTML =
        String(stats.values.boolean.count);
    ANALYZE_VALUES_BOOLEAN_BYTESIZE.innerHTML =
        String(stats.values.boolean.byteSize);
    ANALYZE_VALUES_TEXTUAL_COUNT.innerHTML =
        String(stats.values.textual.count);
    ANALYZE_VALUES_TEXTUAL_BYTESIZE.innerHTML =
        String(stats.values.textual.byteSize);
    ANALYZE_VALUES_STRUCTURAL_COUNT.innerHTML =
        String(stats.values.structural.count);
    ANALYZE_VALUES_STRUCTURAL_BYTESIZE.innerHTML =
        String(stats.values.structural.byteSize);
    var summary = jsonstats_1.summarize(stats);
    SUMMARY_SIZE.innerHTML = summary.size;
    SUMMARY_NESTING_WEIGHT.innerHTML =
        String(summary.nestingWeight);
    var precision = 4;
    SUMMARY_KEYS_REDUNDANCY.innerHTML =
        summary.keysRedundancy.toFixed(precision);
    SUMMARY_VALUES_REDUNDANCY.innerHTML =
        summary.valuesRedundancy.toFixed(precision);
    SUMMARY_NUMERIC_WEIGHT.innerHTML =
        summary.numericWeight.toFixed(precision);
    SUMMARY_TEXTUAL_WEIGHT.innerHTML =
        summary.textualWeight.toFixed(precision);
    SUMMARY_BOOLEAN_WEIGHT.innerHTML =
        summary.booleanWeight.toFixed(precision);
    SUMMARY_STRUCTURAL_WEIGHT.innerHTML =
        summary.structuralWeight.toFixed(precision);
    QUALIFIERS_CONTAINER.innerHTML = jsonstats_1.qualify(summary).map(capitalize).join(', ');
};
buttonElement.addEventListener('click', function () {
    var contents = code.getValue();
    populate(contents);
});
var modalButtonElement = document.getElementById('close-modal');
if (modalButtonElement === null) {
    throw new Error('Modal button element does not exist');
}
modalButtonElement.addEventListener('click', function () {
    document.querySelectorAll('.error-modal').forEach(function (element) {
        element.classList.add('hidden');
    });
});
populate(code.getValue());
