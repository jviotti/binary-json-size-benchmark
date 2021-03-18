import { JSONValue } from '../json';
import { Pointer } from '../jsonpointer';
import { Schema } from './schema';
import { SchemaResolver } from './reference-resolver';
export declare type SchemaValidator = (schema: Schema, instance: JSONValue, instancePointer: Pointer, schemaPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export interface ValidationResult {
    readonly [key: string]: boolean | string | undefined | Partial<ValidationResult>[];
    readonly valid: boolean;
    readonly absoluteKeywordLocation?: string;
    readonly keywordLocation?: string;
    readonly instanceLocation?: string;
    readonly error?: string;
    readonly errors?: Partial<ValidationResult>[];
}
export declare enum ValidateOutputMode {
    Flag = "flag",
    Basic = "basic",
    Detailed = "detailed",
    Verbose = "verbose"
}
export declare const validate: (mode: ValidateOutputMode, schema: Schema, instance: JSONValue, resolver: SchemaResolver) => Promise<ValidationResult>;
//# sourceMappingURL=validate.d.ts.map