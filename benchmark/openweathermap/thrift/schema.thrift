struct Coord {
  1: required double lon,
  2: required double lat
}

struct Weather {
  1: required i16 id,
  2: required string main,
  3: required string description,
  4: required string icon
}

struct MainObject {
  1: required double temp,
  2: required double feels_like,
  3: required double temp_min,
  4: required double temp_max,
  5: required i16 pressure,
  6: required byte humidity
}

struct Wind {
  1: required double speed,
  2: required i16 deg
}

struct Clouds {
  1: required byte all
}

struct Sys {
  1: required byte type,
  2: required i16 id,
  3: required double message,
  4: required string country,
  5: required i32 sunrise,
  6: required i32 sunset
}

struct Main {
  1: required Coord coord,
  2: required list<Weather> weather,
  3: required string base,
  4: required MainObject main,
  5: required i16 visibility,
  6: required Wind wind,
  7: required Clouds clouds,
  8: required i32 dt,
  9: required Sys sys,
  10: required i32 timezone,
  11: required i32 id,
  12: required string name,
  13: required i16 cod
}
