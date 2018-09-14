import Cesium from 'cesium/Cesium'

/**
 *@time: 2018/8/13下午5:21
 *@author:QingMings(1821063757@qq.com)
 *@desc: 实体geoCoder查询, 使用时需要 传入 viewer 和 需要匹配的数组
 *
 */
function LocalGeocoder () {

}
/**
 *@time: 2018/8/13下午5:35
 *@author:QingMings(1821063757@qq.com)
 *@desc: 重写 {Cesium.Geocode} 类的 geocode 方法，自己实现搜索实体功能
 *@param entityId 实体名称关键字
 */
LocalGeocoder.prototype.geocode = function (entityId) {
  if (!Cesium.defined(this.viewer)) {
    throw new Cesium.DeveloperError('LocalGeocoder.viewer 是必须的')
  }
  const matchArr = regexMatch(entityId, array)
  const result = matchArr.map(resObj => {
    const entityPosition = resObj.position.getValue(viewer.clock.currentTime)
    const cartographic = Cesium.Cartographic.fromCartesian(entityPosition)
    const longitudeStr = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8)
    const latitudeStr = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8)
    const endPosition = Cesium.Cartesian3.fromDegrees(Number(longitudeStr), Number(latitudeStr), 50.0)
    return {
      displayName: resObj.name,
      destination: endPosition
    }
  })
  const deferred = Cesium.when.defer()
  return deferred.resolve(result)
}

/**
 *@time: 2018/8/13下午5:24
 *@author:QingMings(1821063757@qq.com)
 *@desc: 从数组中匹配 包含关键字的项
 *@param literalString 关键字
 *@param targetArr  需要匹配的数组
 */
function regexMatch (literalString, targetArr) {
  const matchBin = []
  const oRegex = new RegExp(literalString)
  for (let i = 0; i < targetArr.length; i++) {
    const item = String(targetArr[i].name).search(oRegex)
    if (item > -1) {
      matchBin.push(targetArr[i])
    }
  }
  return matchBin
}

let viewer
let array = []
// 合并实体数据
export  const publishData = data => {
  array =array.concat(data)
}
// geocoder 传入 viewer 对象
export const initViewer = mviewer => {
  viewer = mviewer
}

export default LocalGeocoder
