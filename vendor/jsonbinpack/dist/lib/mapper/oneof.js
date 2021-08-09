"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneOfEncoding = exports.getOneOfStates = void 0;
var lodash_1 = require("lodash");
var encoder_1 = require("../encoder");
var index_1 = require("./index");
var getOneOfStates = function (schema) {
    return schema.oneOf.reduce(function (accumulator, choice) {
        var states = index_1.getStates(choice);
        if (Array.isArray(states)) {
            if (Array.isArray(accumulator)) {
                return lodash_1.uniqWith(accumulator.concat(states), lodash_1.isEqual);
            }
            return accumulator + states.length;
        }
        var accumulatorLength = Array.isArray(accumulator) ? accumulator.length : accumulator;
        return accumulatorLength + states;
    }, []);
};
exports.getOneOfStates = getOneOfStates;
var getOneOfEncoding = function (schema, level) {
    return {
        type: encoder_1.EncodingType.OneOf,
        encoding: 'ONEOF_CHOICE_INDEX_PREFIX',
        options: {
            choices: schema.oneOf.map(function (item) {
                return {
                    schema: item,
                    encoding: index_1.getEncoding(item, level + 1)
                };
            })
        }
    };
};
exports.getOneOfEncoding = getOneOfEncoding;
