def encode(json, schema):
    payload = schema.Main()
    payload.sort.extend(json['$sort'])
    payload.byX = json['by(x)']
    return payload

def decode(payload):
    return {
        '$sort': payload.sort._values,
        'by(x)': payload.byX
    }

