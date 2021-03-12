def encode(json, schema):
    payload = schema.Main()

    scope1 = payload.rules.scopeCase.add()
    scope2 = payload.rules.scopeCase.add()
    scope3 = payload.rules.scopeCase.add()

    scope1.level = json['rules']['scope-case'][0]
    scope2.when = json['rules']['scope-case'][1]
    scope3.options.values.extend(json['rules']['scope-case'][2])

    subject1 = payload.rules.subjectCase.add()
    subject2 = payload.rules.subjectCase.add()
    subject3 = payload.rules.subjectCase.add()

    subject1.level = json['rules']['subject-case'][0]
    subject2.when = json['rules']['subject-case'][1]
    subject3.options.values.extend(json['rules']['subject-case'][2])

    return payload

def decode(payload):
    return {
        'rules': {
            'scope-case': [
                payload.rules.scopeCase[0].level,
                payload.rules.scopeCase[1].when,
                list(payload.rules.scopeCase[2].options.values)
            ],
            'subject-case': [
                payload.rules.subjectCase[0].level,
                payload.rules.subjectCase[1].when,
                list(payload.rules.subjectCase[2].options.values)
            ]
        }
    }
