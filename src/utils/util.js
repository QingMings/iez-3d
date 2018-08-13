
import Cesium from 'cesium/Cesium'
const utils = {
  // 添加对iview dropDownMenu custom 自定义下拉 点击页面其他位置关闭下拉菜单的支持
  closeSupport: function (closeFunc) {
    var theNavigator
    if (typeof navigator !== 'undefined'){
      theNavigator = navigator
    }
    else {
      theNavigator = {}
    }
    var hasPointerEvents = typeof PointerEvent !== 'undefined' && (!Cesium.defined(theNavigator.pointerEnabled) || theNavigator.pointerEnabled)
    if (hasPointerEvents) {
      document.addEventListener('pointerdown',closeFunc,true)
    } else {
      document.addEventListener('mousedown', closeFunc,true)
      document.addEventListener('touchstart', closeFunc,true)
    }
  }
}

export default utils
