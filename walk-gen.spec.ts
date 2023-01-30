import { WalkResult, walk } from './walk-gen'

describe(walk.name, () => {
  test('All arguments have correct value', () => {
    const dictionary = {
      a: 'aValue',
      b: 'bValue',
      c: 'cValue',
    }

    const iterations: WalkResult<string>[] = []

    for (const iter of walk(dictionary)) {
      iterations.push(iter)
    }

    expect(iterations[0]).toEqual({
      value: 'aValue',
      key: 'a',
      keyIndex: 0,
      path: ['a'],
      parent: dictionary,
      dictionary,
    })
    expect(iterations[1]).toEqual({
      value: 'bValue',
      key: 'b',
      keyIndex: 1,
      path: ['b'],
      parent: dictionary,
      dictionary,
    })
    expect(iterations[2]).toEqual({
      value: 'cValue',
      key: 'c',
      keyIndex: 2,
      path: ['c'],
      parent: dictionary,
      dictionary,
    })
  })
})
