@0x942fc5c1a229ee99;

struct Parameters {
  a @0 :List(UInt8);
}

struct Matrix {
  parameters @0 :Parameters;
}

struct M1 {
  matrix @0 :Matrix;
}

struct Job {
  m1 @0 :M1;
}

struct TestWorkflow {
  jobs @0 :List(Job);
}

struct Workflows {
  test @0 :TestWorkflow;
}

struct Main {
  version @0 :Float64;
  workflows @1 :Workflows;
}
