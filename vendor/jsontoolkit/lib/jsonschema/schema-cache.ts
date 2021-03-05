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

import {
  Schema
} from './schema'

/*
 * A cache entry consists of a JSON Schema document
 * and the root schema it belongs to, which may be
 * the same document.
 */
interface Entry {
  readonly root: Schema;
  readonly schema: Schema;
}

/*
 * This class represents a temporary central storage
 * of all the schemas we know about during execution.
 */
export default class SchemaCache {
  private readonly data: Map<string, Entry>;

  public constructor () {
    this.data = new Map()
  }

  /*
   * Get the root schema of the cache entry corresponding
   * to a given id.
   */
  public getRootSchema (id: string): Schema | null {
    const entry: Entry | undefined = this.data.get(id)
    if (typeof entry === 'undefined') {
      return null
    }

    return entry.root
  }

  /*
   * Get the schema of the cache entry corresponding
   * to a given id.
   */
  public getSchema (id: string): Schema | null {
    const entry: Entry | undefined = this.data.get(id)
    if (typeof entry === 'undefined') {
      return null
    }

    return entry.schema
  }

  /*
   * Check if the cache has an entry that corresponds to
   * a given id.
   */
  public hasSchema (id: string): boolean {
    return this.data.has(id)
  }

  /*
   * Store a schema in the cache where the root is the
   * same schema.
   */
  public setCanonical (id: string, schema: Schema): void {
    this.data.set(id, {
      schema,
      root: schema
    })
  }

  /*
   * Store a schema in the cache where the root is a
   * different schema.
   */
  public setInline (id: string, schema: Schema, root: Schema): void {
    this.data.set(id, {
      schema,
      root
    })
  }
}
