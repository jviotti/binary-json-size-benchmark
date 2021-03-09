def encode(json, schema):
    payload = schema.Main()
    payload.version = json['version']
    return payload

def decode(payload):
    return payload.__dict__
