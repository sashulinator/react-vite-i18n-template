import { get as getContainer } from '../container/actions'
import { ContainerEventNames } from '../container/event-names'
import { Container } from '../container/types'
import { store } from '../store'
import { ToastEventNames } from './event-names'
import { Toast } from './types'
import mitt from 'mitt'

import { Id } from '@/utils/any/id'
import { BaseError } from '@/utils/error'

export function find(id: Id) {
  return store.toasts[id]
}

export function get(id: Id): Toast {
  const toast = store.toasts[id]

  if (toast === undefined) {
    throw new BaseError('Cannot get Toast', { id })
  }

  return toast
}

export function add(toast?: Partial<Toast>) {
  const container = getContainer(toast?.containerId)
  const generatedToast = generate(toast, container)
  subscribe(generatedToast)
  store.toasts[generatedToast.id] = generatedToast
  container.emitter.emit(ContainerEventNames.addToast, generatedToast)
  generatedToast.emitter.emit(ToastEventNames.setEntering)
}

export function setEntering(id: Id) {
  const toast = get(id)
  toast.isEntering = true
  toast.isExiting = false
  toast.isShowing = false
  setTimeout(() => {
    toast.emitter.emit(ToastEventNames.setShowing)
  }, toast.enteringAnimationMs)
}

export function setShowing(id: Id) {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast.isEntering = false
  toast.isExiting = false
  toast.isShowing = true
  toast.emitter.emit(ToastEventNames.increaseShowingTransition)
}

export function increaseShowingTransition(id: Id) {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast.isEntering = false
  toast.isExiting = false
  toast.isShowing = true

  if (toast.isTransitionStopped) {
    setTimeout(() => toast.emitter.emit(ToastEventNames.increaseShowingTransition), 100)
    return
  }

  toast.showingMs = toast.showingMs + 100
  const isTimeToExit = toast.showingMs >= toast.autocloseMs

  if (isTimeToExit) {
    toast.emitter.emit(ToastEventNames.setExiting, id)
  } else {
    setTimeout(() => toast.emitter.emit(ToastEventNames.increaseShowingTransition), 100)
  }
}

export function setExiting(id: Id) {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast.isEntering = false
  toast.isExiting = true
  toast.isShowing = false
  setTimeout(() => {
    toast.emitter.emit(ToastEventNames.remove)
  }, toast.exitingAnimationMs)
}

export function remove(id: Id) {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  const container = getContainer(toast.containerId)
  container.emitter.emit(ContainerEventNames.removeToast, toast)
  delete store.toasts[id]
  toast.emitter.emit(ToastEventNames.removed)
}

export function stopTransition(id: Id) {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast.isTransitionStopped = true
}

export function continueTransition(id: Id) {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast.isTransitionStopped = false
}

// Private

function generate(toast: Partial<Toast> | undefined, container: Container): Toast<unknown> {
  store.toastSequenceId += 1

  return {
    ...container.defaultToast,
    id: store.toastSequenceId,
    containerId: container.id,
    emitter: mitt(),
    ...toast,
  }
}

function subscribe(toast: Toast<unknown>): void {
  toast.emitter.on(ToastEventNames.setEntering, () => setEntering(toast.id))
  toast.emitter.on(ToastEventNames.setShowing, () => setShowing(toast.id))
  toast.emitter.on(ToastEventNames.increaseShowingTransition, () => increaseShowingTransition(toast.id))
  toast.emitter.on(ToastEventNames.setExiting, () => setExiting(toast.id))
  toast.emitter.on(ToastEventNames.remove, () => remove(toast.id))
}
