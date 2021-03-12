def encode(json, schema):
    payload = schema.Main()
    payload.type = json['type']

    top1 = payload.coordinates.add()
    middle1 = top1.coordinates.add()

    low1 = middle1.coordinates.add()
    low1.coordinates.extend(json['coordinates'][0][0][0])
    low2 = middle1.coordinates.add()
    low2.coordinates.extend(json['coordinates'][0][0][1])
    low3 = middle1.coordinates.add()
    low3.coordinates.extend(json['coordinates'][0][0][2])
    low4 = middle1.coordinates.add()
    low4.coordinates.extend(json['coordinates'][0][0][3])
    low5 = middle1.coordinates.add()
    low5.coordinates.extend(json['coordinates'][0][0][4])

    top2 = payload.coordinates.add()
    middle2 = top2.coordinates.add()

    low6 = middle2.coordinates.add()
    low6.coordinates.extend(json['coordinates'][1][0][0])
    low7 = middle2.coordinates.add()
    low7.coordinates.extend(json['coordinates'][1][0][1])
    low8 = middle2.coordinates.add()
    low8.coordinates.extend(json['coordinates'][1][0][2])
    low9 = middle2.coordinates.add()
    low9.coordinates.extend(json['coordinates'][1][0][3])
    low10 = middle2.coordinates.add()
    low10.coordinates.extend(json['coordinates'][1][0][4])

    middle3 = top2.coordinates.add()

    low11 = middle3.coordinates.add()
    low11.coordinates.extend(json['coordinates'][1][1][0])
    low12 = middle3.coordinates.add()
    low12.coordinates.extend(json['coordinates'][1][1][1])
    low13 = middle3.coordinates.add()
    low13.coordinates.extend(json['coordinates'][1][1][2])
    low14 = middle3.coordinates.add()
    low14.coordinates.extend(json['coordinates'][1][1][3])
    low15 = middle3.coordinates.add()
    low15.coordinates.extend(json['coordinates'][1][1][4])

    return payload

def decode(payload):
    return {
      'type': payload.type,
      'coordinates': [
        [
          [
            list(payload.coordinates[0].coordinates[0].coordinates[0].coordinates),
            list(payload.coordinates[0].coordinates[0].coordinates[1].coordinates),
            list(payload.coordinates[0].coordinates[0].coordinates[2].coordinates),
            list(payload.coordinates[0].coordinates[0].coordinates[3].coordinates),
            list(payload.coordinates[0].coordinates[0].coordinates[4].coordinates)
          ]
        ],
        [
          [
            list(payload.coordinates[1].coordinates[0].coordinates[0].coordinates),
            list(payload.coordinates[1].coordinates[0].coordinates[1].coordinates),
            list(payload.coordinates[1].coordinates[0].coordinates[2].coordinates),
            list(payload.coordinates[1].coordinates[0].coordinates[3].coordinates),
            list(payload.coordinates[1].coordinates[0].coordinates[4].coordinates)
          ],
          [
            list(payload.coordinates[1].coordinates[1].coordinates[0].coordinates),
            list(payload.coordinates[1].coordinates[1].coordinates[1].coordinates),
            list(payload.coordinates[1].coordinates[1].coordinates[2].coordinates),
            list(payload.coordinates[1].coordinates[1].coordinates[3].coordinates),
            list(payload.coordinates[1].coordinates[1].coordinates[4].coordinates)
          ]
        ]
      ]
    }
