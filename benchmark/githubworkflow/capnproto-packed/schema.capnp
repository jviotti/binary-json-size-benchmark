@0x981f1a0d8ff54878;

struct Environment {
  buildSuiteDir @0 :Text;
}

struct StepWith {
  nodeVersion @0 :Text;
}

struct Step {
  uses @0 :Text;
  with @1 :StepWith;
  name @2 :Text;
  run @3 :Text;
  workingDirectory @4 :Text;
}

struct BuildJob {
  runsOn @0 :Text;
  env @1 :Environment;
  steps @2 :List(Step);
}

struct Jobs {
  build @0 :BuildJob;
}

struct Main {
  name @0 :Text;
  on @1 :List(Text);
  jobs @2 :Jobs;
}
