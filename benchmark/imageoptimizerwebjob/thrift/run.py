def encode(json, schema):
    payload = schema.Main()
    payload.optimizations = [ schema.Optimization() ]
    payload.optimizations[0].includes = json['optimizations'][0]['includes']
    payload.optimizations[0].excludes = json['optimizations'][0]['excludes']
    payload.optimizations[0].lossy = json['optimizations'][0]['lossy']
    return payload

def decode(payload):
    return {
        'optimizations': [
            payload.optimizations[0].__dict__
        ]
    }
