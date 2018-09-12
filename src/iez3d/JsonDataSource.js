import Cesium from 'cesium/Cesium'

/**
 * @time: 2018/9/7下午5:30
 * @author:QingMings(1821063757@qq.com)
 * @desc: 加载 模型子数据
 *
 */
export default class JsonDataSource extends Cesium.CustomDataSource {

  constructor (name) {
    super(name)
  }

  jsonObjectTypes = {
    Polygon: this.processPolygon
  }

  load (data, options) {
    if (!Cesium.defined(data, options)) {
      throw new DeveloperError('data is required')
    }
    Cesium.DataSource.setLoading(this, true)

    let promise = data
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT)
    let sourceUri = options.sourceUri
    if (typeof data === 'string' || data instanceof Cesium.Resource) {
      data = Cesium.Resource.createIfNeeded(data)
      promise = data.fetchJson()
      sourceUri = Cesium.defaultValue(sourceUri, data.getUrlComponent())
    }
    let that = this
    return Cesium.when(promise, json => {
      return that.loadProcess(that, json, options, sourceUri)
    }).otherwise(error => {
      Cesium.DataSource.setLoading(that, false)
      that._error.raiseEvent(that, error)
      console.log(error)
      return Cesium.when.reject(error)
    })
  };

  loadProcess (that, json, options, sourceUri) {
    let name
    if (Cesium.defined(sourceUri)) {
      name = Cesium.getFilenameFromUri(sourceUri)
    }
    if (Cesium.defined(name) && that._name !== name) {
      that._name = that._name === undefined ? name : that._name
      that._changed.raiseEvent(that)
    }
    let typeHandler = that.jsonObjectTypes[options.dataType]
    if (!Cesium.defined(typeHandler)) {
      throw new Cesium.RuntimeError('Unsupportd dataType: ' + options.dataType)
    }
    return Cesium.when(json, json => {
      that._entityCollection.removeAll()
      typeHandler(that, json, options)
      Cesium.DataSource.setLoading(that, false)
      return Cesium.when(that)
    })
  }

  /**
   * @time: 2018/9/10上午10:58
   * @author:QingMings(1821063757@qq.com)
   * @desc:  处理生成 polygon
   * @param dataSource DataSource
   * @param json Polygon str
   * @param options options
   */
  processPolygon (dataSource, json, options) {
    let alpha
    alpha = Cesium.defined(options.alpha) ? options.alpha : 0.005;
    [].forEach.call(json, polygon => {
      dataSource.createPolygon(dataSource, polygon, alpha)
    })
  }

  /**
   * @time: 2018/9/10上午11:00
   * @author:QingMings(1821063757@qq.com)
   * @desc:  创建Polygon
   * @param polygon polygon str
   * @param alpha 透明度
   *
   */
  createPolygon (dataSource, polygon, alpha) {
    if (!Cesium.defined(polygon)) {
      return
    }
    const polyJsonStr = polygon.polyJson
    const polyptArr = JSON.parse(polyJsonStr)
    let polygonGraphics = new Cesium.PolygonGraphics()
    // polygonGraphics.outline = new Cesium.ConstantProperty(true)
    polygonGraphics.material = new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(alpha))
    polygonGraphics.hierarchy = JsonDataSource.buildCartesianArray(polyptArr)

    let entity = JsonDataSource.createObject(polygon, dataSource._entityCollection)
    entity.polygon = polygonGraphics
    let properties = {}
    properties.type = polygon.objType
    properties.areaId = polygon.areaId
    switch (polygon.objType) {
      case 0:
        properties.potId = polygon.potId
        entity.polygon.classificationType = Cesium.ClassificationType.CESIUM_3D_TILE
        break
      case 2:
        entity.polygon.height = Number(polygon.offsetHeight)
        entity.polygon.extrudedHeight = Number(polygon.extrudeHeight)
    }
    entity.properties = properties
  }

  static buildCartesianArray (polyptArr) {
    let positions = new Array(polyptArr.length)
    for (let i = 0; i < polyptArr.length; i++) {
      positions[i] = Cesium.Cartesian3.fromElements(polyptArr[i].x, polyptArr[i].y, polyptArr[i].z)
    }
    return positions
  }

  // 创建实体对象，copy子 geoJsonDataSource,
  static createObject (json, entityCollection) {
    let id = json.guid
    if (!Cesium.defined(id)) {
      id = Cesium.createGuid()
    } else {
      let i = 2
      var finalId = id
      while (Cesium.defined(entityCollection.getById(finalId))) {
        finalId = id + '_' + i
        i++
      }
      id = finalId
    }

    let entity = entityCollection.getOrCreateEntity(id)
    entity.name = json.name
    return entity
  }

  toString () {
    return this.name + '_JsonDataSource'
  }
}
