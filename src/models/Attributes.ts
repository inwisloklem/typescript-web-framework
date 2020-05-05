/*
The most commonly used type parameter names are:

E – Element (used extensively by the Java Collections Framework)
K – Key
N – Number
T – Type
V – Value
S, U, V etc. – 2nd, 3rd, 4th types
*/

export class Attributes<T> {
  constructor(private data: T) {}

  get<K extends keyof T>(propName: K): T[K] {
  //  ^^^^^^^^^^^^^^^^^ type constaint: K can only be one of the keys of T
    return this.data[propName]
  }

  getAll(): T {
    return this.data
  }

  set(update: T): void {
    this.data = {...this.data, ...update}
  }
}
