def encode(json, schema):
    payload = schema.Main()
    payload.extensions = json['extends']
    return payload

def decode(payload):
    return {
        'extends': payload.extensions
    }
