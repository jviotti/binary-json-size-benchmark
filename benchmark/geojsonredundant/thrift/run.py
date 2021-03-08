def encode(json, schema):
    payload = schema.Main()
    payload.type = json['type']
    payload.coordinates = json['coordinates']
    return payload

def decode(payload):
    return payload.__dict__
