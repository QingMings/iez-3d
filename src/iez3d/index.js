import Cesium from 'cesium/Cesium'
import iezNavi from '@iezview/iez-navi/viewerCesiumNavigationMixin'
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
  this.defaultViewRectangle(73, 4, 135, 53)
  this.viewer = new Cesium.Viewer(options.container, options.viewerOptions)
  this.camera = this.viewer.camera
  this.scene = this.viewer.scene
  this.handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
  this.imageryLayers = this.viewer.imageryLayers
  // 显示帧率
  if (Cesium.defined(options.viewerOptions.geocoder) && (options.viewerOptions.geocoder instanceof LocalGeocoder)) {
    options.viewerOptions.geocoder.viewer = this.viewer
    // geoCoder 注入
    this.geocoder = options.viewerOptions.geocoder.viewer
  }
  // 导航插件
  if (Cesium.defined(options.naviOptions)) {
    iezNavi(this.viewer, options.naviOptions)
  }
  // 持有 CesiumViewer.vue 组件对象
  if (Cesium.defined(options.debug) && options.debug === true) {
    this.viewer.scene.debugShowFramesPerSecond = true
  }
  if (Cesium.defined(options.vue)) {
    this.vueComponent = options.vue
  }
  // 扩展 cesium toolbar 对象
  this.extendCesiumToolBar()
  console.info(this.imageryLayers)
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
/**
 *@time: 2018/8/15下午1:54
 *@author:QingMings(1821063757@qq.com)
 *@desc: 设置 cesium.Viewer 默认朝向
 * @param {Number} [west=0.0] The westernmost longitude in degrees in the range [-180.0, 180.0].
 * @param {Number} [south=0.0] The southernmost latitude in degrees in the range [-90.0, 90.0].
 * @param {Number} [east=0.0] The easternmost longitude in degrees in the range [-180.0, 180.0].
 * @param {Number} [north=0.0] The northernmost latitude in degrees in the range [-90.0, 90.0].
 */
iez3d.prototype.defaultViewRectangle = function (west, south, east, north) {
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(west, south, east, north)
}
export default iez3d
