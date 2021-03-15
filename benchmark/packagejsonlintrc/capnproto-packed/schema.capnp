@0xb543b24300ccc937;

struct BooleanRule {
  level @0 :Text;
  options @1 :List(Bool);
}

struct StringRule {
  level @0 :Text;
  options @1 :List(Text);
}

struct Rules {
  requireAuthor @0 :Text;
  requireDescription @1 :Text;
  requireEngines @2 :Text;
  requireLicense @3 :Text;
  requireName @4 :Text;
  requireRepository @5 :Text;
  requireVersion @6 :Text;
  requireBugs @7 :Text;
  requireHomepage @8 :Text;
  requireKeywords @9 :Text;
  binType @10 :Text;
  configType @11 :Text;
  descriptionType @12 :Text;
  devDependenciesType @13 :Text;
  directoriesType @14 :Text;
  enginesType @15 :Text;
  filesType @16 :Text;
  homepageType @17 :Text;
  keywordsType @18 :Text;
  licenseType @19 :Text;
  mainType @20 :Text;
  manType @21 :Text;
  nameType @22 :Text;
  preferGlobalType @23 :Text;
  privateType @24 :Text;
  repositoryType @25 :Text;
  scriptsType @26 :Text;
  versionType @27 :Text;
  nameFormat @28 :Text;
  versionFormat @29 :Text;
  validValuesAuthor @30 :StringRule;
  validValuesPrivate @31 :BooleanRule;
  noRestrictedDependencies @32 :StringRule;
  noRestrictedPreReleaseDependencies @33 :StringRule;
  noRestrictedPreReleaseDevDependencies @34 :StringRule;
  noRestrictedInvalidDevDependencies @35 :StringRule;
}

struct Main {
  rules @0 :Rules;
}
