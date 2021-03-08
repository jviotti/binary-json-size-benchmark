struct EcmaFeatures {
  1: required bool jsx
}

struct Environment {
  1: required bool browser,
  2: required bool node,
  3: required bool es6
}

struct JSDocOptions {
  1: required bool requireReturn
}

union JSDocRule {
  1: i8 numeric,
  2: JSDocOptions options
}

struct Rules {
  1: required i8 eqeqeq,
  2: required i8 commaDangle,
  3: required i8 noConsole,
  4: required i8 noDebugger,
  5: required i8 noExtraSemi,
  6: required i8 noExtraParens,
  7: required i8 noIrregularWhitespace,
  8: required i8 noUndef,
  9: required i8 noUnusedVars,
  10: required i8 semi,
  11: required i8 semiSpacing,
  12: required list<JSDocRule> validJsdoc,
  13: required i8 reactDisplayName,
  14: required i8 reactForbidPropTypes,
  15: required i8 reactJsxBooleanValue,
  16: required i8 reactJsxClosingBracketLocation,
  17: required i8 reactJsxCurlySpacing,
  18: required i8 reactJsxIndentProps,
  19: required i8 reactJsxMaxPropsPerLine,
  20: required i8 reactJsxNoDuplicateProps,
  21: required i8 reactJsxNoLiterals,
  22: required i8 reactJsxNoUndef,
  23: required i8 reactJsxSortPropTypes,
  24: required i8 reactJsxSortProps,
  25: required i8 reactJsxUsesReact,
  26: required i8 reactJsxUsesVars,
  27: required i8 reactNoDanger,
  28: required i8 reactNoDidMountSetState,
  29: required i8 reactNoDidUpdateSetState,
  30: required i8 reactNoDirectMutationState,
  31: required i8 reactNoMultiComp,
  32: required i8 reactNoSetState,
  33: required i8 reactNoUnknownProperty,
  34: required i8 reactPropTypes,
  35: required i8 reactReactInJsxScope,
  36: required i8 reactRequireExtension,
  37: required i8 reactSelfClosingComp,
  38: required i8 reactSortComp,
  39: required i8 reactWrapMultilines
}

struct Main {
  1: required string extension,
  2: required string parser,
  3: required EcmaFeatures ecmaFeatures,
  4: required list<string> plugins,
  5: required Environment env,
  6: required Rules rules
}
