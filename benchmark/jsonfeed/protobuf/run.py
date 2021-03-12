def encode(json, schema):
    payload = schema.Main()

    payload.version = json['version']
    payload.user_comment = json['user_comment']
    payload.title = json['title']
    payload.home_page_url = json['home_page_url']
    payload.feed_url = json['feed_url']
    payload.author.name = json['author']['name']
    payload.author.url = json['author']['url']
    payload.author.avatar = json['author']['avatar']

    item1 = payload.items.add()
    item1.id = json['items'][0]['id']
    item1.url = json['items'][0]['url']
    item1.content_text = json['items'][0]['content_text']
    item1.date_published = json['items'][0]['date_published']

    return payload

def decode(payload):
    return {
      'version': payload.version,
      'user_comment': payload.user_comment,
      'title': payload.title,
      'home_page_url': payload.home_page_url,
      'feed_url': payload.feed_url,
      'author': {
        'name': payload.author.name,
        'url': payload.author.url,
        'avatar': payload.author.avatar
      },
      'items': [
        {
          'id': payload.items[0].id,
          'url': payload.items[0].url,
          'content_text': payload.items[0].content_text,
          'date_published': payload.items[0].date_published
        }
      ]
    }
