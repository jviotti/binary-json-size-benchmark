@0xdda3f31035b985d2;

struct Author {
  name @0 :Text;
  url @1 :Text;
}

struct Repository {
  type @0 :Text;
  url @1 :Text;
}

struct Bugs {
  url @0 :Text;
}

struct License {
  type @0 :Text;
  url @1 :Text;
}

struct Scripts {
  test @0 :Text;
}

struct Engines {
  node @0 :Text;
}

struct Dependencies {
  async @0 :Text;
  coffeeScript @1 :Text;
  colors @2 :Text;
  dateformat @3 :Text;
  eventemitter2 @4 :Text;
  findupSync @5 :Text;
  glob @6 :Text;
  hooker @7 :Text;
  iconvLite @8 :Text;
  minimatch @9 :Text;
  nopt @10 :Text;
  rimraf @11 :Text;
  lodash @12 :Text;
  underscoreString @13 :Text;
  which @14 :Text;
  jsYaml @15 :Text;
  exit @16 :Text;
  getobject @17 :Text;
  gruntLegacyUtil @18 :Text;
  gruntLegacyLog @19 :Text;
}

struct DevDependencies {
  temporary @0 :Text;
  gruntContribJshint @1 :Text;
  gruntContribNodeunit @2 :Text;
  gruntContribWatch @3 :Text;
  difflet @4 :Text;
  semver @5 :Text;
  shelljs @6 :Text;
}

struct Main {
  name @0 :Text;
  description @1 :Text;
  version @2 :Text;
  author @3 :Author;
  homepage @4 :Text;
  repository @5 :Repository;
  bugs @6 :Bugs;
  licenses @7 :List(License);
  main @8 :Text;
  scripts @9 :Scripts;
  engines @10 :Engines;
  keywords @11 :List(Text);
  dependencies @12 :Dependencies;
  devDependencies @13 :DevDependencies;
  readme @14 :Text;
  id @15 :Text;
  from @16 :Text;
}
