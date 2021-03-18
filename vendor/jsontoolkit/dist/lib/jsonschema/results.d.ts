import { ValidationResult, ValidateOutputMode } from './validate';
import { Pointer } from '../jsonpointer';
export declare const ok: (mode: ValidateOutputMode, keyword?: Pointer | undefined, instance?: Pointer | undefined, scope?: string | null | undefined) => ValidationResult;
export declare const fail: (mode: ValidateOutputMode, message: string, keyword?: Pointer | undefined, instance?: Pointer | undefined, scope?: string | null | undefined) => ValidationResult;
export declare const wrap: (mode: ValidateOutputMode, result: ValidationResult, keyword: Pointer, instance: Pointer, scope: string | null) => ValidationResult;
//# sourceMappingURL=results.d.ts.map