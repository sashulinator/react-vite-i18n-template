import { ErrorWithCode } from '@savchenko91/schema-validator'

import { Any } from '@/types/common'

export class InterruptedError extends ErrorWithCode {
  originError: Error
  input: Any

  constructor(message: string, code: string, originError: Error) {
    super(`${message}: ${originError.message}`, code)
    this.originError = originError
  }
}
