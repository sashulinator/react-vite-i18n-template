import { InterruptedError } from '@/utils/error/interrupted-error'
import { Any } from '@/utils/types'

export class InvalidServerResponseError extends InterruptedError {
  response: { url: string }

  constructor(originError: Error, response: Any) {
    super('Invalid Server Data', 'invalidServerResponse', originError)
    this.response = response
  }
}
