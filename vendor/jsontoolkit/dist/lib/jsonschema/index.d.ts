import { JSONValue } from '../json';
import { SchemaResolver } from './reference-resolver';
import { Schema, SchemaType } from './schema';
import { ValidationResult, ValidateOutputMode } from './validate';
export { Schema } from './schema';
export { ValidationResult, ValidateOutputMode } from './validate';
export declare const isTypeOf: (type: SchemaType, value: JSONValue) => boolean;
export declare const defaultResolver: SchemaResolver;
export declare const validate: (mode: ValidateOutputMode, schema: Schema, instance: JSONValue, resolver?: SchemaResolver) => Promise<ValidationResult>;
//# sourceMappingURL=index.d.ts.map