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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var METASCHEMA_DRAFT2019_09 = require("../schemas/json-schema.org/draft/2019-09/schema.json");
// TODO: We shouldn't import these vocabularies here as they
// are not considered "meta-schemas" according to the spec.
// We should pre-load them in the cache or in the resolver in some
// other way.
var METASCHEMA_DRAFT2019_09_CORE = require("../schemas/json-schema.org/draft/2019-09/meta/core.json");
var METASCHEMA_DRAFT2019_09_APPLICATOR = require("../schemas/json-schema.org/draft/2019-09/meta/applicator.json");
var METASCHEMA_DRAFT2019_09_VALIDATION = require("../schemas/json-schema.org/draft/2019-09/meta/validation.json");
var METASCHEMA_DRAFT2019_09_META_DATA = require("../schemas/json-schema.org/draft/2019-09/meta/meta-data.json");
var METASCHEMA_DRAFT2019_09_FORMAT = require("../schemas/json-schema.org/draft/2019-09/meta/format.json");
var METASCHEMA_DRAFT2019_09_CONTENT = require("../schemas/json-schema.org/draft/2019-09/meta/content.json");
var METASCHEMA_DRAFT7 = require("../schemas/json-schema.org/draft-07/schema.json");
var METASCHEMA_DRAFT6 = require("../schemas/json-schema.org/draft-06/schema.json");
var METASCHEMA_DRAFT4 = require("../schemas/json-schema.org/draft-04/schema.json");
var METASCHEMA_DRAFT3 = require("../schemas/json-schema.org/draft-03/schema.json");
var draft201909 = require("./draft2019-09");
var draft7 = require("./draft7");
var draft6 = require("./draft6");
var draft4 = require("./draft4");
var draft3 = require("./draft3");
var METASCHEMAS = (_a = {},
    _a[METASCHEMA_DRAFT2019_09.$id] = {
        schema: METASCHEMA_DRAFT2019_09,
        handlers: draft201909
    },
    _a[METASCHEMA_DRAFT2019_09_CORE.$id] = {
        schema: METASCHEMA_DRAFT2019_09_CORE,
        handlers: draft201909
    },
    _a[METASCHEMA_DRAFT2019_09_APPLICATOR.$id] = {
        schema: METASCHEMA_DRAFT2019_09_APPLICATOR,
        handlers: draft201909
    },
    _a[METASCHEMA_DRAFT2019_09_VALIDATION.$id] = {
        schema: METASCHEMA_DRAFT2019_09_VALIDATION,
        handlers: draft201909
    },
    _a[METASCHEMA_DRAFT2019_09_META_DATA.$id] = {
        schema: METASCHEMA_DRAFT2019_09_META_DATA,
        handlers: draft201909
    },
    _a[METASCHEMA_DRAFT2019_09_FORMAT.$id] = {
        schema: METASCHEMA_DRAFT2019_09_FORMAT,
        handlers: draft201909
    },
    _a[METASCHEMA_DRAFT2019_09_CONTENT.$id] = {
        schema: METASCHEMA_DRAFT2019_09_CONTENT,
        handlers: draft201909
    },
    // TODO: Support HTTP variants (along with HTTPS)
    // for compatibility purposes (and write tests for it)
    _a[METASCHEMA_DRAFT7.$id] = {
        schema: METASCHEMA_DRAFT7,
        handlers: draft7
    },
    _a[METASCHEMA_DRAFT6.$id] = {
        schema: METASCHEMA_DRAFT6,
        handlers: draft6
    },
    _a[METASCHEMA_DRAFT4.id] = {
        schema: METASCHEMA_DRAFT4,
        handlers: draft4
    },
    _a[METASCHEMA_DRAFT3.id] = {
        schema: METASCHEMA_DRAFT3,
        handlers: draft3
    },
    _a);
exports.METASCHEMA_KEYWORD = '$schema';
exports.getHandler = function (metaschema, keyword) {
    var base = METASCHEMAS[metaschema];
    // These keyword are reserved in JavaScript
    var handler = keyword === 'enum' ||
        keyword === 'extends' ||
        keyword === 'const' ||
        keyword === 'if'
        ? base.handlers["_" + keyword]
        : base.handlers[keyword];
    if (typeof handler === 'undefined') {
        return null;
    }
    return handler;
};
exports.getSchemaId = function (metaschema, schema) {
    if (typeof schema === 'boolean') {
        return null;
    }
    if (metaschema === METASCHEMA_DRAFT3.id ||
        metaschema === METASCHEMA_DRAFT4.id) {
        return schema.id === undefined ? null : schema.id;
    }
    return schema.$id === undefined ? null : schema.$id;
};
exports.DEFAULT_METASCHEMA = METASCHEMA_DRAFT6.$id;
exports.getMetaSchemaById = function (id) {
    var metaschema = METASCHEMAS[id];
    if (typeof metaschema === 'undefined') {
        return null;
    }
    return metaschema.schema;
};
/*
 * Get the metaschema id from a given JSON Schema document,
 * providing a sane default if the exact one can't be determined.
 */
exports.getMetaSchemaIdFromSchema = function (schema) {
    var _a;
    // We can't do much more than a default for a boolean schema
    // as it doesn't have an $schema keyword by definition.
    if (typeof schema === 'boolean') {
        return exports.DEFAULT_METASCHEMA;
    }
    // TODO: Use METASCHEMA_KEYWORD from vocabularies module
    // instead of duplicating "$schema"
    return (_a = schema.$schema) !== null && _a !== void 0 ? _a : exports.DEFAULT_METASCHEMA;
};
//# sourceMappingURL=index.js.map