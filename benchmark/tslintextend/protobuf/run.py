def encode(json, schema):
    payload = schema.Main()
    payload.extensions.extend(json['extends'])
    return payload

def decode(payload):
    return {
        'extends': list(payload.extensions)
    }
