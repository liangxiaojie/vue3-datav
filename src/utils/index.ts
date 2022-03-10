/**
 * 防抖函数，策略是当事件被触发时，设定一个周期延迟执行动作，若期间又被触发，则重新设定周期，直到周期结束，执行动作。
 * @param fn 周期结束后的执行动作函数
 * @param delay 延迟时间（ms）
 * @returns 防抖函数
 */
export function debounce(fn: Function, delay = 100) { // eslint-disable-line
  let lastTime: number
  return function (this: any) {
    clearTimeout(lastTime)
    const [that, args] = [this, arguments] // eslint-disable-line
    lastTime = setTimeout(() => {
      fn.apply(that, args)
    }, delay)
  }
}

/**
 *
 * @param target DOM树中的一个要观察变化的DOM Node (可能是一个Element) , 或者是被观察的子节点树的根节点。
 * @param callback 当观察到变动时执行的回调函数
 * @returns 返回观察器实例
 */
export function observerDomResize(target: Node, callback: MutationCallback) {
  const observer = new window.MutationObserver(callback)
  observer.observe(target, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
  })
  return observer
}
