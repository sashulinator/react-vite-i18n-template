import { findContainer } from '../model/container-actions'
import { EventNames } from '../types/event-names'
import { Toast } from '../types/toast'
import { Container } from '../types/toaster'

export function toast<Data>(toast: Partial<Toast<Data>>): Toast<Data> | undefined {
  const toaster = findContainer(toast.toasterId)

  if (toaster) {
    const generatedToast = generateToast(toast, toaster)
    toaster.emitter.emit(EventNames.addToast, generatedToast)
    return generatedToast as Toast<Data>
  } else {
    // TODO
  }
}

export function hideToast(toast: Pick<Toast, 'id' | 'toasterId' | 'exitingAnimationMs'>) {
  const toaster = findContainer(toast.toasterId)
  toaster?.emitter.emit(EventNames.hideToast, toast)
}

function generateToast<Data>(toast: Partial<Toast>, toaster: Container): Toast<Data> {
  const lastKeys = Object.keys(toaster.data).at(-1)

  const lastSequenceId = lastKeys ? parseInt(toaster.data[lastKeys]?.id.toString()) : 0

  return {
    id: lastSequenceId + 1,
    toasterId: toaster.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: undefined as any,
    enteringAnimationMs: 300,
    exitingAnimationMs: 300,
    isTransitionCounterStopped: false,
    autocloseMs: 5000,
    exitTransitionMs: 0,
    type: 'error',
    ...toast,
  }
}
