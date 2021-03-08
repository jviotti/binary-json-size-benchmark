struct Optimization {
  1: required list<string> includes,
  2: required list<string> excludes,
  3: required bool lossy
}

struct Main {
  1: required list<Optimization> optimizations
}
