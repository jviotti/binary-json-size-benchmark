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
/*
 * This class represents a temporary central storage
 * of all the schemas we know about during execution.
 */
var SchemaCache = /** @class */ (function () {
    function SchemaCache() {
        this.data = new Map();
    }
    /*
     * Get the root schema of the cache entry corresponding
     * to a given id.
     */
    SchemaCache.prototype.getRootSchema = function (id) {
        var entry = this.data.get(id);
        if (typeof entry === 'undefined') {
            return null;
        }
        return entry.root;
    };
    /*
     * Get the schema of the cache entry corresponding
     * to a given id.
     */
    SchemaCache.prototype.getSchema = function (id) {
        var entry = this.data.get(id);
        if (typeof entry === 'undefined') {
            return null;
        }
        return entry.schema;
    };
    /*
     * Check if the cache has an entry that corresponds to
     * a given id.
     */
    SchemaCache.prototype.hasSchema = function (id) {
        return this.data.has(id);
    };
    /*
     * Store a schema in the cache where the root is the
     * same schema.
     */
    SchemaCache.prototype.setCanonical = function (id, schema) {
        this.data.set(id, {
            schema: schema,
            root: schema
        });
    };
    /*
     * Store a schema in the cache where the root is a
     * different schema.
     */
    SchemaCache.prototype.setInline = function (id, schema, root) {
        this.data.set(id, {
            schema: schema,
            root: root
        });
    };
    return SchemaCache;
}());
exports.default = SchemaCache;
//# sourceMappingURL=schema-cache.js.map