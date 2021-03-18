import { Schema } from './schema';
import { Pointer } from '../jsonpointer';
import { SchemaContext } from './schema-context';
import SchemaCache from './schema-cache';
export declare type SchemaResolver = (uri: string) => Promise<Schema | null>;
export interface ResolverOptions {
    readonly cache: SchemaCache;
    readonly resolver: SchemaResolver;
    readonly anchored: boolean;
}
export interface ReferenceResolution {
    readonly schema: Schema;
    readonly keywordLocation: Pointer;
    readonly context: SchemaContext;
}
export declare const resolveObjectRef: (schema: Schema, context: SchemaContext, schemaPointer: Pointer, options: ResolverOptions) => Promise<ReferenceResolution | null>;
//# sourceMappingURL=reference-resolver.d.ts.map