import { EventNames } from '../types/event-names'
import { Toaster } from '../types/toaster'
import mitt from 'mitt'

import { Id } from '@/utils/any/id'
import { Dictionary } from '@/utils/dictionary'

export const store: Dictionary<Toaster> = {}

export function addToaster(): Toaster {
  const id = new Date().toString()

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

export function getToaster(id: Id): Toaster {
  return store[id]
}

function removeToaster(id: Id): void {
  store[id].emitter.all.clear()
  delete store[id]
}

function onMount(id: Id) {
  const toaster = getToaster(id)
  toaster.emitter.on(EventNames.onUnmount, () => removeToaster)
}
