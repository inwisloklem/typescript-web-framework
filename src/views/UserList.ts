import {CollectionView} from 'src/views/CollectionView'
import {Props, User} from 'src/models/User'

export class UserList extends CollectionView<User, Props> {
  renderItem(user: User): HTMLTemplateElement {
    const template = document.createElement('template')
    template.innerHTML = this.templateItem(user)
    return template
  }

  templateItem(user: User): string {
    return `<li class="item">${user.get('name')}</li>`
  }
}
