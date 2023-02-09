export function swap<Item>(index1: number, index2: number, arr: Item[]): Item[] {
  const clone = [...arr]
  clone[index1] = arr[index2] as Item
  clone[index2] = arr[index1] as Item
  return clone
}
