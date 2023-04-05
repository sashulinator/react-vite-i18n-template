export function assertNotUndefined<T>(input: undefined | T): asserts input is T {
  if (input === undefined) {
    throw new Error('Is undefined')
  }
}
