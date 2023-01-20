export function map<K extends string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  return Object.keys(obj).reduce((ret, key) => {
    const k = key as K
    ret[k] = f(obj[k])
    return ret
  }, {} as Record<K, U>)
}
