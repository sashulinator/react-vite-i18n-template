import { AnyDictionary } from './types/any';
import { Has } from './types/has';
import { Key } from './types/key';

function has<K extends Key>(dictionary: unknown, key: K): dictionary is Has<K> {
  return (dictionary as AnyDictionary)?.hasOwnProperty(key)
}
