@0xb0894a9551aff3ef;

struct Files {}

struct MainOptions {
  files @0 :Files;
  src @1 :List(Text);
}

struct Options {
  force @0 :Bool;
  noWrite @1 :Bool;
}

struct Main {
  foo @0 :List(Text);
  main @1 :MainOptions;
  options @2 :Options;
}
