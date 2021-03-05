def encode(json, schema):
    payload = schema.Main()
    payload.rules = schema.Rules()
    payload.rules.scopeCase = [
        schema.Rule(),
        schema.Rule(),
        schema.Rule()
    ]

    payload.rules.scopeCase[0].numeric = json['rules']['scope-case'][0]
    payload.rules.scopeCase[1].textual = json['rules']['scope-case'][1]
    payload.rules.scopeCase[2].multitextual = json['rules']['scope-case'][2]

    payload.rules.subjectCase = [
        schema.Rule(),
        schema.Rule(),
        schema.Rule()
    ]

    payload.rules.subjectCase[0].numeric = json['rules']['subject-case'][0]
    payload.rules.subjectCase[1].textual = json['rules']['subject-case'][1]
    payload.rules.subjectCase[2].multitextual = json['rules']['subject-case'][2]

    return payload

def decode(payload):
    return {
        'rules': {
            'scope-case': [
                payload.rules.scopeCase[0].numeric,
                payload.rules.scopeCase[1].textual,
                payload.rules.scopeCase[2].multitextual
            ],
            'subject-case': [
                payload.rules.subjectCase[0].numeric,
                payload.rules.subjectCase[1].textual,
                payload.rules.subjectCase[2].multitextual
            ]
        }
    }
