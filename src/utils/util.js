import Cesium from 'cesium/Cesium'

/**
 * @time: 2018/8/20下午4:38
 * @author:QingMings(1821063757@qq.com)
 * @desc: 添加对iview dropDownMenu custom 自定义下拉 点击页面其他位置关闭下拉菜单的支持
 *
 */
export const closeSupport = (closeFunc) => {
  var theNavigator
  if (typeof navigator !== 'undefined') {
    theNavigator = navigator
  } else {
    theNavigator = {}
  }
  var hasPointerEvents = typeof PointerEvent !== 'undefined' && (!Cesium.defined(theNavigator.pointerEnabled) || theNavigator.pointerEnabled)
  if (hasPointerEvents) {
    document.addEventListener('pointerdown', closeFunc, true)
  } else {
    document.addEventListener('mousedown', closeFunc, true)
    document.addEventListener('touchstart', closeFunc, true)
  }
}
/**
 * @time: 2018/8/20下午4:37
 * @author:QingMings(1821063757@qq.com)
 * @desc: 判断是否是移动设备
 *
 */
export const isMobile = () => {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true
  } else {
    return false
  }
}

export default {
  closeSupport,
  isMobile
}
