@0xefdd0578b49e2f8d;

struct Options {
  groupedImports @0 :Bool;
}

struct RuleDefinition {
  options @0 :Options;
}

struct Rules {
  orderedImports @0 :RuleDefinition;
}

struct Main {
  rules @0 :Rules;
}
