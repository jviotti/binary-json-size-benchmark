def encode(json, schema):
    payload = schema.Main()
    payload.github = json['github']
    payload.patreon = json['patreon']
    payload.open_collective = json['open_collective']
    payload.ko_fi = json['ko_fi']
    payload.tidelift = json['tidelift']
    payload.community_bridge = json['community_bridge']
    payload.liberapay = json['liberapay']
    payload.issuehunt = json['issuehunt']
    payload.otechie = json['otechie']
    payload.custom = json['custom']
    return payload

def decode(payload):
    return payload.__dict__
