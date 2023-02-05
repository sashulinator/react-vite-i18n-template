import { EventNames } from '../types/event-names'
import { Toast } from '../types/toast'
import { getContainer } from './container-actions'
import { store } from './store'

export function addToast(toast: Toast) {
  const container = getContainer(toast.toasterId)

  if (container.order.length >= container.max) {
    const ids = container.order.slice(0, container.order.length - container.max + 1)
    ids.forEach((id) => container.emitter.emit(EventNames.hideToast, container.data[id]))
  }

  container.order.push(toast.id)
  container.data[toast.id] = toast
  container.entering.push(toast.id)
  setTimeout(() => {
    // Если не находим, значит тост был удален и показывать его не надо
    if (container.entering.find((id) => id === toast.id)) {
      container.emitter.emit(EventNames.showToast, toast)
    }
  }, toast.enteringAnimationMs)
}

export function showToast(toast: Toast) {
  const container = getContainer(toast.toasterId)
  container.entering = container.entering.filter((id) => id !== toast.id)
  container.showing.push(toast.id)
  container.emitter.emit(EventNames.updateToastTransition, toast)
}

export function hideToast(toast: Toast) {
  const toaster = getContainer(toast.toasterId)
  toaster.entering = toaster.entering.filter((id) => id !== toast.id)
  toaster.showing = toaster.showing.filter((id) => id !== toast.id)
  toaster.exiting.push(toast.id)
  setTimeout(() => {
    toaster.emitter.emit(EventNames.removeToast, toast)
  }, toast.exitingAnimationMs)
}

export function removeToast(toast: Toast) {
  const toaster = getContainer(toast.toasterId)
  toaster.order = toaster.order.filter((id) => id !== toast.id)
  toaster.exiting = toaster.exiting.filter((id) => id !== toast.id)
  setTimeout(() => {
    delete store[toast.toasterId].data[toast.id]
  }, toast.exitingAnimationMs)
}

export function updateToastTransition(toast: Toast) {
  const toaster = store[toast.toasterId]
  const storeToast = toaster.data[toast.id]
  if (storeToast === undefined) {
    return
  }
  storeToast.exitTransitionMs = toast.exitTransitionMs
  if (storeToast.isTransitionCounterStopped) {
    window.setTimeout(() => toaster.emitter.emit(EventNames.updateToastTransition, storeToast), 100)
    return
  }
  if (storeToast.autocloseMs > storeToast.exitTransitionMs) {
    window.setTimeout(() => {
      const exitTransitionMs = storeToast.exitTransitionMs + 100
      toaster.emitter.emit(EventNames.updateToastTransition, { ...storeToast, exitTransitionMs })
    }, 100)
  } else {
    toaster.emitter.emit(EventNames.hideToast, toast)
  }
}

export function stopToastTransition(toast: Toast) {
  const toaster = getContainer(toast.toasterId)
  toaster.data[toast.id].isTransitionCounterStopped = true
}

export function continueToastTransition(toast: Toast) {
  const toaster = getContainer(toast.toasterId)
  toaster.data[toast.id].isTransitionCounterStopped = false
}
