import { ObjectSchema } from '../schema';
import { JSONValue } from '../../json';
import { SchemaValidator, ValidationResult, ValidateOutputMode } from '../validate';
import { Pointer } from '../../jsonpointer';
export { minItems, maxItems, divisibleBy as multipleOf, minLength, maxLength, exclusiveMaximum, exclusiveMinimum, maximum, minimum, pattern, patternProperties, _enum, uniqueItems, dependencies, items, additionalProperties } from './draft3';
export declare const required: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const type: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const format: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const properties: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, _schema: ObjectSchema, scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const minProperties: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const maxProperties: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const not: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, _schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer) => Promise<ValidationResult>;
export declare const allOf: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, _schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const anyOf: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const oneOf: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, _schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
//# sourceMappingURL=draft4.d.ts.map