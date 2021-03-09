union Rule {
  1: string textual,
  2: byte numeric,
  3: list<string> multitextual
}

struct Rules {
  1: required list<Rule> scopeCase,
  2: required list<Rule> subjectCase
}

struct Main {
  1: required Rules rules
}
