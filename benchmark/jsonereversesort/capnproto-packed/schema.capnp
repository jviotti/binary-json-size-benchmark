@0xff837944f132bcd2;

struct LetDefinition {
  x @0 :List(UInt8);
}

struct Main {
  let @0 :LetDefinition;
  in @1 :Main;
  reverse @2 :Main;
  sort @3 :Main;
  byX @4 :Text;
  eval @5 :Text;
}
