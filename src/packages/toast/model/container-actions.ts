import { EventNames } from '../types/event-names'
import { Container } from '../types/toaster'
import { store } from './store'
import { addToast, hideToast, removeToast, showToast, updateToastTransition } from './toast-actions'
import mitt from 'mitt'

import { Id } from '@/utils/any/id'
import { BaseError } from '@/utils/error'

export function findContainer(id?: Id): Container | undefined {
  return store[id ?? Object.keys(store)[0]]
}

export function getContainer(id?: Id): Container {
  if (Object.keys(store).length > 1 && id === undefined) {
    throw new Error('You have more than one Toaster so you must provide "toasterId"')
  }

  const container = findContainer(id)

  if (container === undefined) {
    throw new BaseError('Cannot get Container', { id })
  }

  return container
}

function removeContainer(id: Id): void {
  store[id].emitter.all.clear()
  delete store[id]
}

export function addContainer(): Container {
  const container = generateContainer()
  store[container.id] = container
  return container
}

// Private

function generateContainer() {
  const id = Object.keys(store).length

  const emitter = mitt()
  emitter.on(EventNames.mount, () => onMount(id))

  return {
    id,
    emitter,
    data: {},
    entering: [],
    showing: [],
    exiting: [],
    order: [],
    max: 3,
  }
}

function onMount(id: Id) {
  const toaster = getContainer(id)
  toaster.emitter.on(EventNames.unmount, removeContainer)
  toaster.emitter.on(EventNames.addToast, addToast)
  toaster.emitter.on(EventNames.showToast, showToast)
  toaster.emitter.on(EventNames.hideToast, hideToast)
  toaster.emitter.on(EventNames.removeToast, removeToast)
  toaster.emitter.on(EventNames.updateToastTransition, updateToastTransition)
}
