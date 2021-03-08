def encode(json, schema):
    payload = schema.Main()

    payload.site = json['site']
    payload.maxAge = json['maxAge']
    payload.reportUrl = json['reportUrl']
    payload.defaultNavBehavior = json['defaultNavBehavior']
    payload.defaultResBehavior = json['defaultResBehavior']

    payload.rules = [
        schema.Rule(),
        schema.Rule(),
        schema.Rule(),
        schema.Rule(),
        schema.Rule()
    ]

    payload.rules[0].path = json['rules'][0]['path']
    payload.rules[0].types = json['rules'][0]['types']
    payload.rules[0].allowData = json['rules'][0]['allowData']

    payload.rules[1].regex = json['rules'][1]['regex']
    payload.rules[1].types = json['rules'][1]['types']
    payload.rules[1].allowData = json['rules'][1]['allowData']

    payload.rules[2].path = json['rules'][2]['path']
    payload.rules[2].types = json['rules'][2]['types']
    payload.rules[2].allowData = json['rules'][2]['allowData']

    payload.rules[3].regex = json['rules'][3]['regex']
    payload.rules[3].types = json['rules'][3]['types']
    payload.rules[3].allowData = json['rules'][3]['allowData']

    payload.rules[4].regex = json['rules'][4]['regex']
    payload.rules[4].types = json['rules'][4]['types']
    payload.rules[4].allowData = json['rules'][4]['allowData']

    return payload

def decode(payload):
    return {
        'site': payload.site,
        'maxAge': payload.maxAge,
        'reportUrl': payload.reportUrl,
        'defaultNavBehavior': payload.defaultNavBehavior,
        'defaultResBehavior': payload.defaultResBehavior,
        'rules': [
            {x:y for x,y in payload.rules[0].__dict__.items() if y != None},
            {x:y for x,y in payload.rules[1].__dict__.items() if y != None},
            {x:y for x,y in payload.rules[2].__dict__.items() if y != None},
            {x:y for x,y in payload.rules[3].__dict__.items() if y != None},
            {x:y for x,y in payload.rules[4].__dict__.items() if y != None}
        ]
    }
