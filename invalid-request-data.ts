import { InterruptedError } from '@/utils/interrupted-error'

export class InvalidRequestDataError extends InterruptedError {
  response: unknown

  constructor(originError: Error, data: unknown) {
    super('Invalid Request Data', 'invalidRequestData', originError)
    this.response = data
  }
}
