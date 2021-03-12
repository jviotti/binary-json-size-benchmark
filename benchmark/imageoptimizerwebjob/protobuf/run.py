def encode(json, schema):
    payload = schema.Main()
    optimization1 = payload.optimizations.add()
    optimization1.includes.extend(json['optimizations'][0]['includes'])
    optimization1.excludes.extend(json['optimizations'][0]['excludes'])
    optimization1.lossy = json['optimizations'][0]['lossy']
    return payload

def decode(payload):
    return {
        'optimizations': [
            {
              'includes': list(payload.optimizations[0].includes),
              'excludes': list(payload.optimizations[0].excludes),
              'lossy': payload.optimizations[0].lossy
            }
        ]
    }
