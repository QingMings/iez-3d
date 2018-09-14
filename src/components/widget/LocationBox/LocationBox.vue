<template>
    <div id="locationBox">{{locationInfo}}</div>
</template>

<script>
import {eventBus} from '../../eventbus/EventBus'
// 显示经纬度高度信息
export default {
  name: 'LocationBox',
  data () {
    return {
      locationInfo: ''
    }
  },
  mounted () {
    eventBus.$on('updateLatLon', info => {
      this.locationInfo = info
    })
  }

}
</script>

<style scoped lang="less">
    #locationBox {
        left: 170px;
        bottom: 27px;
        position: absolute;
        z-index: 99;
        padding: 3px 10px;
        font-size: 13px;
        color: #fff;
        text-shadow: 5px 2px 6px #000;
    }
</style>
