import { Boolean } from './boolean/boolean'

export type If<B extends Boolean, Then, Else = never> = B extends 1 ? Then : Else
