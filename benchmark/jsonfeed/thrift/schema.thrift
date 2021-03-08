struct Author {
  1: required string name,
  2: required string url,
  3: required string avatar
}

struct Item {
  1: required string id,
  2: required string url,
  3: required string content_text,
  4: required string date_published
}

struct Main {
  1: required string version,
  2: required string user_comment,
  3: required string title,
  4: required string home_page_url,
  5: required string feed_url,
  6: required Author author,
  7: required list<Item> items
}
