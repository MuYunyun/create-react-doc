import { canUseDOM } from '../utils/index'

let stickyName = 'sticky'

/**
 * 判断设备是否支持 sticky 属性
 */
const supportSticky = (function() {
  if (!canUseDOM) return false
  const testNode = document.createElement('div')
  let isSupportSticky = ['', '-webkit-', '-moz-', '-ms-'].some(prefix => {
    try {
      testNode.style.position = prefix + 'sticky'
    } catch (e) {}

    if (testNode.style.position !== '') {
      stickyName = testNode.style.position!
    }
    return testNode.style.position !== ''
  })
  return isSupportSticky
})()

export { supportSticky, stickyName }
