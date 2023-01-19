import { AnyRecord } from '../types'

export class BaseError extends Error {
  constructor(message: string, props?: AnyRecord) {
    super(message)

    if (props) {
      Object.assign(this, props)
    }

    Object.setPrototypeOf(this, BaseError.prototype)
  }
}
