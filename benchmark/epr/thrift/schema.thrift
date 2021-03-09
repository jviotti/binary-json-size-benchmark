struct Rule {
  1: optional string path,
  2: optional string regex,
  3: required list<string> types,
  4: required bool allowData
}

struct Main {
  1: required string site,
  2: required i32 maxAge,
  3: required string reportUrl,
  4: required string defaultNavBehavior,
  5: required string defaultResBehavior,
  6: required list<Rule> rules
}
