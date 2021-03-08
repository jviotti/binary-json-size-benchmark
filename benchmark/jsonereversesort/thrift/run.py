def encode(json, schema):
    payload = schema.Main()
    payload.let = schema.Let()
    payload.let.x = json['$let']['x']
    payload.in1 = schema.In()
    payload.in1.reverse = schema.Reverse()
    payload.in1.reverse.sort = schema.Sort()
    payload.in1.reverse.sort.eval = json['in']['$reverse']['$sort']['$eval']
    payload.in1.reverse.byX = json['in']['$reverse']['by(x)']
    return payload

def decode(payload):
    return {
      '$let': {
        'x': payload.let.x
      },
      'in': {
        '$reverse': {
          '$sort': { '$eval': payload.in1.reverse.sort.eval },
          'by(x)': payload.in1.reverse.byX
        }
      }
    }
