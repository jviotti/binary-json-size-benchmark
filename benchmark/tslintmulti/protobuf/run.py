def encode(json, schema):
    payload = schema.Main()
    payload.rules.noAny.extend(json['rules']['no-any'])
    payload.rules.radix.extend(json['rules']['radix'])
    payload.rules.orderedImports.options.groupedImports = \
        json['rules']['ordered-imports']['options']['grouped-imports']
    return payload

def decode(payload):
    return {
      'rules': {
        'no-any': list(payload.rules.noAny),
        'radix': list(payload.rules.radix),
        'ordered-imports': {
          'options': {
            'grouped-imports': payload.rules.orderedImports.options.groupedImports
          }
        }
      }
    }
