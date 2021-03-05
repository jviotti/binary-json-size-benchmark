def encode(json, schema):
    payload = schema.Main()
    payload.defaultIgnores = json['defaultIgnores']
    return payload

def decode(payload):
    return payload.__dict__
