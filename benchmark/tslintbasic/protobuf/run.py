def encode(json, schema):
    payload = schema.Main()
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
