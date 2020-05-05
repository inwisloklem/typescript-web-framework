import {Props, User} from 'src/models/User'
import {UserForm} from 'src/views/UserForm'
import {UserInfo} from 'src/views/UserInfo'
import {View} from 'src/views/View'

export class UserEdit extends View<User, Props> {
  public regions: {[key: string]: string} = {
    userForm: '#UserForm',
    userInfo: '#UserInfo',
  }

  onRender(): void {
    new UserForm(this.regionsMap.userForm, this.model).render()
    new UserInfo(this.regionsMap.userInfo, this.model).render()
  }

  template(): string {
    return `
      <div>
        <ul class="list" id='UserList'></ul>

        <h2>UserForm</h2>
        <div id="UserInfo"></div>
        <div id="UserForm"></div>
      </div>
    `
  }
}
