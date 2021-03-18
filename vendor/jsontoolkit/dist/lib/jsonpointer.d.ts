import { JSONObject, JSONValue } from './json';
declare type ReferenceToken = string | number;
export declare type Pointer = ReferenceToken[];
export declare const isPointerString: (pointer: string) => boolean;
export declare const isPointerURIFragment: (fragment: string) => boolean;
export declare const parsePointerString: (pointer: string) => Pointer | null;
export declare const parsePointerURIFragment: (fragment: string) => Pointer | null;
export interface AbsolutePointer {
    readonly pointer: Pointer;
    readonly baseUri: string | null;
}
export declare const parseURI: (input: string) => AbsolutePointer;
export declare const serializePointer: (pointer: Pointer) => string;
export declare const serializePointerAsFragment: (pointer: Pointer) => string;
declare type JSONAccessor = (document: JSONObject | JSONValue[], key: string | number) => JSONValue | undefined;
export declare const getValue: (document: JSONObject | JSONValue[], pointer: Pointer, accessor?: JSONAccessor) => string | number | boolean | JSONObject | JSONValue[] | null | undefined;
export declare const removeValue: (document: JSONObject | JSONValue[], pointer: Pointer, accessor?: JSONAccessor) => JSONObject | JSONValue[] | undefined;
export {};
//# sourceMappingURL=jsonpointer.d.ts.map