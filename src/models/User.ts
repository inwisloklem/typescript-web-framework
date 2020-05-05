import {Attributes} from 'src/models/Attributes'
import {Collection} from 'src/models/Collection'
import {Events} from 'src/models/Events'
import {Sync} from 'src/models/Sync'
import {Model} from 'src/models/Model'

const BASE_REQUEST_URL = 'http://localhost:4444/users'

export interface Props {
  age?: number
  id?: number
  name?: string
}

export class User extends Model<Props> {
  static createUser(data: Props): Model<Props> {
    return new Model<Props>(
      new Attributes(data),
      new Events(),
      new Sync(BASE_REQUEST_URL)
    )
  }

  static createUserCollection(): Collection<User, Props> {
    return new Collection(BASE_REQUEST_URL, User.createUser)
  }
}
