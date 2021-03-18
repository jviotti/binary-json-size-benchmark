import { JSONValue } from './json';
interface CountSizeStats {
    count: number;
    byteSize: number;
}
interface ValuesStats {
    numeric: CountSizeStats;
    textual: CountSizeStats;
    boolean: CountSizeStats;
    structural: CountSizeStats;
}
export interface JSONStats {
    byteSize: number;
    maxNestingDepth: number;
    largestLevel: number;
    keys: CountSizeStats;
    values: ValuesStats;
    duplicatedKeys: number;
    duplicatedValues: number;
}
export declare const analyze: (document: JSONValue, level?: number, accumulator?: JSONStats, keys?: Set<string>, values?: JSONValue[], levels?: number[]) => JSONStats;
export declare enum JSONStatsSizeQualifier {
    tiny = "tiny",
    small = "small",
    large = "large"
}
export interface JSONStatsSummary {
    size: JSONStatsSizeQualifier;
    keysRedundancy: number;
    valuesRedundancy: number;
    nestingWeight: number;
    numericWeight: number;
    textualWeight: number;
    booleanWeight: number;
    structuralWeight: number;
}
export declare const summarize: (stats: JSONStats) => JSONStatsSummary;
export declare const qualify: (summary: JSONStatsSummary) => string[];
export {};
//# sourceMappingURL=stats.d.ts.map