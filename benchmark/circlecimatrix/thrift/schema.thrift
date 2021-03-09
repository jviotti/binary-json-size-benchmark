struct Parameters {
  1: required list<byte> a
}

struct Matrix {
  1: required Parameters parameters
}

struct M1 {
  1: required Matrix matrix
}

struct Job {
  1: required M1 m1
}

struct TestWorkflow {
  1: required list<Job> jobs
}

struct Workflows {
  1: required TestWorkflow test
}

struct Main {
  1: required double version,
  2: required Workflows workflows
}
