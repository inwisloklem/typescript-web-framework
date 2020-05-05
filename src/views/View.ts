import {RootElement} from 'src/views/RootElement'
import {Model} from 'src/models/Model'

export abstract class View<T extends Model<U>, U> {
  abstract template(): string

  public eventsMap: {[key: string]: Function} = {}
  public regions: {[key: string]: string} = {}
  public regionsMap: {[key: string]: Element} = {}

  constructor(public parent: RootElement, public model: T) {
    this.model.events.on('change', this.render.bind(this))
  }

  bindEvents(fragment: DocumentFragment): void {
    for (const [key, handler] of Object.entries(this.eventsMap)) {
      const [eventName, selector] = key.split(':')
      const element = fragment.querySelector(selector)

      if (element) {
        element.addEventListener(eventName, handler.bind(this))
      }
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    for (const [key, selector] of Object.entries(this.regions)) {
      const element = fragment.querySelector(selector)

      if (element) {
        this.regionsMap[key] = element
      }
    }
  }

  onRender(): void {}

  render(): void {
    const parent = typeof this.parent === 'string'
      ? document.querySelector(this.parent)
      : this.parent

    if (parent) {
      const template = document.createElement('template')
      template.innerHTML = this.template()

      this.bindEvents(template.content)
      this.mapRegions(template.content)
      this.onRender()

      parent.innerHTML = ''
      parent.append(template.content)
    }
    else {
      console.error('parent element not found')
    }
  }
}
