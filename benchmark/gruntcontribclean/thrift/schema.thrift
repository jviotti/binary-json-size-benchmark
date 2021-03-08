struct Options {
  1: required bool force,
  2: required bool noWrite
}

struct Files {}

struct MainOptions {
  1: required Files files,
  2: required list<string> src
}

struct Main {
  1: required list<string> foo,
  2: required MainOptions main,
  3: required Options options
}
