import { ref, unref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Ref } from 'vue'
import { debounce, observerDomResize } from './index'

export function useAutoResize(domRef: HTMLElement | Ref<HTMLElement | null> | null, onResize?: Function, afterAutoResizeInit?: Function) {
  const width = ref(0)
  const height = ref(0)
  let dom: any, domObserver: MutationObserver | null, debounceInitWHFun: any

  function initWH(resize = true) {
    return new Promise(resolve => {
      nextTick(() => {
        dom = unref(domRef)
        width.value = dom ? dom.clientWidth : 0
        height.value = dom ? dom.clientHeight : 0
        if (typeof onResize === 'function' && resize) onResize()
        resolve(true)
      })
    })
  }

  onMounted(async () => {
    await initWH(false)
    debounceInitWHFun = debounce(initWH)
    domObserver = observerDomResize(dom!, debounceInitWHFun)
    window.addEventListener('resize', debounceInitWHFun)
    if (typeof afterAutoResizeInit === 'function') afterAutoResizeInit()
  })
  onUnmounted(() => {
    if (!domObserver) return
    domObserver.disconnect()
    domObserver.takeRecords()
    domObserver = null
    window.removeEventListener('resize', debounceInitWHFun)
  })

  return { width, height, initWH }
}
