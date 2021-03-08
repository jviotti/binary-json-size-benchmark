def encode(json, schema):
    payload = schema.Main()
    payload.coord = schema.Coord()
    payload.coord.lon = json['coord']['lon']
    payload.coord.lat = json['coord']['lat']

    payload.weather = [ schema.Weather() ]
    payload.weather[0].id = json['weather'][0]['id']
    payload.weather[0].main = json['weather'][0]['main']
    payload.weather[0].description = json['weather'][0]['description']
    payload.weather[0].icon = json['weather'][0]['icon']

    payload.base = json['base']

    payload.main = schema.MainObject()
    payload.main.temp = json['main']['temp']
    payload.main.feels_like = json['main']['feels_like']
    payload.main.temp_min = json['main']['temp_min']
    payload.main.temp_max = json['main']['temp_max']
    payload.main.pressure = json['main']['pressure']
    payload.main.humidity = json['main']['humidity']

    payload.visibility = json['visibility']

    payload.wind = schema.Wind()
    payload.wind.speed = json['wind']['speed']
    payload.wind.deg = json['wind']['deg']

    payload.clouds = schema.Clouds()
    payload.clouds.all = json['clouds']['all']
    payload.dt = json['dt']

    payload.sys = schema.Sys()
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
      'coord': payload.coord.__dict__,
      'weather': [
        payload.weather[0].__dict__
      ],
      'base': payload.base,
      'main': payload.main.__dict__,
      'visibility': payload.visibility,
      'wind': payload.wind.__dict__,
      'clouds': payload.clouds.__dict__,
      'dt': payload.dt,
      'sys': payload.sys.__dict__,
      'timezone': payload.timezone,
      'id': payload.id,
      'name': payload.name,
      'cod': payload.cod
    }
