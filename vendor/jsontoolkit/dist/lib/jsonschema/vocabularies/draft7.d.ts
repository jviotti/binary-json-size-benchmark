import { JSONValue } from '../../json';
import { Pointer } from '../../jsonpointer';
import { ObjectSchema } from '../schema';
import { SchemaValidator, ValidationResult, ValidateOutputMode } from '../validate';
export { _const, contains, propertyNames, required, type, not, anyOf, allOf, oneOf, items, minProperties, maxProperties, exclusiveMaximum, exclusiveMinimum, minItems, maxItems, multipleOf, minLength, maxLength, maximum, minimum, pattern, _enum, uniqueItems, dependencies, properties, patternProperties, additionalProperties } from './draft6';
export declare const contentMediaType: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, schemaPointer: Pointer, _keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const contentEncoding: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
export declare const _if: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, schema: ObjectSchema, _scope: string | null, validate: SchemaValidator, instancePointer: Pointer, schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const format: (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue) => Promise<ValidationResult>;
//# sourceMappingURL=draft7.d.ts.map