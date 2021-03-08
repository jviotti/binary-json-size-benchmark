def encode(json, schema):
    payload = schema.Main()
    payload.sort = json['$sort']
    payload.byX = json['by(x)']
    return payload

def decode(payload):
    return payload.__dict__
