struct Coord {
  1: double lon,
  2: double lat
}

struct Weather {
  1: i16 id,
  2: string main,
  3: string description,
  4: string icon
}

struct MainObject {
  1: double temp,
  2: double feels_like,
  3: double temp_min,
  4: double temp_max,
  5: i16 pressure,
  6: i8 humidity
}

struct Wind {
  1: double speed,
  2: i16 deg
}

struct Clouds {
  1: i8 all
}

struct Sys {
  1: i8 type,
  2: i16 id,
  3: double message,
  4: string country,
  5: i32 sunrise,
  6: i32 sunset
}

struct Main {
  1: Coord coord,
  2: list<Weather> weather,
  3: string base,
  4: MainObject main,
  5: i16 visibility,
  6: Wind wind,
  7: Clouds clouds,
  8: i32 dt,
  9: Sys sys,
  10: i32 timezone,
  11: i32 id,
  12: string name,
  13: i16 cod
}
