@0x9fc8471cc37eb11a;

struct Location {
  address @0 :Text;
  postalCode @1 :Text;
  city @2 :Text;
  countryCode @3 :Text;
  region @4 :Text;
}

struct Profile {
  network @0 :Text;
  username @1 :Text;
  url @2 :Text;
}

struct Basics {
  name @0 :Text;
  label @1 :Text;
  picture @2 :Text;
  email @3 :Text;
  phone @4 :Text;
  website @5 :Text;
  summary @6 :Text;
  location @7 :Location;
  profiles @8 :List(Profile);
}

struct Work {
  company @0 :Text;
  position @1 :Text;
  website @2 :Text;
  startDate @3 :Text;
  endDate @4 :Text;
  summary @5 :Text;
  highlights @6 :List(Text);
}

struct Volunteer {
  organization @0 :Text;
  position @1 :Text;
  website @2 :Text;
  startDate @3 :Text;
  endDate @4 :Text;
  summary @5 :Text;
  highlights @6 :List(Text);
}

struct Education {
  institution @0 :Text;
  area @1 :Text;
  studyType @2 :Text;
  startDate @3 :Text;
  endDate @4 :Text;
  gpa @5 :Text;
  courses @6 :List(Text);
}

struct Award {
  title @0 :Text;
  date @1 :Text;
  awarder @2 :Text;
  summary @3 :Text;
}

struct Publication {
  name @0 :Text;
  publisher @1 :Text;
  releaseDate @2 :Text;
  website @3 :Text;
  summary @4 :Text;
}

struct Skill {
  name @0 :Text;
  level @1 :Text;
  keywords @2 :List(Text);
}

struct Language {
  language @0 :Text;
  fluency @1 :Text;
}

struct Interest {
  name @0 :Text;
  keywords @1 :List(Text);
}

struct Reference {
  name @0 :Text;
  reference @1 :Text;
}

struct Main {
  basics @0 :Basics;
  work @1 :List(Work);
  volunteer @2 :List(Volunteer);
  education @3 :List(Education);
  awards @4 :List(Award);
  publications @5 :List(Publication);
  skills @6 :List(Skill);
  languages @7 :List(Language);
  interests @8 :List(Interest);
  references @9 :List(Reference);
}
