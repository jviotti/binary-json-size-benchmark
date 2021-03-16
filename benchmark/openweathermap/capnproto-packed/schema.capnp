@0xcef803a4c9200480;

struct Coord {
  lon @0 :Float64;
  lat @1 :Float64;
}

struct Weather {
  id @0 :UInt32;
  main @1 :Text;
  description @2 :Text;
  icon @3 :Text;
}

struct MainObject {
  temp @0 :Float64;
  feelsLike @1 :Float64;
  tempMin @2 :Float64;
  tempMax @3 :Float64;
  pressure @4 :UInt32;
  humidity @5 :UInt32;
}

struct Wind {
  speed @0 :Float32;
  deg @1 :UInt32;
}

struct Clouds {
  all @0 :UInt32;
}

struct Sys {
  type @0 :UInt32;
  id @1 :UInt32;
  message @2 :Float64;
  country @3 :Text;
  sunrise @4 :UInt32;
  sunset @5 :UInt32;
}

struct Main {
  coord @0 :Coord;
  weather @1 :List(Weather);
  base @2 :Text;
  main @3 :MainObject;
  visibility @4 :UInt32;
  wind @5 :Wind;
  clouds @6 :Clouds;
  dt @7 :UInt32;
  sys @8 :Sys;
  timezone @9 :Int32;
  id @10 :UInt32;
  name @11 :Text;
  cod @12 :UInt32;
}
