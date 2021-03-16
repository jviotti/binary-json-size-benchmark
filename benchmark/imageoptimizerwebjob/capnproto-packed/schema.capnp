@0x9ee4f99ecfa023cf;

struct Optimization {
  includes @0 :List(Text);
  excludes @1 :List(Text);
  lossy @2 :Bool;
}

struct Main {
  optimizations @0 :List(Optimization);
}
