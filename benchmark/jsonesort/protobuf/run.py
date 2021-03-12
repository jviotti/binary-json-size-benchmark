def encode(json, schema):
    payload = schema.Main()
    payload.sort.extend(json['$sort'])
    payload.byX = json['by(x)']
    return payload

def decode(payload):
    return {
        '$sort': list(payload.sort),
        'by(x)': payload.byX
    }

