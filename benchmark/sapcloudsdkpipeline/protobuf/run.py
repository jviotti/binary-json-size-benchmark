def encode(json, schema):
    payload = schema.Main()
    payload.general = json['general'] or 0
    payload.stages = json['stages'] or 0
    payload.steps = json['steps'] or 0
    return payload

def decode(payload):
    return {
        'general': payload.general or None,
        'stages': payload.general or None,
        'steps': payload.general or None
    }
