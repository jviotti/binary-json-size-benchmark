@0x88d9ae391354ea9d;

struct Author {
  name @0 :Text;
  url @1 :Text;
  avatar @2 :Text;
}

struct Item {
  id @0 :Text;
  url @1 :Text;
  contentText @2 :Text;
  datePublished @3 :Text;
}

struct Main {
  version @0 :Text;
  userComment @1 :Text;
  title @2 :Text;
  homePageUrl @3 :Text;
  feedUrl @4 :Text;
  author @5 :Author;
  items @6 :List(Item);
}
