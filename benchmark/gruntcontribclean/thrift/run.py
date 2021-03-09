def encode(json, schema):
    payload = schema.Main()
    payload.foo = json['foo']
    payload.main = schema.MainOptions()
    payload.main.files = schema.Files()
    payload.main.src = json['main']['src']
    payload.options = schema.Options()
    payload.options.force = json['options']['force']
    payload.options.noWrite = json['options']['no-write']
    return payload

def decode(payload):
    return {
        'foo': payload.foo,
        'main': {
            'files': payload.main.files.__dict__,
            'src': payload.main.src
        },
        'options': {
            'force': payload.options.force,
            'no-write': payload.options.noWrite
        }
    }
