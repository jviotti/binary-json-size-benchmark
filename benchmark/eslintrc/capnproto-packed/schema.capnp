@0xafc05c2b7c615fc0;

struct EcmaFeatures {
  jsx @0 :Bool;
}

struct Environment {
  browser @0 :Bool;
  node @1 :Bool;
  es6 @2 :Bool;
}

struct JSDocOptions {
  requireReturn @0 :Bool;
}

struct JSDoc {
  level @0 :UInt8;
  options @1 :JSDocOptions;
}

struct Rules {
  eqeqeq @0 :UInt8;
  commaDangle @1 :UInt8;
  noConsole @2 :UInt8;
  noDebugger @3 :UInt8;
  noExtraSemi @4 :UInt8;
  noExtraParens @5 :UInt8;
  noIrregularWhitespace @6 :UInt8;
  noUndef @7 :UInt8;
  noUnusedVars @8 :UInt8;
  semi @9 :UInt8;
  semiSpacing @10 :UInt8;
  validJsdoc @11 :JSDoc;
  reactDisplayName @12 :UInt8;
  reactForbidPropTypes @13 :UInt8;
  reactJsxBooleanValue @14 :UInt8;
  reactJsxClosingBracketLocation @15 :UInt8;
  reactJsxCurlySpacing @16 :UInt8;
  reactJsxIndentProps @17 :UInt8;
  reactJsxMaxPropsPerLine @18 :UInt8;
  reactJsxNoDuplicateProps @19 :UInt8;
  reactJsxNoLiterals @20 :UInt8;
  reactJsxNoUndef @21 :UInt8;
  reactJsxSortPropTypes @22 :UInt8;
  reactJsxSortProps @23 :UInt8;
  reactJsxUsesReact @24 :UInt8;
  reactJsxUsesVars @25 :UInt8;
  reactNoDanger @26 :UInt8;
  reactNoDidMountSetState @27 :UInt8;
  reactNoDidUpdateSetState @28 :UInt8;
  reactNoDirectMutationState @29 :UInt8;
  reactNoMultiComp @30 :UInt8;
  reactNoSetState @31 :UInt8;
  reactNoUnknownProperty @32 :UInt8;
  reactPropTypes @33 :UInt8;
  reactReactInJsxScope @34 :UInt8;
  reactRequireExtension @35 :UInt8;
  reactSelfClosingComp @36 :UInt8;
  reactSortComp @37 :UInt8;
  reactWrapMultilines @38 :UInt8;
}

struct Main {
  extends @0 :Text;
  parser @1 :Text;
  ecmaFeatures @2 :EcmaFeatures;
  plugins @3 :List(Text);
  env @4 :Environment;
  rules @5 :Rules;
}
