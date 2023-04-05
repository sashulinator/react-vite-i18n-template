export function assertNotNil<T>(input: undefined | null | T): asserts input is T {
  if (input === null || input === undefined) {
    throw new Error(`Is ${String(input)}`)
  }
}
