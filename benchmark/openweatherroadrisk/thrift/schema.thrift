struct Alert {
  1: string sender_name,
  2: string event,
  3: byte event_level
}

struct Weather {
  1: double temp,
  2: double wind_speed,
  3: i16 wind_deg,
  4: double precipitation_intensity,
  5: double dew_point
}

struct RoadRisk {
  1: i32 dt,
  2: list<double> coord,
  3: Weather weather,
  4: list<Alert> alerts
}

struct Main {
  1: list<RoadRisk> risks
}
