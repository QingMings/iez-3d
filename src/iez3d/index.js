import Cesium from 'cesium/Cesium'
import iezNavi from '@iezview/iez-navi/viewerCesiumNavigationMixin'
import CesiumMeasure from '../utils/CesiumMeasure'
import LocalGeocoder from '../utils/LocalGeocoder'
import Vue from 'vue'
import store from '../store/store'
import CesiumToolBarExtend from '../components/widget/ToolBarExtend/CesiumToolBarExtend'
import imageryViewModels from './layers/DefaultImageryProvider'
import {eventBus} from '../components/eventbus/EventBus'
import {error, info, isMobile, hasChild} from '../utils/util'
import {localLayers,getModelLayers,getImageLayers} from './layers/localLayers'

/**
 *@time: 2018/8/10上午9:48
 *@author:QingMings(1821063757@qq.com)
 *@desc:   放置一下和 cesium 相关方法
 *@param {viewerSelector} viewer Cesium.Viewer Dom Element
 *@param {{}} options  The Options
 */
const iez3d = function (options) {
  // 初始化 量测工具
  CesiumMeasure.init()
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
  // 设置默认视图矩形
  this.defaultViewRectangle(73, 4, 135, 53)
  this.viewer = new Cesium.Viewer(options.container, options.viewerOptions)
  this.camera = this.viewer.camera
  this.scene = this.viewer.scene
  this.handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
  this.imageryLayers = this.viewer.imageryLayers
  this.eventbus = eventBus
  this.drawTool = new Cesium.DrawTool({
    viewer: this.viewer,
    isMeasure: true,
    isClampGround: true
  })

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
  // this.addTdtImgAnnoLayer()
  this.baseLayerPicker()
  this.layerManager()
  // this.test('data/Cesium_Air.gltf', 5000.0)
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
/**
 * @time: 2018/8/22下午1:59
 * @author:QingMings(1821063757@qq.com)
 * @desc: 将 canvas 坐标转换
 * @param {Number} x   canvas  X coordinates
 * @param {Number} y   canvas  Y coordinates
 */
iez3d.prototype.canvasPositionToCartesian3 = function (x, y) {
  let cartesian3 = this.scene.globe.pick(this.camera.getPickRay(new Cesium.Cartesian2(x, y)), this.scene)
  return cartesian3
}
/**
 * @time: 2018/8/23上午9:48
 * @author:QingMings(1821063757@qq.com)
 * @desc: 天地图中文标注
 *
 */
iez3d.prototype.addTdtImgAnnoLayer = function () {
  this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: 'http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
    layer: '全球影像中文注记服务',
    style: 'default',
    format: 'image/jpeg',
    tileMatrixSetID: 'GoogleMapsCompatible',
    show: false
  }))
}

iez3d.prototype.addTdtGlogalImageLayer = function () {

}
/**
 * @time: 2018/8/23上午11:38
 * @author:QingMings(1821063757@qq.com)
 * @desc: 创建 Cesium BaseLayerPicker 控件
 *
 */
iez3d.prototype.baseLayerPicker = function () {
  let baseLayersPicker = new Cesium.BaseLayerPicker('BaseLayersPicker', {
    globe: this.scene.globe,
    imageryProviderViewModels: imageryViewModels
  })
}
/**
 * @time: 2018/8/27下午2:24
 * @author:QingMings(1821063757@qq.com)
 * @desc: 显示经纬度和高度信息
 *
 */
iez3d.prototype.showLatLonHeightProprety = function () {
  this.handler.setInputAction((movement) => {
    const scene = this.scene
    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      const pickedObject = scene.pick(movement.endPosition)
      if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
        const cartesian = scene.pickPosition(movement.endPosition)
        if (Cesium.defined(cartesian)) {
          const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
          const longStr = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8)
          const latStr = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8)
          const heightStr = cartographic.height.toFixed(2)
          console.log(`经度：`)
        }

      }
    }

  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}
/**
 * @time: 2018/8/29上午10:52
 * @author:QingMings(1821063757@qq.com)
 * @desc: 图层管理
 *
 */
