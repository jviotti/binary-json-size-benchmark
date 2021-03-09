union ComplexRule {
  1: string textual,
  2: list<string> options
  3: list<bool> booleanOptions
}

struct Rules {
  1: required string requireAuthor,
  2: required string requireDescription,
  3: required string requireEngines,
  4: required string requireLicense,
  5: required string requireName,
  6: required string requireRepository,
  7: required string requireVersion,
  8: required string requireBugs,
  9: required string requireHomepage,
  10: required string requireKeywords,
  11: required string binType,
  12: required string configType,
  13: required string descriptionType,
  14: required string devDependenciesType,
  15: required string directoriesType,
  16: required string enginesType,
  17: required string filesType,
  18: required string homepageType,
  19: required string keywordsType,
  20: required string licenseType,
  21: required string mainType,
  22: required string manType,
  23: required string nameType,
  24: required string preferGlobalType,
  25: required string privateType,
  26: required string repositoryType,
  27: required string scriptsType,
  28: required string versionType,
  29: required list<ComplexRule> validValuesAuthor,
  30: required list<ComplexRule> validValuesPrivate,
  31: required list<ComplexRule> noRestrictedDependencies,
  32: required list<ComplexRule> noRestrictedPreReleaseDependencies,
  33: required list<ComplexRule> noRestrictedInvalidDevDependencies,
  34: required list<ComplexRule> noRestrictedPreReleaseDevDependencies,
  35: required string nameFormat,
  36: required string versionFormat,
}

struct Main {
  1: required Rules rules
}
