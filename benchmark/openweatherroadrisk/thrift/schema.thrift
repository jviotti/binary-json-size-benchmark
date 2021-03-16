struct Alert {
  1: required string sender_name,
  2: required string event,
  3: required byte event_level
}

struct Weather {
  1: required double temp,
  2: required double wind_speed,
  3: required i16 wind_deg,
  4: optional double precipitation_intensity,
  5: required double dew_point
}

struct RoadRisk {
  1: required i32 dt,
  2: required list<double> coord,
  3: required Weather weather,
  4: required list<Alert> alerts
}

struct Main {
  1: required list<RoadRisk> risks
}
