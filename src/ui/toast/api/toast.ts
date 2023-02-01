import { findToaster } from '../model/store'
import { EventNames } from '../types/event-names'
import { Toast } from '../types/toast'
import { Toaster } from '../types/toaster'

export function toast(toast: Partial<Toast>) {
  const toaster = findToaster(toast.toasterId)

  if (toaster) {
    toaster.emitter.emit(EventNames.addToast, generateToast(toast, toaster))
  } else {
    // TODO
  }
}

function generateToast(toast: Partial<Toast>, toaster: Toaster): Toast {
  const lastKeys = Object.keys(toaster.data).at(-1)

  const lastSequenceId = lastKeys ? parseInt(toaster.data[lastKeys]?.id.toString()) : 0

  return {
    id: lastSequenceId + 1,
    toasterId: toaster.id,
    data: undefined,
    enteringAnimationMs: 200,
    exitingAnimationMs: 200,
    autocloseMs: 2000,
    type: 'error',
    ...toast,
  }
}
