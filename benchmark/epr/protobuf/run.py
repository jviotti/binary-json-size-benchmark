def encode(json, schema):
    payload = schema.Main()

    payload.site = json['site']
    payload.maxAge = json['maxAge']
    payload.reportUrl = json['reportUrl']
    payload.defaultNavBehavior = json['defaultNavBehavior']
    payload.defaultResBehavior = json['defaultResBehavior']

    rule1 = payload.rules.add()
    rule2 = payload.rules.add()
    rule3 = payload.rules.add()
    rule4 = payload.rules.add()
    rule5 = payload.rules.add()

    rule1.path = json['rules'][0]['path']
    rule1.types.extend(json['rules'][0]['types'])
    rule1.allowData = json['rules'][0]['allowData']

    rule2.regex = json['rules'][1]['regex']
    rule2.types.extend(json['rules'][1]['types'])
    rule2.allowData = json['rules'][1]['allowData']

    rule3.path = json['rules'][2]['path']
    rule3.types.extend(json['rules'][2]['types'])
    rule3.allowData = json['rules'][2]['allowData']

    rule4.regex = json['rules'][3]['regex']
    rule4.types.extend(json['rules'][3]['types'])
    rule4.allowData = json['rules'][3]['allowData']

    rule5.regex = json['rules'][4]['regex']
    rule5.types.extend(json['rules'][4]['types'])
    rule5.allowData = json['rules'][4]['allowData']

    return payload

def decode(payload):
    return {
        'site': payload.site,
        'maxAge': payload.maxAge,
        'reportUrl': payload.reportUrl,
        'defaultNavBehavior': payload.defaultNavBehavior,
        'defaultResBehavior': payload.defaultResBehavior,
        'rules': [
            {
                'path': payload.rules[0].path,
                'types': payload.rules[0].types._values,
                'allowData': payload.rules[0].allowData,
            },
            {
                'regex': payload.rules[1].regex,
                'types': payload.rules[1].types._values,
                'allowData': payload.rules[1].allowData,
            },
            {
                'path': payload.rules[2].path,
                'types': payload.rules[2].types._values,
                'allowData': payload.rules[2].allowData,
            },
            {
                'regex': payload.rules[3].regex,
                'types': payload.rules[3].types._values,
                'allowData': payload.rules[3].allowData,
            },
            {
                'regex': payload.rules[4].regex,
                'types': payload.rules[4].types._values,
                'allowData': payload.rules[4].allowData,
            }
        ]
    }
