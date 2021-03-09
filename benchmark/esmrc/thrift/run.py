def encode(json, schema):
    payload = schema.Main()
    payload.cjs = json['cjs']
    payload.mainFields = json['mainFields']
    payload.mode = json['mode']
    payload.force = json['force']
    payload.cache = json['cache']
    payload.sourceMap = json['sourceMap']
    return payload

def decode(payload):
    return payload.__dict__
