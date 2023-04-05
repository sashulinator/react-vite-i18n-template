/**
 * Вызов функций по очереди с одинаковыми аргументами
 * 🔴 Первой функцией необходимо передаввать более расширенный тип
 * @param fnList
 * @returns
 */
export function fns<A extends unknown[]>(...fnList: (((...args: A) => void) | undefined)[]) {
  return function (...args: A) {
    // @ts-ignore
    for (const fn of fnList) fn?.apply(this, args)
  }
}
