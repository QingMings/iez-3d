import Cesium from 'cesium/Cesium'
import {DataType, Event, SubDataFormat, SubDataType} from '../utils/constant'
import Vue from 'vue'
import {getModelLayers, getSubData, getSubDatas, localLayers} from './layers/localLayers'
import {isMobile, subDataGen} from '../utils/util'
import JsonDataSource from './JsonDataSource'

/**
 * @time: 2018/9/11下午4:55
 * @author:QingMings(1821063757@qq.com)
 * @desc: 数据管理类 提供对数视图点击操作做对应的响应
 * @param {iez3d} iez3d 实例对象
 */
export default class LayerManager {
  constructor (iez3d) {
    if (!Cesium.defined(iez3d)) {
      throw new Cesium.DeveloperError('iez3d 参数是必须的')
    }
    this.viewer = iez3d.viewer
    this.camera = iez3d.camera
    this.scene = iez3d.scene
    this.handler = iez3d.handler
    this.eventbus = iez3d.eventbus
    this.iez3d = iez3d
    this.init()
  }
  // 初始化 事件监听
  init () {
    const that = this
    //
    this.eventbus.$on(Event.ShowChildData, ({node, checked, parent}) => {
      switch (node.type) {
        case DataType.category:
          node.children.map(child => {
            that.eventbus.$emit(Event.ShowChildData, {node: child, checked: child.checked, parent: node})
          })
          break
        case DataType.modelData:
          if (checked) {
            that.showModalLayer({node: node, parent: parent}).then(() => {
              that.loadSubDatas({node: node})
            })
          } else {
            that.hideModalLayer({node: node, parent: parent})
          }

          break
        case DataType.imageryData:

          break
        case DataType.subData:
          that.loadSubData({node: node, parent: parent})
          break
      }
    })

    this.eventbus.$on(Event.ShowData, ({node, checked, parent}) => {
      switch (node.type) {
        case DataType.modelData:
          if (checked) {
            that.showModalLayer({node: node, parent: parent})
          } else {
            that.hideModalLayer({node: node})
          }
          break
        case DataType.imageryData:
          break
        case DataType.subData:
          if (checked) {
            that.loadSubData({node: node, parent: parent})
          } else {
            that.hideSubData({node: node, parent: parent})
          }
          break
      }
    })

    // FlyTo 模型数据
    this.eventbus.$on(Event.FlyToData, target => {
      if (target.type === DataType.modelData) {
        const modelLayer = getModelLayers(target)
        if (modelLayer.length > 0) {
          this.viewer.flyTo(modelLayer[0].primitive)
        }
      }
    })
  }

  // addModalLayer 的包装 ，根据模型数据的数量 判断了是否FlyTo
  showModalLayer = ({node, parent}) => {
    // 只有一个的时候 flyTo
    if (parent !== undefined && parent.type === DataType.category && parent.checked) {
      return this.addModalLayer({target: node, isFlyTo: false})
    } else {
      return this.addModalLayer({target: node, isFlyTo: true})
    }
  }

  // 加载 所有subdData
  loadSubDatas = ({node}) => {
    // 没有subdata的 跳过
    if (node.children === undefined) {
      return
    }
    node.children.map(subData => {
      Vue.set(subData, 'checked', true)
      this.eventbus.$emit(Event.ShowChildData, {node: subData, checked: subData.checked, parent: node})
    })
  }

