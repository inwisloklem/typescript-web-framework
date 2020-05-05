import {Props, User} from 'src/models/User'
import {View} from 'src/views/View'

export class UserInfo extends View<User, Props> {
  template(): string {
    return `
      <div class="summary">
        <div>
          <strong>Name:</strong>
          ${this.model.get('name')}
        </div>
        <div>
          <strong>Age:</strong>
          ${this.model.get('age')}
        </div>
      </div>
    `
  }
}
