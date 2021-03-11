def encode(json, schema):
    payload = schema.Main()
    payload.let.x.extend(json['$let']['x'])
    payload.in1.reverse.sort.eval = json['in']['$reverse']['$sort']['$eval']
    payload.in1.reverse.byX = json['in']['$reverse']['by(x)']
    return payload

def decode(payload):
    return {
      '$let': {
        'x': payload.let.x._values
      },
      'in': {
        '$reverse': {
          '$sort': { '$eval': payload.in1.reverse.sort.eval },
          'by(x)': payload.in1.reverse.byX
        }
      }
    }
