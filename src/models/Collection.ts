import {Events} from 'src/models/Events'
import {Method} from 'src/models/Method'

const CONTENT_TYPE_HEADER = {'Content-Type': 'application/json; charset=utf-8'}

export class Collection<T, U> {
  public events: Events = new Events()
  public list: T[] = []
  constructor(public rootRequestUrl: string, public deserialize: (json: U) => T) {}

  get on() {
    return this.events.on
  }

  get length() {
    return this.list.length
  }

  get trigger() {
    return this.events.trigger
  }

  async fetch(): Promise<void> {
    try {
      const response = await fetch(this.rootRequestUrl, {
        headers: CONTENT_TYPE_HEADER,
        method: Method.GET,
      })

      const data = await response.json()

      if (Array.isArray(data)) {
        this.list = data.map(item => this.deserialize(item))
        this.trigger('change')
      }
    }
    catch(error) {
      console.error(`CollectionError: ${error.message}`)
    }
  }
}
