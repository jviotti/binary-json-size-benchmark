import { JSONValue } from '../../json';
import { Pointer } from '../../jsonpointer';
import { ObjectSchema } from '../schema';
import { SchemaValidator, ValidationResult, ValidateOutputMode } from '../validate';
export { required, type, not, anyOf, allOf, oneOf, items, minProperties, maxProperties, exclusiveMaximum, exclusiveMinimum, minItems, maxItems, multipleOf, minLength, maxLength, maximum, minimum, pattern, _enum, uniqueItems, dependencies, properties, patternProperties, additionalProperties } from './draft4';
export declare const _const: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const contains: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const format: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const propertyNames: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, _schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
//# sourceMappingURL=draft6.d.ts.map