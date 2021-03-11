def encode(json, schema):
    payload = schema.Main()

    payload.risks = [ schema.RoadRisk(), schema.RoadRisk() ]

    payload.risks[0].dt = json[0]['dt']
    payload.risks[0].coord = json[0]['coord']
    payload.risks[0].weather = schema.Weather()
    payload.risks[0].weather.temp = json[0]['weather']['temp']
    payload.risks[0].weather.wind_speed = json[0]['weather']['wind_speed']
    payload.risks[0].weather.wind_deg = json[0]['weather']['wind_deg']
    payload.risks[0].weather.precipitation_intensity = json[0]['weather']['precipitation_intensity']
    payload.risks[0].weather.dew_point = json[0]['weather']['dew_point']

    payload.risks[0].alerts = [ schema.Alert() ]
    payload.risks[0].alerts[0].sender_name = json[0]['alerts'][0]['sender_name']
    payload.risks[0].alerts[0].event = json[0]['alerts'][0]['event']
    payload.risks[0].alerts[0].event_level = json[0]['alerts'][0]['event_level']

    payload.risks[1].dt = json[1]['dt']
    payload.risks[1].coord = json[1]['coord']
    payload.risks[1].weather = schema.Weather()
    payload.risks[1].weather.temp = json[1]['weather']['temp']
    payload.risks[1].weather.wind_speed = json[1]['weather']['wind_speed']
    payload.risks[1].weather.wind_deg = json[1]['weather']['wind_deg']
    payload.risks[1].weather.dew_point = json[1]['weather']['dew_point']
    payload.risks[1].alerts = []

    return payload

def decode(payload):
  return [
    {
      'dt': payload.risks[0].dt,
      'coord': payload.risks[0].coord,
      'weather': {
        'temp': payload.risks[0].weather.temp,
        'wind_speed': payload.risks[0].weather.wind_speed,
        'wind_deg': payload.risks[0].weather.wind_deg,
        'precipitation_intensity': \
            payload.risks[0].weather.precipitation_intensity,
        'dew_point': payload.risks[0].weather.dew_point
      },
      'alerts': [
        {
          'sender_name': payload.risks[0].alerts[0].sender_name,
          'event': payload.risks[0].alerts[0].event,
          'event_level': payload.risks[0].alerts[0].event_level
        }
      ]
    },
    {
      'dt': payload.risks[1].dt,
      'coord': payload.risks[1].coord,
      'weather': {
        'temp': payload.risks[1].weather.temp,
        'wind_speed': payload.risks[1].weather.wind_speed,
        'wind_deg': payload.risks[1].weather.wind_deg,
        'dew_point': payload.risks[1].weather.dew_point
      },
      'alerts': payload.risks[1].alerts
    }
  ]
