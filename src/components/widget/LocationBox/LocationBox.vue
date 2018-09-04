<template>
    <div id="locationBox">{{locationInfo}}</div>
</template>

<script>
//显示经纬度高度信息
export default {
  props: [locationInfo],
  name: 'LocationBox'
}
</script>

<style scoped lang="less">
#locationBox {
    left: 2px;
    bottom: 2px;
    position: absolute;
    z-index: 99;
    padding: 3px 10px;
    font-size: 13px;
    color: #fff;
    text-shadow: 5px 2px 6px #000;
}
</style>
