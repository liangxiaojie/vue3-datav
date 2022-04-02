/**
 * 防抖函数，策略是当事件被触发时，设定一个周期延迟执行动作，若期间又被触发，则重新设定周期，直到周期结束，执行动作。
 * @param fn 周期结束后的执行动作函数
 * @param delay 延迟时间（ms）
 * @returns 防抖函数
 */
export function debounce<T>(fn: Function, delay = 100) {
  let lastTime: number
  return function (this: T, ...args: T[]) {
    clearTimeout(lastTime)
    lastTime = setTimeout(() => {
      fn.apply(this, ...args)
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
  observer.observe(target, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
  return observer
}

/**
 * 随机生成UUID
 * @param hasHyphen 是否含连字符'-'
 * @returns 生成的UUID
 */
export function uuid(hasHyphen?: boolean) {
  return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 深度合并多个对象，后面对象的优先级更高
 * @param objs 要合并的对象
 * @returns 合并后的对象
 */
export function deepMerge(...objs: any[]) {
  return [...objs].reduce((acc, obj) => {
    const objKeys = Object.keys(obj)
    return objKeys.length > 0
      ? objKeys.reduce((a, k) => {
          acc[k] = acc[k] && acc[k].toString() === '[object Object]' ? deepMerge(acc[k], obj[k]) : obj[k]
          return acc
        }, {})
      : acc
  }, {})
}
