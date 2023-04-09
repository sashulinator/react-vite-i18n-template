export function assertNotNull<T>(input: null | T): asserts input is T {
  if (input === null) {
    throw new Error('Is null')
  }
}
