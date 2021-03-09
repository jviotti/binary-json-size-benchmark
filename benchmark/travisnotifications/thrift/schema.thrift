struct Notification {
  1: required string secure
}

struct Notifications {
  1: required Notification campfire,
  2: required Notification irc,
  3: required Notification flowdock,
  4: required Notification hipchat,
  5: required Notification slack,
  6: required Notification webhooks,
  7: required Notification email
}

struct Main {
  1: required Notifications notifications
}
