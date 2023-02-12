import { At } from './at'
import { Cast } from './cast'
import { Extends } from './extends'
import { Iteration } from './iteration/iteration'
import { IterationOf } from './iteration/iteration-of'
import { Next } from './iteration/next'
import { Pos } from './iteration/pos'
import { Key } from './key'
import { Length } from './list/length'
import { List } from './list/list'

/**
 * @ignore
 */
type _Path<O, P extends List<Key>, I extends Iteration = IterationOf<0>> = {
  0: _Path<At<O, P[Pos<I>]>, P, Next<I>>
  1: O
}[Extends<Pos<I>, Length<P>>]

/**
 * Get in `O` the type of nested properties
 * @param O to be inspected
 * @param Path to be followed
 * @returns [[Any]]
 * @example
 * ```ts
 * ```
 */
export type Path<O extends any, P extends List<Key>> = _Path<O & {}, P> extends infer X ? Cast<X, any> : never
