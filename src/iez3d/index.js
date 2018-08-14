import Cesium from 'cesium/Cesium'
import LocalGeocoder from '../utils/LocalGeocoder'
import Vue from 'vue'
import store from '../store/store'
import CesiumToolBarExtend from '../components/widget/ToolBarExtend/CesiumToolBarExtend'

/**
 *@time: 2018/8/10上午9:48
 *@author:QingMings(1821063757@qq.com)
 *@desc:   放置一下和 cesium 相关方法
 *@param {viewerSelector} viewer Cesium.Viewer Dom Element
 *@param {{}} options  The Options
 */
const iez3d = function (options) {
  this.init(options)
}

/***
 * 初始化函数
 *@param {{}} options  The Options
 */
iez3d.prototype.init = function (options) {
  if (!Cesium.defined(options) || !Cesium.defined(options.container)) {
    throw new Cesium.DeveloperError('options.container 是必须的')
  }
  if (!Cesium.defined(options.viewerOptions)) {
    throw new Cesium.DeveloperError('options.viewerOptions 是必须的')
  }
  this.viewer = new Cesium.Viewer(options.container, options.viewerOptions)
  this.camera = this.viewer.camera
  this.scene = this.viewer.scene
  this.handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
  // geoCoder 注入
  if (Cesium.defined(options.viewerOptions.geocoder) && (options.viewerOptions.geocoder instanceof LocalGeocoder)) {
    options.viewerOptions.geocoder.viewer = this.viewer
    this.geocoder = options.viewerOptions.geocoder.viewer
  }
  // 显示帧率
  if (Cesium.defined(options.debug) && options.debug === true) {
    this.viewer.scene.debugShowFramesPerSecond = true
  }
  if (Cesium.defined(options.vue)) {
    this.vueComponent = options.vue
  }
  this.extendCesiumToolBar()
}
/**
 *@time: 2018/8/12下午1:43
 *@author:QingMings(1821063757@qq.com)
 *@desc: 测试实例方法
 *
 */
iez3d.prototype.test = function (key) {
  console.info(key)
}
/**
 *@time: 2018/8/14上午11:38
 *@author:QingMings(1821063757@qq.com)
 *@desc: 扩展 cesium ToolBar
 */
iez3d.prototype.extendCesiumToolBar = function () {
  var ToolBarExt = Vue.extend(CesiumToolBarExtend)
  var component = new ToolBarExt({store: store, parent: this.vueComponent}).$mount()
  document.getElementsByClassName('cesium-viewer-toolbar').item(0).appendChild(component.$el)
}

export default iez3d
