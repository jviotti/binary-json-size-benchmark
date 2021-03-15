@0xb5c65b317b383b37;

struct Notification {
  secure @0 :Text;
}

struct Notifications {
  campfire @0 :Notification;
  irc @1 :Notification;
  flowdock @2 :Notification;
  hipchat @3 :Notification;
  slack @4 :Notification;
  webhooks @5 :Notification;
  email @6 :Notification;
}

struct Main {
  notifications @0 :Notifications;
}
