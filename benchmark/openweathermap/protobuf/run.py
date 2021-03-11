def encode(json, schema):
    payload = schema.Main()
    payload.coord.lon = json['coord']['lon']
    payload.coord.lat = json['coord']['lat']

    weather1 = payload.weather.add()
    weather1.id = json['weather'][0]['id']
    weather1.main = json['weather'][0]['main']
    weather1.description = json['weather'][0]['description']
    weather1.icon = json['weather'][0]['icon']

    payload.base = json['base']

    payload.main.temp = json['main']['temp']
    payload.main.feels_like = json['main']['feels_like']
    payload.main.temp_min = json['main']['temp_min']
    payload.main.temp_max = json['main']['temp_max']
    payload.main.pressure = json['main']['pressure']
    payload.main.humidity = json['main']['humidity']

    payload.visibility = json['visibility']

    payload.wind.speed = json['wind']['speed']
    payload.wind.deg = json['wind']['deg']

    payload.clouds.all = json['clouds']['all']
    payload.dt = json['dt']

    payload.sys.type = json['sys']['type']
    payload.sys.id = json['sys']['id']
    payload.sys.message = json['sys']['message']
    payload.sys.country = json['sys']['country']
    payload.sys.sunrise = json['sys']['sunrise']
    payload.sys.sunset = json['sys']['sunset']

    payload.timezone = json['timezone']
    payload.id = json['id']
    payload.name = json['name']
    payload.cod = json['cod']

    return payload

def decode(payload):
    return {
      'coord': {
        'lon': payload.coord.lon,
        'lat': payload.coord.lat
      },
      'weather': [
        {
          'id': payload.weather[0].id,
          'main': payload.weather[0].main,
          'description': payload.weather[0].description,
          'icon': payload.weather[0].icon
        }
      ],
      'base': payload.base,
      'main': {
        'temp': payload.main.temp,
        'feels_like': payload.main.feels_like,
        'temp_min': payload.main.temp_min,
        'temp_max': payload.main.temp_max,
        'pressure': payload.main.pressure,
        'humidity': payload.main.humidity
      },
      'visibility': payload.visibility,
      'wind': {
        'speed': payload.wind.speed,
        'deg': payload.wind.deg
      },
      'clouds': {
        'all': payload.clouds.all
      },
      'dt': payload.dt,
      'sys': {
        'type': payload.sys.type,
        'id': payload.sys.id,
        'message': payload.sys.message,
        'country': payload.sys.country,
        'sunrise': payload.sys.sunrise,
        'sunset': payload.sys.sunset
      },
      'timezone': payload.timezone,
      'id': payload.id,
      'name': payload.name,
      'cod': payload.cod
    }
