struct Author {
  1: required string name,
  2: required string url
}

struct Repository {
  1: required string type,
  2: required string url
}

struct Bugs {
  1: required string url
}

struct License {
  1: required string type,
  2: required string url
}

struct Scripts {
  1: required string test
}

struct Engines {
  1: required string node
}

struct Dependencies {
  1: required string async1,
  2: required string coffeeScript,
  3: required string colors,
  4: required string dateformat,
  5: required string eventemitter2,
  6: required string findupSync,
  7: required string glob,
  8: required string hooker,
  9: required string iconvLite,
  10: required string minimatch,
  11: required string nopt,
  12: required string rimraf,
  13: required string lodash,
  14: required string underscoreString,
  15: required string which,
  16: required string jsYaml,
  17: required string exit,
  18: required string getobject,
  19: required string gruntLegacyUtil,
  20: required string gruntLegacyLog
}

struct DevDependencies {
  1: required string temporary,
  2: required string gruntContribJshint,
  3: required string gruntContribNodeunit,
  4: required string gruntContribWatch,
  5: required string difflet,
  6: required string semver,
  7: required string shelljs
}

struct Main {
  1: required string name,
  2: required string description,
  3: required string version,
  4: required Author author,
  5: required string homepage,
  6: required Repository repository,
  7: required Bugs bugs,
  8: required list<License> licenses,
  9: required string main,
  10: required Scripts scripts,
  11: required Engines engines,
  12: required list<string> keywords,
  13: required Dependencies dependencies,
  14: required DevDependencies devDependencies,
  15: required string readme,
  16: required string _id,
  17: required string _from
}
