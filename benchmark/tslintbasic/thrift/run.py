def encode(json, schema):
    payload = schema.Main()
    payload.rules = schema.Rules()
    payload.rules.orderedImports = schema.OrderedImports()
    payload.rules.orderedImports.options = schema.Options()
    payload.rules.orderedImports.options.groupedImports = \
        json['rules']['ordered-imports']['options']['grouped-imports']
    return payload

def decode(payload):
    return {
      'rules': {
        'ordered-imports': {
          'options': {
            'grouped-imports': payload.rules.orderedImports.options.groupedImports
          }
        }
      }
    }
