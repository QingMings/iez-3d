<template>
    <foo-modal name="coordinatesGo" :adaptive="adaptive" :draggable="draggable" :resizable="resizable" classes="iez-modal-coordinatesGo" >

    </foo-modal>
</template>

<script>
/**
 * @time: 2018/8/16下午2:08
 * @author:QingMings(1821063757@qq.com)
 * @desc: 坐标定位 Model
 *
 */
export default {
  name: 'coordinates',
  data () {
    return {
      resizable: true,
      draggable: true,
      adaptive: true
    }
  }
}
</script>

<style  lang="less">
    @import "../assets/iez-modal";
</style>
