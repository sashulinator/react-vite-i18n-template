import { Boolean } from './boolean'

/**
 * Logical `!` operator (behaves like the JS one)
 * @param B to negate
 * @returns [[Boolean]]
 * @example
 * ```ts
 * type test0 = B.Not<B.True>  // False
 * type test1 = B.Not<B.False> // True
 * ```
 */
export type Not<B extends Boolean> = {
  0: 1
  1: 0
}[B]
