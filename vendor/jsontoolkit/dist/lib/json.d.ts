export declare type JSONScalar = number | boolean | string | null;
export interface JSONObject {
    readonly [key: string]: JSONValue | undefined;
}
export declare type JSONValue = JSONObject | JSONValue[] | JSONScalar;
export declare enum JSONType {
    number = "number",
    boolean = "boolean",
    string = "string",
    null = "null",
    object = "object",
    array = "array"
}
export declare enum JSONTypeCategory {
    numeric = "numeric",
    textual = "textual",
    boolean = "boolean",
    structural = "structural"
}
export declare const getJSONType: (value: JSONValue) => JSONType;
export declare const getJSONTypeCategory: (type: JSONType) => JSONTypeCategory;
export declare const getElement: (document: JSONObject | JSONValue[], key: string | number) => string | number | boolean | JSONObject | JSONValue[] | null | undefined;
export declare const getJSONSize: (document: JSONValue) => number;
export declare const readJSONFile: (filePath: string) => Promise<JSONValue>;
//# sourceMappingURL=json.d.ts.map