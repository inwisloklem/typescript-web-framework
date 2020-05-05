import {Collection} from 'src/models/Collection'
import {RootElement} from 'src/views/RootElement'

export abstract class CollectionView<T, U> {
  abstract renderItem(model: T): HTMLTemplateElement
  abstract templateItem(model: T): string
  constructor(public parent: RootElement, public collection: Collection<T, U>) {}

  render(): void {
    const parent = typeof this.parent === 'string'
      ? document.querySelector(this.parent)
      : this.parent

    if (parent) {
      parent.innerHTML = ''

      for(const model of this.collection.list) {
        const template = this.renderItem(model)
        parent.append(template.content)
      }
    }
    else {
      console.error('parent element not found')
    }
  }
}