  // 加载子数据
  loadSubData = ({node, parent}) => {
    if (!node.checked) {
      return
    }
    if (!parent.checked) {
      Vue.set(parent, 'checked', true)
      this.showModalLayer({node: parent}).then(() => {
        this.loadSubDataProcess({node: node, parent: parent})
      })
    } else {
      this.loadSubDataProcess({node: node, parent: parent})
    }

  }
  loadSubDataProcess = ({node, parent}) => {
    const modalLayer = getModelLayers(parent)
    if (modalLayer.length > 0) {
      const subDatas = getSubDatas(modalLayer[0])
      switch (node.dataType) {
        case SubDataType.Point:
          switch (node.format) {
            // 加载点位数据，数据源为 geoJson
            case SubDataFormat.GeoJson:
              const findSubData = getSubData(subDatas, node)
              if (findSubData.length > 0) {
                findSubData[0].dataSource.show = true
              } else {
                let geoJsonDataSource = new Cesium.GeoJsonDataSource()
                geoJsonDataSource.load(node.serviceUrl).then(dataSource => {
                  this.viewer.dataSources.add(dataSource)
                  // 复制属性出来，防止vue跟踪报错
                  let subdata = subDataGen(node, subDatas, dataSource)
                  let entitys = dataSource.entities.values
                  entitys.forEach((item, index) => {
                    const color = item.properties.color.getValue(this.viewer.clock.currentTime)
                    item.billboard = {
                      image: node.icon,
                      show: true,
                      color: Cesium.Color.fromCssColorString(color),
                      scale: 1.0,
                      disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                  })
                  return Cesium.when(dataSource)
                }).then(dataSource => {
                  // console.info(dataSource.entities.values.length)
                  // TODO 这里可以用于处理实体hover 显示dom 事件
                }).otherwise(error => {
                  this.error(error)
                  Vue.set(node,'disabled',true)
                })
              }
              break
          }
          break
        case SubDataType.Polygon:
          switch (node.format) {
            // 加载多边形数据，如海三联区域数据和 油罐建筑数据
            case SubDataFormat.Json:
              const findSubdata = getSubData(subDatas, node)
              if (findSubdata.length > 0) {
                findSubdata[0].dataSource.show = true
              } else {
                let jsonDataSource = new JsonDataSource(node.title)
                jsonDataSource.load(node.serviceUrl, {dataType: node.dataType, alpha: 0.005}).then(dataSource => {
                  this.viewer.dataSources.add(dataSource)
                  let subdata = subDataGen(node, subDatas, dataSource)
                }).otherwise(err => {
                  this.error(err)
                  Vue.set(node,'disabled',true)
                })
              }
          }
          break
      }
    }
  }
// 加载 模型数据
  addModalLayer = ({target, isFlyTo}) => {
    return new Promise((resolve, regect) => {
      const modelLayer = getModelLayers(target)
      if (modelLayer.length > 0) {
        modelLayer[0].primitive.show = true
        if (isFlyTo) this.viewer.flyTo(modelLayer[0].primitive)
        resolve()
      } else {
        this.add3DTileSet(target.serviceUrl, tileSet => {
          localLayers.modelLayers.push({title: target.title, primitive: tileSet})
          this.scene.primitives.add(tileSet)
          if (isFlyTo) this.viewer.flyTo(tileSet)
          resolve()
        })
      }
    })
  }
  // 隐藏 模型数据
  hideModalLayer = ({node, parent}) => {
    const modelLayer = getModelLayers(node)
    if (modelLayer.length > 0) {
      modelLayer[0].primitive.show = false
      const subDatas = getSubDatas(modelLayer[0])
      if (subDatas.length > 0) {
        // 隐藏subData子数据
        [].forEach.call(subDatas, subData => {
          subData.dataSource.show = false
        })
        node.children.map(child => {
          if (child.checked !== undefined) {
            Vue.set(child, 'checked', false)
          }
        })
      }
    }
  }
  // 隐藏 子数据
  hideSubData = ({node, parent}) => {
    switch (parent.type) {
      case DataType.modelData:
        const modelLayer = getModelLayers(parent)
        if (modelLayer.length > 0) {
          const subdatas = getSubDatas(modelLayer[0])
          if (subdatas.length > 0) {
            const findSubData = getSubData(subdatas, node)
            if (findSubData.length > 0) {
              findSubData[0].dataSource.show = false
              Vue.set(node, 'checked', false)
            }
          }
        }
        break
    }
  }

  /**
   * @time: 2018/8/30下午1:44
   * @author:QingMings(1821063757@qq.com)
   * @desc: 添加 3dTileSet
   *
   */
  add3DTileSet = function (url, callBack) {
    let tileSet = new Cesium.Cesium3DTileset({
      url: url,
      maximumScreenSpaceError: isMobile() ? 8 : 1,
      maximumNumberOfLoadedTiles: isMobile() ? 10 : 500
    })
    tileSet.readyPromise.then(callBack).otherwise(err => {
      this.error(err)
    })
  }
  // 错误提示
  error(err){
    this.iez3d.error(err)
  }
}
