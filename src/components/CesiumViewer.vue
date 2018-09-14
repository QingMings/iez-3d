<template>
    <div id="cesiumContainer">
        <ToolBar/>
        <location-box/>
    </div>
</template>

<script>
import Iez3d from '../iez3d'
// noinspection ES6UnusedImports
import 'cesium/Widgets/widgets.css'
import LocalGeocoder from '../utils/LocalGeocoder'
import ToolBar from './widget/toolBar/ToolBar'
import LocationBox from './widget/LocationBox/LocationBox'

var iez3d
export default {
  name: 'CesiumViewer',
  components: {
    LocationBox,
    ToolBar
  },
  created () {
    // 测试 api 是否引用成功
    // console.info(`测试引入配置文件${JSON.stringify(api)}`)
  },
  data () {
    return {}
  },
  mounted () {
    iez3d = new Iez3d({
      container: 'cesiumContainer',
      debug: true,
      vue: this,
      viewerOptions: {
        timeline: true,
        baseLayerPicker: false,
        animation: true,
        infoBox: false,
        selectionIndicator: false,
        geocoder: new LocalGeocoder(),
        contextOptions: {
          webgl: {
            // support screenshots
            preserveDrawingBuffer: true
          }
        }
      },
      naviOptions: {

      }
    })
    // iez3d.test('测试实例方法啊')
  }

}
</script>

<style lang="less">
    @import "../assets/cesium-viewer";
</style>
