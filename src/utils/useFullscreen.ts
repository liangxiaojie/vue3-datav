import { ref, unref, getCurrentScope, onScopeDispose } from 'vue'
import type { Ref } from 'vue'
import { useEventListener } from './event'

type FunctionMap = ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror']

const functionsMap: FunctionMap[] = [
  ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
  // New WebKit
  ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
  // Old WebKit
  ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
  ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
  ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError'],
] as any

interface UseFullscreenOptions {
  document?: Document
  autoExit?: boolean
}

export function useFullscreen(target?: HTMLElement | Ref<HTMLElement | null> | null, options?: UseFullscreenOptions) {
  const doc = options?.document || window.document
  const autoExit = options?.autoExit || false
  const targetRef = target || doc?.querySelector('html')
  const isFullscreen = ref(false)
  let isSupported = false

  let map: FunctionMap = functionsMap[0]

  if (!doc) {
    isSupported = false
  } else {
    for (const m of functionsMap) {
      if (m[1] in doc) {
        map = m
        isSupported = true
        break
      }
    }
  }

  const [REQUEST, EXIT, ELEMENT, , EVENT] = map

  isFullscreen.value = !!doc?.[ELEMENT]

  async function exit() {
    if (!isSupported) return
    if (doc?.[ELEMENT]) await doc[EXIT]()

    isFullscreen.value = false
  }

  async function enter() {
    if (!isSupported) return

    await exit()

    const target = unref(targetRef)
    if (target) {
      await target[REQUEST]()
      isFullscreen.value = true
    }
  }

  async function toggle() {
    if (isFullscreen.value) await exit()
    else await enter()
  }

  if (doc) {
    useEventListener(doc, EVENT, () => {
      isFullscreen.value = !!doc?.[ELEMENT]
    })
  }

  if (autoExit) {
    if (getCurrentScope()) {
      onScopeDispose(exit)
    }
  }

  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle,
  }
}
