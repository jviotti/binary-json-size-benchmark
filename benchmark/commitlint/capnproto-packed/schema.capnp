@0xa476794e2c3b425d;

struct Rule {
  level @0 :UInt8;
  when @1 :Text;
  options @2 :List(Text);
}

struct Rules {
  scopeCase @0 :Rule;
  subjectCase @1 :Rule;
}

struct Main {
  rules @0 :Rules;
}