iez3d.prototype.layerManager = function () {
  const that = this
  this.eventbus.$on('addDataSource', target => {
    // console.info(target)
    // console.info(this)
    this.add3DTileSet({name: target.title, url: target.serviceUrl}, tileSet => {
      this.scene.primitives.add(tileSet)
      this.viewer.zoomTo(tileSet)
    })

  })
  this.eventbus.$on('dataShow501', target => {
    const modelLayer = getModelLayers(target)
    if (modelLayer.length > 0) {
      modelLayer[0].primitive.show = true
    } else {
      that.add3DTileSet(target.serviceUrl, tileSet => {
        localLayers.modelLayers.push({title: target.title, primitive: tileSet})
        that.scene.primitives.add(tileSet)
        that.viewer.flyTo(tileSet)
      })
    }
  })
  this.eventbus.$on('dataHide501', target => {
    const modelLayer = getModelLayers(target)
    if (modelLayer.length > 0) {
      modelLayer[0].primitive.show = false
    }
  })

  this.eventbus.$on('zoomTo', target => {
    if (target.type === 501) {
      const modelLayer = getModelLayers(target)
      if (modelLayer.length > 0) {
        this.viewer.flyTo(modelLayer[0].primitive)
      }
    }
  })

  this.eventbus.$on('dataShow502', target => {
    const imageLayer = getImageLayers(target)
    if (imageLayer.length > 0) {
      imageLayer[0].layer.show = true
    } else {
      switch (target.layerType) {
        case 'wmts':
          that.addWmtsImageryProvider(target, layer => {
            localLayers.imageLayers.push({title: target.title, layer: layer})
          })
      }
    }
  })

  this.eventbus.$on('dataHide502', target => {
    const  imageLayer = getImageLayers(target)
    if (imageLayer.length >0) {
       imageLayer[0].layer.show = false
    }
  })
  /**
   * @time: 2018/9/3下午5:26
   * @author:QingMings(1821063757@qq.com)
   * @desc: 显示子节点数据 { target}
   *
   */
  this.eventbus.$on('showChildData', target => {
    if (target.children!= undefined && target.type != undefined){

    }
     this.eventbus.$emit(`dataShow${target.type}`); // 触发节点数据加载
  })
}
/**
 * @time: 2018/8/30下午1:44
 * @author:QingMings(1821063757@qq.com)
 * @desc: 添加 3dTileSet
 *
 */
iez3d.prototype.add3DTileSet = function (url, callBack) {
  let tileSet = new Cesium.Cesium3DTileset({
    url: url,
    maximumScreenSpaceError: isMobile() ? 8 : 1,
    maximumNumberOfLoadedTiles: isMobile() ? 10 : 500
  })
  tileSet.readyPromise.then(callBack).otherwise(err => {
    this.error(err)
  })
}
/**
 * @time: 2018/9/3下午1:48
 * @author:QingMings(1821063757@qq.com)
 * @desc: 添加 Wmts 图层
 *
 */
iez3d.prototype.addWmtsImageryProvider = function({title,serviceUrl,style,format,tileMatrixSetID,show},callback){
  let layer =  this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: serviceUrl,
    layer: title,
    style: style,
    format: format,
    tileMatrixSetID: tileMatrixSetID,
    show: show
  }))
  callback(layer)
}
/**
 * @time: 2018/8/30下午2:04
 * @author:QingMings(1821063757@qq.com)
 * @desc: 错误提示 依赖 {vue}  {iview.Message}
 *
 */
iez3d.prototype.error = function (message) {
  this.vueComponent.$Message.error(error(message))
}
/**
 * @time: 2018/8/30下午2:05
 * @author:QingMings(1821063757@qq.com)
 * @desc: 消息提示 依赖 {vue}  {iview.Message}
 *
 */
iez3d.prototype.info = function (message) {
  this.vueComponent.$Message.info(info(message))
}
// 测试加载 gltf
iez3d.prototype.test = function (url, height) {
  var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height)
  var heading = Cesium.Math.toRadians(135)
  var pitch = 0
  var roll = 0
  var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

  var entity = this.viewer.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000
    }
  })
  this.viewer.trackedEntity = entity
}
export default iez3d
