export function map<K extends string, T, U>(dictionary: Record<K, T>, f: (x: T) => U): Record<K, U> {
  return Object.keys(dictionary).reduce((ret, key) => {
    const k = key as K
    ret[k] = f(dictionary[k])
    return ret
  }, {} as Record<K, U>)
}
