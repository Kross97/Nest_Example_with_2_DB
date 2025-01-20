interface IHandler {
  once: boolean;
  handler: () => void;
}

export const EventsDictionary = {
  unAuthorized: "unAuthorized",
} as const;

type TEvents = keyof typeof EventsDictionary;

class EventEmitter {
  private eventsHandlersDispatcher: Record<string, IHandler[]> = {};

  add(event: TEvents, handler: () => void, once?: boolean) {
    if (event in this.eventsHandlersDispatcher) {
      this.eventsHandlersDispatcher[event].push({ handler, once: !!once });
    } else {
      this.eventsHandlersDispatcher[event] = [{ handler, once: !!once }];
    }
  }

  remove(event: TEvents, handler: () => void) {
    if (event in this.eventsHandlersDispatcher) {
      this.eventsHandlersDispatcher[event] = this.eventsHandlersDispatcher[event].filter(
        (handlerObj) => handlerObj.handler !== handler
      );
    }
  }

  emit(event: TEvents) {
    if (event in this.eventsHandlersDispatcher) {
      this.eventsHandlersDispatcher[event] = this.eventsHandlersDispatcher[event].filter(
        (handlerObj) => {
          handlerObj.handler();
          return !handlerObj.once;
        }
      );
    }
  }
}

export const EventEmitterAgent = new EventEmitter();
