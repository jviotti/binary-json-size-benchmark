def encode(json, schema):
    payload = schema.Main()
    payload.github = json['github']
    payload.patreon = json['patreon'] or 0
    payload.open_collective = json['open_collective'] or 0
    payload.ko_fi = json['ko_fi'] or 0
    payload.tidelift = json['tidelift'] or 0
    payload.community_bridge = json['community_bridge'] or 0
    payload.liberapay = json['liberapay'] or 0
    payload.issuehunt = json['issuehunt'] or 0
    payload.otechie = json['otechie'] or 0
    payload.custom = json['custom'] or 0
    return payload

def decode(payload):
    return {
      'github': payload.github,
      'patreon': payload.patreon or None,
      'open_collective': payload.open_collective or None,
      'ko_fi': payload.ko_fi or None,
      'tidelift': payload.tidelift or None,
      'community_bridge': payload.community_bridge or None,
      'liberapay': payload.liberapay or None,
      'issuehunt': payload.issuehunt or None,
      'otechie': payload.otechie or None,
      'custom': payload.custom or None
    }
