// 数据分类
const DataType = {
  modelData: '3dTiles',
  imageryData: 'imagery',
  subData: 'subData',
  category: 'category'
}
// 事件类型
const Event = {
  // 含有child的节点
  ShowChildData: 'showChildData',
  // 没有child的节点
  ShowData: 'showData',
  // FlyTo 事件
  FlyToData: 'flyToData',
  // ZoomTo 事件
  ZoomToData: 'zoomToData',
  // screenshots 截图
  ScreenShots: 'screenShots',
  // 更新LocationBox
  UpdateLatLon: 'updateLatLon'
}
// 子数据类型
const SubDataType={
  Point: 'Point',
  Polygon: 'Polygon'

}
// 子数据格式
const SubDataFormat= {
  GeoJson: 'geoJson',
  Json: 'json'
}
export {
  DataType,
  Event,
  SubDataType,
  SubDataFormat
}
