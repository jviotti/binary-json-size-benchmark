struct Options {
  1: required bool groupedImports
}

struct OrderedImports {
  1: required Options options
}

struct Rules {
  1: required list<bool> noAny,
  2: required list<bool> radix,
  3: required OrderedImports orderedImports
}

struct Main {
  1: required Rules rules
}
