import { Schema } from './schema';
export default class SchemaCache {
    private readonly data;
    constructor();
    getRootSchema(id: string): Schema | null;
    getSchema(id: string): Schema | null;
    hasSchema(id: string): boolean;
    setCanonical(id: string, schema: Schema): void;
    setInline(id: string, schema: Schema, root: Schema): void;
}
//# sourceMappingURL=schema-cache.d.ts.map