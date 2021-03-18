import { Schema, ObjectSchema } from '../schema';
import { JSONValue } from '../../json';
import { SchemaValidator, ValidationResult, ValidateOutputMode } from '../validate';
import { Pointer } from '../../jsonpointer';
export declare type KeywordHandler = (mode: ValidateOutputMode, arg: JSONValue, instance: JSONValue, schema: ObjectSchema, scope: string | null, validate: SchemaValidator, instancePointer: Pointer, schemaPointer: Pointer, keywordPointer: Pointer, evaluatedPointers: Set<string>) => Promise<ValidationResult>;
export declare const METASCHEMA_KEYWORD: string;
export declare const getHandler: (metaschema: string, keyword: string) => KeywordHandler | null;
export declare const getSchemaId: (metaschema: string, schema: Schema) => string | null;
export declare const DEFAULT_METASCHEMA: string;
export declare const getMetaSchemaById: (id: string) => boolean | ObjectSchema | null;
export declare const getMetaSchemaIdFromSchema: (schema: Schema) => string;
//# sourceMappingURL=index.d.ts.map