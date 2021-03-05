def encode(json, schema):
    payload = schema.Main()
    payload.version = json['version']
    return payload
