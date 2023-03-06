export type Setter<T> = (currVal: T) => T

export type ValueOrSetter<T> = Setter<T> | T

export type SetterOrUpdater<T> = (valueOrSetter: ValueOrSetter<T>) => void
