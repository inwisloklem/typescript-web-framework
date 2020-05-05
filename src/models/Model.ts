interface ModelAttributes<T> {
  get<K extends keyof T>(propName: K): T[K]
  getAll(): T
  set(update: T): void
}

interface ModelEvents {
  on(eventName: string, callback: Function): void
  trigger(eventName: string): void
}

interface ModelSync<T> {
  fetch(id: number): Promise<T | undefined>
  save(data: T): Promise<T | undefined>
}

export class Model<T extends {id?: number}> {
  constructor(
    public attributes: ModelAttributes<T>,
    public events: ModelEvents,
    public sync: ModelSync<T>,
  ) {}

  async fetch(): Promise<void> {
    const id = this.get('id')

    if (typeof id === 'number') {
      const data = await this.sync.fetch(id)

      if (typeof data !== 'undefined') {
        this.set(data)
      }
    } else {
      console.error('id not present')
    }
  }

  async save(): Promise<void> {
    const data = this.attributes.getAll()
    const dataFromServer = await this.sync.save(data)

    if (dataFromServer?.id) {
      this.set(dataFromServer)
      this.trigger('save')
    }
  }

  get get() {
    const {attributes} = this
    return attributes.get.bind(attributes)
  }

  get on() {
    const {events} = this
    return events.on.bind(events)
  }

  get trigger() {
    const {events} = this
    return events.trigger.bind(events)
  }

  set(update: T): void {
    const {attributes} = this
    attributes.set.call(attributes, update)
    this.events.trigger('change')
  }
}
