def encode(json, schema):
    payload = schema.Main()
    payload.general = json['general']
    payload.stages = json['stages']
    payload.steps = json['steps']
    return payload

def decode(payload):
    return payload.__dict__
