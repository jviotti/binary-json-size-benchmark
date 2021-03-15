@0x938be325a6440a00;

struct Alert {
  senderName @0 :Text;
  event @1 :Text;
  eventLevel @2 :UInt8;
}

struct Weather {
  temp @0 :Float64;
  windSpeed @1 :Float64;
  windDeg @2 :UInt16;
  precipitationIntensity @3 :Float64;
  dewPoint @4 :Float64;
}

struct RoadRisk {
  dt @0 :UInt32;
  coord @1 :List(Float64);
  weather @2 :Weather;
  alerts @3 :List(Alert);
}

struct Main {
  risks @0 :List(RoadRisk);
}
