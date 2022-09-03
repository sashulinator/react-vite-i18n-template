import { InterruptedError } from '@/utils/error/interrupted-error'

export class InvalidRequestDataError extends InterruptedError {
  data: unknown

  constructor(originError: Error, data: unknown) {
    super('Invalid Request Data', 'invalidRequestData', originError)
    this.data = data
  }
}
