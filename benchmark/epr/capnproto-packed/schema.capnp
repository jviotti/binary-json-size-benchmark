@0x91d92e1ddbf7c347;

struct Rule {
  path @0 :Text;
  types @1 :List(Text);
  allowData @2 :Bool;
  regex @3 :Text;
}

struct Main {
  site @0 :Text;
  maxAge @1 :UInt32;
  reportUrl @2 :Text;
  defaultNavBehavior @3 :Text;
  defaultResBehavior @4 :Text;
  rules @5 :List(Rule);
}
