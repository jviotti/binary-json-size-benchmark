def encode(json, schema):
    payload = schema.Main()
    payload.rules = schema.Rules()
    payload.rules.noAny = json['rules']['no-any']
    payload.rules.radix = json['rules']['radix']
    payload.rules.orderedImports = schema.OrderedImports()
    payload.rules.orderedImports.options = schema.Options()
    payload.rules.orderedImports.options.groupedImports = \
        json['rules']['ordered-imports']['options']['grouped-imports']
    return payload

def decode(payload):
    return {
      'rules': {
        'no-any': payload.rules.noAny,
        'radix': payload.rules.radix,
        'ordered-imports': {
          'options': {
            'grouped-imports': payload.rules.orderedImports.options.groupedImports
          }
        }
      }
    }
