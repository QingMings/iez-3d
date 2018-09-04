const localLayers = {
  // 影像图层
  imageLayers: [],
  // 模型图层
  modelLayers: []
}
/**
 * @time: 2018/9/3下午1:37
 * @author:QingMings(1821063757@qq.com)
 * @desc: 根据 {target} 获得 modelLayers
 *
 */
const getModelLayers = function (target) {
  return localLayers.modelLayers.filter(curModelLayer => {
    return curModelLayer.title === target.title
  })
}
/**
 * @time: 2018/9/3下午1:39
 * @author:QingMings(1821063757@qq.com)
 * @desc: 根据 {target} 获得 imageLayers
 *
 */
const getImageLayers = function (target) {
  return localLayers.imageLayers.filter( curImageLayer => {
    return curImageLayer.title === target.title
  })
}
export {
  localLayers,
  getModelLayers,
  getImageLayers
}
