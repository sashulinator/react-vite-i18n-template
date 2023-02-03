export function chunk<T>(
  totalSize: number,
  chunkSize: number,
  fn: (a: T, chunkStart: number, chunkEnd: number) => T,
  initialAcc: T
) {
  /* Create a promise chain starting with our initial accumulator */
  let promise = Promise.resolve(initialAcc)

  let chunkHead = 0

  while (chunkHead < totalSize) {
    const chunkStart = chunkHead
    const chunkEnd = chunkStart + chunkSize

    /* Chain the chunk's promise on requestAnimationFrame */
    promise = promise.then(
      (resultAcc) =>
        new Promise((resolve) => {
          requestAnimationFrame(() => {
            /* Wrap the result in a promise so that we can safely receive a promise or a value */
            Promise.resolve(fn(resultAcc, chunkStart, chunkEnd)).then(resolve)
          })
        })
    )

    chunkHead = chunkEnd
  }

  return promise
}
