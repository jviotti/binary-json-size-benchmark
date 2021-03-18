import { ObjectSchema } from '../schema';
import { JSONValue } from '../../json';
import { ValidationResult, ValidateOutputMode, SchemaValidator } from '../validate';
import { Pointer } from '../../jsonpointer';
export { _const, contains, propertyNames, required, type, not, anyOf, allOf, oneOf, items, minProperties, maxProperties, exclusiveMaximum, exclusiveMinimum, minItems, maxItems, multipleOf, minLength, maxLength, maximum, minimum, pattern, _enum, uniqueItems, dependencies, properties, patternProperties, additionalProperties, _if } from './draft7';
export declare const dependentRequired: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const dependentSchemas: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, _schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, schemaPointer: Pointer, _keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const unevaluatedProperties: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, _schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const unevaluatedItems: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, _schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, _schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const format: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
//# sourceMappingURL=draft2019-09.d.ts.map