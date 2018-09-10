import Cesium from 'cesium/Cesium'

let providerViewModels = []

providerViewModels.push(new Cesium.ProviderViewModel({
  name: 'ESRI World Imagery',
  iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
  tooltip: '\
World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution \
satellite imagery worldwide.  The map includes NASA Blue Marble: Next Generation 500m resolution imagery at small scales \
(above 1:1,000,000), i-cubed 15m eSAT imagery at medium-to-large scales (down to 1:70,000) for the world, and USGS 15m Landsat \
imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in \
parts of Western Europe from DigitalGlobe. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, \
i-cubed Nationwide Prime, Getmapping, AeroGRID, IGN Spain, and IGP Portugal.  Additionally, imagery at different resolutions has been \
contributed by the GIS User Community.\nhttp://www.esri.com',
  category: 'ArcGis',
  creationFunction: function () {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
      enablePickFeatures: false
    })
  }
}))

providerViewModels.push(new Cesium.ProviderViewModel({
  name: 'Bing Maps Aerial',
  iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),
  tooltip: 'Bing Maps aerial imagery, provided by Cesium ion',
  category: 'Cesium ion',
  creationFunction: function () {
    return Cesium.createWorldImagery({
      style: Cesium.IonWorldImageryStyle.AERIAL
    })
  }
}))
providerViewModels.push(new Cesium.ProviderViewModel({
  name: 'Bing Maps Aerial with Labels',
  iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerialLabels.png'),
  tooltip: 'Bing Maps aerial imagery with labels, provided by Cesium ion',
  category: 'Cesium ion',
  creationFunction: function () {
    return Cesium.createWorldImagery({
      style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
    })
  }
}))
providerViewModels.push(new Cesium.ProviderViewModel({
  name: 'Earth at night',
  iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/earthAtNight.png'),
  tooltip: 'The Earth at night, also known as The Black Marble, is a 500 meter resolution global composite imagery layer released by NASA.',
  category: 'Cesium ion',
  creationFunction: function () {
    return new Cesium.IonImageryProvider({assetId: 3812})
  }
}))
providerViewModels.push(new Cesium.ProviderViewModel({
  name: 'Blue Marble',
  iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/blueMarble.png'),
  tooltip: 'Blue Marble Next Generation July, 2004 imagery from NASA.',
  category: 'Cesium ion',
  creationFunction: function () {
    return new Cesium.IonImageryProvider({assetId: 3845})
  }
}))

providerViewModels.push(new Cesium.ProviderViewModel({
  name: 'ESRI World Street Map',
  iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
  tooltip: '\
This worldwide street map presents highway-level data for the world. Street-level data includes the United States; much of \
Canada; Japan; most countries in Europe; Australia and New Zealand; India; parts of South America including Argentina, Brazil, \
Chile, Colombia, and Venezuela; Ghana; and parts of southern Africa including Botswana, Lesotho, Namibia, South Africa, and Swaziland.\n\
http://www.esri.com',
  category: 'ArcGis',
  creationFunction: function () {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
      enablePickFeatures: false
    })
  }
}))

providerViewModels.push(new Cesium.ProviderViewModel({
  name: 'ESRI National Geographic',
  iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
  tooltip: '\
This web map contains the National Geographic World Map service. This map service is designed to be used as a general reference map \
for informational and educational purposes as well as a basemap by GIS professionals and other users for creating web maps and web \
mapping applications.\nhttp://www.esri.com',
  category: 'ArcGis',
  creationFunction: function () {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/',
      enablePickFeatures: false
    })
  }
}))
providerViewModels.push(new Cesium.ProviderViewModel({
  name: '天地图全球影像底图服务',
  iconUrl: Cesium.buildModuleUrl('http://service.tianditu.gov.cn/uploadfile/pic/1439126935969.jpg'),
  tooltip: '天地图全球影像底图服务',
  category: '天地图',
  creationFunction: () => {
    return new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
      layer: 'tdtBasicLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible'

    })
  }
}))

providerViewModels.push(new Cesium.ProviderViewModel({
  name: '全球矢量地图服务',
  iconUrl: Cesium.buildModuleUrl('http://service.tianditu.gov.cn/uploadfile/pic/1439355499988.jpg'),
  tooltip: '全球矢量地图服务',
  category: '天地图',
  creationFunction: () => {
    return new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
      layer: 'tdtBasicLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible'

    })
  }
}))
/**
 * @time: 2018/8/23上午11:17
 * @author:QingMings(1821063757@qq.com)
 * @desc: 配置 基础图层
 *
 */
export default providerViewModels
