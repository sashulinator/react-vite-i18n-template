import { Key } from "./key";

export interface Dictionary<T> {
  [key: Key]: T
}
