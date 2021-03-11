def encode(json, schema):
    payload = schema.Main()
    payload.cjs = json['cjs']
    payload.mainFields.extend(json['mainFields'])
    payload.mode = json['mode']
    payload.force = json['force']
    payload.cache = json['cache']
    payload.sourceMap = json['sourceMap']
    return payload

def decode(payload):
    return {
      'cjs': payload.cjs,
      'mainFields': payload.mainFields._values,
      'mode': payload.mode,
      'force': payload.force,
      'cache': payload.cache,
      'sourceMap': payload.sourceMap
    }
