import {Method} from 'src/models/Method'

const CONTENT_TYPE_HEADER = {'Content-Type': 'application/json; charset=utf-8'}

export class Sync<T extends {id?: number}> {
  constructor(private rootRequestUrl: string) {}

  async fetch(id: number): Promise<T | undefined> {
    try {
      const response = await fetch(`${this.rootRequestUrl}/${id}`, {
        headers: CONTENT_TYPE_HEADER,
        method: Method.GET,
      })

      return response.json()
    }
    catch(error) {
      console.error(`SyncError: ${error.message}`)
    }
  }

  async save(data: T): Promise<T | undefined> {
    try {
      const {id} = data
      const response = id ?
        await fetch(`${this.rootRequestUrl}/${id}`, {
          body: JSON.stringify(data),
          headers: CONTENT_TYPE_HEADER,
          method: Method.PUT,
        })
        : await fetch(this.rootRequestUrl, {
          body: JSON.stringify(data),
          headers: CONTENT_TYPE_HEADER,
          method: Method.POST,
        })

      return response.json()
    }
    catch(error) {
      console.error(`SyncError: ${error.message}`)
    }
  }
}
