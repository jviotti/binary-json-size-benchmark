def encode(json, schema):
    payload = schema.Main()

    payload.notifications.campfire.secure = \
            json['notifications']['campfire']['secure']

    payload.notifications.irc.secure = \
            json['notifications']['irc']['secure']

    payload.notifications.flowdock.secure = \
            json['notifications']['flowdock']['secure']

    payload.notifications.hipchat.secure = \
            json['notifications']['hipchat']['secure']

    payload.notifications.slack.secure = \
            json['notifications']['slack']['secure']

    payload.notifications.webhooks.secure = \
            json['notifications']['webhooks']['secure']

    payload.notifications.email.secure = \
            json['notifications']['email']['secure']

    return payload

def decode(payload):
    return {
      'notifications': {
        'campfire': {
          'secure': payload.notifications.campfire.secure
        },
        'irc': {
          'secure': payload.notifications.irc.secure
        },
        'flowdock': {
          'secure': payload.notifications.flowdock.secure
        },
        'hipchat': {
          'secure': payload.notifications.hipchat.secure
        },
        'slack': {
          'secure': payload.notifications.slack.secure
        },
        'webhooks': {
          'secure': payload.notifications.webhooks.secure
        },
        'email': {
          'secure': payload.notifications.email.secure
        }
      }
    }
