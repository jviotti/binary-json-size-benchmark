def encode(json, schema):
    payload = schema.Main()
    payload.defaultIgnores = json['defaultIgnores']
    return payload

def decode(payload):
    return {
        'defaultIgnores': payload.defaultIgnores
    }
