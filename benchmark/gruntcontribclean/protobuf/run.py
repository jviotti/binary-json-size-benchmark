def encode(json, schema):
    payload = schema.Main()
    payload.foo.extend(json['foo'])
    payload.main.src.extend(json['main']['src'])
    payload.options.force = json['options']['force']
    payload.options.noWrite = json['options']['no-write']
    return payload

def decode(payload):
    return {
        'foo': payload.foo._values,
        'main': {
            'files': dict(zip(payload.main.files.ListFields(), [])),
            'src': payload.main.src._values
        },
        'options': {
            'force': payload.options.force,
            'no-write': payload.options.noWrite
        }
    }
