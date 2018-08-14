<template>
    <div id="cesiumContainer">
        <ToolBar></ToolBar>
        <!--<ToolBarR></ToolBarR>-->
    </div>
</template>

<script>
import Iez3d from '../iez3d'
// noinspection ES6UnusedImports
import 'cesium/Widgets/widgets.css'
import LocalGeocoder from '../utils/LocalGeocoder'
import ToolBar from './widget/toolBar/ToolBar'

var iez3d
export default {
  name: 'CesiumViewer',
  components: {
    ToolBar
  },
  created () {
    // 测试 api 是否引用成功
    console.info(`测试引入配置文件${JSON.stringify(api)}`)
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
        timeline: false,
        baseLayerPicker: false,
        animation: false,
        geocoder: new LocalGeocoder()

      }
    })
    // iez3d.test('测试实例方法啊')
  }

}
</script>

<style>

</style>
