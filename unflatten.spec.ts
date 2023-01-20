import { unflatten } from './unflatten'

describe(unflatten.name, () => {
  const entities = {
    'first.second.third': 123,
    'a.b': 'string',
    'a.c': 'string2',
  }

  it('basic', () => {
    const unflattened = unflatten(entities)

    expect(unflattened).toEqual({
      first: { second: { third: 123 } },
      a: { b: 'string', c: 'string2' },
    })
  })
})
