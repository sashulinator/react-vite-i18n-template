import { Any } from '@/types/common'
import { InterruptedError } from '@/utils/interrupted-error'

export class InvalidServerResponseError extends InterruptedError {
  response: { url: string }

  constructor(originError: Error, response: Any) {
    super('Invalid Server Data', 'invalidServerResponse', originError)
    this.response = response
  }
}
