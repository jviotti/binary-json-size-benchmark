struct Let {
  1: required list<byte> x
}

struct Sort {
  1: required string eval
}

struct Reverse {
  1: required Sort sort,
  2: required string byX
}

struct In {
  1: required Reverse reverse
}

struct Main {
  1: required Let let,
  2: required In in1
}
