import {User} from 'src/models/User'
import {UserEdit} from 'src/views/UserEdit'

const rootElement = document.getElementById('root')
const user = User.createUser({age: 40, name: 'inwisloklem'})

const userEdit = new UserEdit(rootElement, user)
userEdit.render()

/*
import {UserList} from 'src/views/UserList'

const collection = User.createUserCollection()

collection.on('change', function onChange(): void {
  const userList = new UserList(document.getElementById('UserList'), collection)
  userList.render()
})

collection.fetch()
*/
