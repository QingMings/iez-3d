import Cesium from 'cesium/Cesium'
import {DataType, Event, SubDataFormat, SubDataType} from '../../utils/constant'
import Vue from 'vue'
import {getImageLayers, getModelLayers, getSubData, getSubDatas, localLayers} from '../layers/localLayers'
import {isMobile, subDataGen} from '../../utils/util'
import JsonDataSource from '../JsonDataSource'

/**
 * @time: 2018/9/11下午4:55
 * @author:QingMings(1821063757@qq.com)
 * @desc: 数据管理类 提供对数视图点击操作做对应的响应
 * @param {iez3d} iez3d 实例对象
 */
export default class LayerManagerEventHandler {
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
    this.defaultEntityAlpha = 0.005
    this.highlightEntityAlpha = 0.5

    this.init()
    this.highlightSupport()
    this.selectedSupport()
  }

  // 初始化 事件监听
  init () {
    const that = this
    // 有子节点的 node 的监听
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
          if (checked) {
            that.addImageryLayer(node)
          } else {
            that.hideImageryLayer(node)
          }
          break
        case DataType.subData:
          that.loadSubData({node: node, parent: parent})
          break
      }
    })
    // 没有子节点的 node 的监听
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
          if (checked) {
            that.addImageryLayer(node)
          } else {
            that.hideImageryLayer(node)
          }
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
                  Vue.set(node, 'disabled', true)
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
                  Vue.set(node, 'disabled', true)
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
  // 加载 图层选项
  addImageryLayer = function (target) {
    const imageLayer = getImageLayers(target)
    if (imageLayer.length > 0) {
      imageLayer[0].layer.show = true
    } else {
      switch (target.layerType) {
        case 'wmts':
          this.addWmtsImageryProvider(target, layer => {
            localLayers.imageLayers.push({title: target.title, layer: layer})
          })
          break
      }
    }
  }

  hideImageryLayer = function (target) {
    const imageLayer = getImageLayers(target)
    if (imageLayer.length > 0) {
      imageLayer[0].layer.show = false
    }
  }
  /**
   * @time: 2018/9/3下午1:48
   * @author:QingMings(1821063757@qq.com)
   * @desc: 添加 Wmts 图层
   *
   */
  addWmtsImageryProvider = function ({title, serviceUrl, style, format, tileMatrixSetID, show}, callback) {
    let layer = this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      url: serviceUrl,
      layer: title,
      style: style,
      format: format,
      tileMatrixSetID: tileMatrixSetID,
      show: show
    }))
    callback(layer)
  }

  // 错误提示
  error (err) {
    this.iez3d.error(err)
  }

  highlightSupport () {
    this.highlighted = {
      feature: undefined,
      originalColor: Cesium.Color.RED.withAlpha(this.defaultEntityAlpha)
    }
    let pickId
    let PolygonNameOverlay = document.createElement('div')
    this.viewer.container.appendChild(PolygonNameOverlay)
    this.defaultNameOverlayStyle(PolygonNameOverlay)
    let BillboardNameOverlay = document.createElement('div')
    this.viewer.container.appendChild(BillboardNameOverlay)
    this.defaultNameOverlayStyle(BillboardNameOverlay)
    // selected Entity
    let selected = {
      feature: undefined,
      originalColor: new Cesium.Color()
    }

    this.handler.setInputAction(movement => {
      if (this.scene.mode !== Cesium.SceneMode.MORPHING) {
        const pickedObject = this.scene.pick(movement.endPosition)
        if (this.scene.pickPositionSupported && Cesium.defined(pickedObject)) {
          const pickEntity = Cesium.defaultValue(pickedObject.id, pickedObject.primitive.id)
          if (Cesium.defined(pickEntity)) {
            if (pickEntity instanceof Cesium.Entity && pickEntity.billboard) {
              this.highlightReset()
              this.updateNameOverlayStyle(BillboardNameOverlay, movement)
              let name = Cesium.defaultValue(pickEntity.name, pickEntity.id)
              BillboardNameOverlay.textContent = name
              hidePolygonNameOverlay()
            } else if (pickEntity instanceof Cesium.Entity && pickEntity.polygon) {
              this.highlightReset()
              this.updateNameOverlayStyle(PolygonNameOverlay, movement)
              let name = Cesium.defaultValue(pickEntity.name, pickEntity.id)
              PolygonNameOverlay.textContent = name
              this.highlightedEntity(pickEntity)
              hideBillboardNameOverlay()
            }
          } else {
            hideNameOverlay()
          }
        } else {
          hideNameOverlay()
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    const hidePolygonNameOverlay = () => PolygonNameOverlay.style.display = 'none'
    const hideBillboardNameOverlay = () => BillboardNameOverlay.style.display = 'none'
    const hideNameOverlay = () => {hidePolygonNameOverlay();hideBillboardNameOverlay(); }
  }

  // 重置高亮的实体
  highlightReset = () => {
    if (Cesium.defined(this.highlighted.feature)) {
      this.highlighted.feature.polygon.material.color = this.highlighted.originalColor
      this.highlighted.feature = undefined
    }
  }
  // 高亮实体
  highlightedEntity = entity => {
    this.highlighted.feature = entity
    Cesium.Color.clone(entity.polygon.material.color.getValue(this.viewer.clock.currentTime), this.highlighted.originalColor)
    entity.polygon.material.color.setValue(Cesium.Color.YELLOW.withAlpha(this.highlightEntityAlpha))
  }

  // nameOverlay default style
  defaultNameOverlayStyle (nameOverlay) {
    nameOverlay.className = ' iez-nameOverlay'
    nameOverlay.style.display = 'none'
    nameOverlay.style.position = 'absolute'
    nameOverlay.style.bottom = '0'
    nameOverlay.style.left = '0'
    nameOverlay.style['pointer-events'] = 'none'
    nameOverlay.style.padding = '4px'
    // nameOverlay.style.backgroundColor = 'green'
    nameOverlay.style.color = 'white'
  }

  // change nameOverlay style on mouse hover entities
  updateNameOverlayStyle (nameOverlay, movement) {
    nameOverlay.style.display = 'block'
    nameOverlay.style.bottom = this.viewer.canvas.clientHeight - movement.endPosition.y + 'px'
    nameOverlay.style.left = movement.endPosition.x + 'px'
  }

  pickObject (callBack, eventType) {
    this.handler.setInputAction(movement => {
      if (this.scene.mode !== Cesium.SceneMode.MORPHING) {
        const pickedObject = this.scene.pick(movement.endPosition)
        if (this.scene.pickPositionSupported && Cesium.defined(pickedObject)) {
          callBack(pickedObject, movement)
        }
      }
    }, eventType)
  }

  // 选中Polygon 支持
  selectedSupport () {
    this.pickObject((pickedObject, leftClick) => {
      const pickEntity = Cesium.defaultValue(pickedObject.id, pickedObject.primitive.id)
      if (pickEntity instanceof Cesium.Entity && pickEntity.polygon) {
        this.highlightReset()
        this.highlightedEntity(pickEntity)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
}
