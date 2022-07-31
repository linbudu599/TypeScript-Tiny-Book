abstract class Handler {
  abstract handle(input: unknown): void;
}

class NotHandler {}

class EventHandler implements Handler {
  handle(input: unknown): void {
    // ...
  }
}

class MessageHandler implements Handler {
  handle(input: unknown): void {
    // ...
  }
}
