@0xd95514b9865ada8d;

struct Options {
  groupedImports @0 :Bool;
}

struct RuleDefinition {
  options @0 :Options;
}

struct Rules {
  noAny @0 :List(Bool);
  radix @1 :List(Bool);
  orderedImports @2 :RuleDefinition;
}

struct Main {
  rules @0 :Rules;
}
