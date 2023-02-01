import { EventNames } from '../types/event-names'
import { Toast } from '../types/toast'
import { Toaster } from '../types/toaster'
import mitt from 'mitt'

import { Id } from '@/utils/any/id'
import { Dictionary } from '@/utils/dictionary'

export const store: Dictionary<Toaster> = {}

export function addToaster(): Toaster {
  const id = Object.keys(store).length

  const emitter = mitt()
  emitter.on(EventNames.onMount, () => onMount(id))

  const toaster = {
    id,
    emitter,
    data: {},
    entering: [],
    showing: [],
    exiting: [],
    archived: [],
  }

  store[id] = toaster

  return toaster
}

export function findToaster(id?: Id): Toaster | undefined {
  return store[id ?? Object.keys(store)[0]]
}

export function getToaster(id?: Id): Toaster {
  if (Object.keys(store).length > 1 && id === undefined) {
    throw new Error('You have more than one Toaster so you must provide "toasterId"')
  }
  return findToaster(id) as Toaster
}

export function getShowingToastList(toasterId: Id): Toast[] {
  const toaster = getToaster(toasterId)
  return toaster.showing.map((id) => toaster.data[id])
}

export function getEnteringToastList(toasterId: Id): Toast[] {
  const toaster = getToaster(toasterId)
  return toaster.entering.map((id) => toaster.data[id])
}

export function getExitingToastList(toasterId: Id): Toast[] {
  const toaster = getToaster(toasterId)
  return toaster.exiting.map((id) => toaster.data[id])
}

export function getRenderingToastList(toasterId: Id): Toast[] {
  const list = [
    ...getExitingToastList(toasterId),
    ...getShowingToastList(toasterId),
    ...getEnteringToastList(toasterId),
  ]
  return list.reverse()
}

export function isEntering(toasterId: Id, id: Id) {
  const toaster = getToaster(toasterId)
  return toaster.entering.includes(id)
}

export function isExiting(toasterId: Id, id: Id) {
  const toaster = getToaster(toasterId)
  return toaster.exiting.includes(id)
}

export function isShowing(toasterId: Id, id: Id) {
  const toaster = getToaster(toasterId)
  return toaster.showing.includes(id)
}

function removeToaster(id: Id): void {
  store[id].emitter.all.clear()
  delete store[id]
}

function addToast(toast: Toast) {
  const toaster = getToaster(toast.toasterId)
  toaster.data[toast.id] = toast
  toaster.entering.push(toast.id)
  setTimeout(() => {
    toaster.emitter.emit(EventNames.showToast, toast)
  }, toast.enteringAnimationMs)
}

function showToast(toast: Toast) {
  const toaster = getToaster(toast.toasterId)
  toaster.entering = toaster.entering.filter((id) => id !== toast.id)
  toaster.showing.push(toast.id)
  if (toast.autocloseMs !== undefined) {
    setTimeout(() => {
      toaster.emitter.emit(EventNames.hideToast, toast)
    }, toast.autocloseMs)
  }
}

function hideToast(toast: Toast) {
  const toaster = getToaster(toast.toasterId)
  toaster.showing = toaster.showing.filter((id) => id !== toast.id)
  toaster.exiting.push(toast.id)
  setTimeout(() => {
    toaster.emitter.emit(EventNames.removeToast, toast)
  }, toast.enteringAnimationMs)
}

function removeToast(toast: Toast) {
  const toaster = getToaster(toast.toasterId)
  toaster.exiting = toaster.exiting.filter((id) => id !== toast.id)
  delete store[toast.toasterId].data[toast.id]
}

// Events

function onMount(id: Id) {
  const toaster = getToaster(id)
  toaster.emitter.on(EventNames.onUnmount, () => removeToaster)
  toaster.emitter.on(EventNames.addToast, addToast)
  toaster.emitter.on(EventNames.showToast, showToast)
  toaster.emitter.on(EventNames.hideToast, hideToast)
  toaster.emitter.on(EventNames.removeToast, removeToast)
}
