import {Props, User} from 'src/models/User'
import {View} from 'src/views/View'

export class UserForm extends View<User, Props> {
  public eventsMap: {[key: string]: Function} = {
    'click:#changeName': this.onChangeName,
    'click:#setAge': this.onSetRandomAge,
    'click:#save': this.onSave,
  }

  onChangeName(): void {
    const inputName =
      <HTMLInputElement>document.querySelector('.inputName') /* as HTMLInputElement */
    // ^^^^^^^^^^^^^^^^ type casting

    if (inputName?.value.length) {
      this.model.set({name: inputName.value})
    }
  }

  onSave(): void {
    this.model.save()
  }

  onSetRandomAge(): void {
    this.model.set({age: Math.floor(Math.random() * 100)})
  }

  template(): string {
    return `
      <input
        class="inputName"
        placeholder=${this.model.get('name')}
      />
      <div class="block hgap">
        <button id="changeName">Change name</button>
        <button id="setAge">Set random age</button>
        <button id="save">Save on server</button>
      </div>
    `
  }
}
