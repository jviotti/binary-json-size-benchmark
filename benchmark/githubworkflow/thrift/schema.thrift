struct Environment {
  1: required string buildSuiteDir
}

struct With {
  1: required string nodeVersion
}

struct Step {
  1: optional string uses,
  2: optional string run,
  3: optional string workingDirectory,
  4: optional With with1,
  5: optional string name
}

struct Build {
  1: required string runsOn,
  2: required Environment env,
  3: required list<Step> steps
}

struct Jobs {
  1: required Build build
}

struct Main {
  1: required string name,
  2: required list<string> on,
  3: required Jobs jobs
}
