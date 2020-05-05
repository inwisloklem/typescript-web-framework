export class Events {
  private events: {[key: string]: Function[]} = {}

  on(eventName: string, callback: Function): void {
    this.events[eventName] =
      eventName in this.events ? [...this.events[eventName], callback] : [callback]
  }

  trigger(eventName: string): void {
    if (eventName in this.events) {
      for (const callback of this.events[eventName]) {
        callback()
      }
    }
  }
}
