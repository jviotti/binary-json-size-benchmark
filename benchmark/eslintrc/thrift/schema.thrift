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
  1: byte numeric,
  2: JSDocOptions options
}

struct Rules {
  1: required byte eqeqeq,
  2: required byte commaDangle,
  3: required byte noConsole,
  4: required byte noDebugger,
  5: required byte noExtraSemi,
  6: required byte noExtraParens,
  7: required byte noIrregularWhitespace,
  8: required byte noUndef,
  9: required byte noUnusedVars,
  10: required byte semi,
  11: required byte semiSpacing,
  12: required list<JSDocRule> validJsdoc,
  13: required byte reactDisplayName,
  14: required byte reactForbidPropTypes,
  15: required byte reactJsxBooleanValue,
  16: required byte reactJsxClosingBracketLocation,
  17: required byte reactJsxCurlySpacing,
  18: required byte reactJsxIndentProps,
  19: required byte reactJsxMaxPropsPerLine,
  20: required byte reactJsxNoDuplicateProps,
  21: required byte reactJsxNoLiterals,
  22: required byte reactJsxNoUndef,
  23: required byte reactJsxSortPropTypes,
  24: required byte reactJsxSortProps,
  25: required byte reactJsxUsesReact,
  26: required byte reactJsxUsesVars,
  27: required byte reactNoDanger,
  28: required byte reactNoDidMountSetState,
  29: required byte reactNoDidUpdateSetState,
  30: required byte reactNoDirectMutationState,
  31: required byte reactNoMultiComp,
  32: required byte reactNoSetState,
  33: required byte reactNoUnknownProperty,
  34: required byte reactPropTypes,
  35: required byte reactReactInJsxScope,
  36: required byte reactRequireExtension,
  37: required byte reactSelfClosingComp,
  38: required byte reactSortComp,
  39: required byte reactWrapMultilines
}

struct Main {
  1: required string extension,
  2: required string parser,
  3: required EcmaFeatures ecmaFeatures,
  4: required list<string> plugins,
  5: required Environment env,
  6: required Rules rules
}
