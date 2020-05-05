export function property<K extends number | string | symbol>(key: K) {
  return function<T extends {[P in K]: T[K]}>(value: T): T[K] {
    return value[key]
  }
}
