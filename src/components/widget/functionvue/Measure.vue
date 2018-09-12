<template>
    <div class="dialog-wrap "  id="measure" >
    <div>
    <div>
        <Button type="primary" ghost @click="ClickLang">长度</Button>
        <Button type="primary" ghost @click="ClickArea">面积</Button>
        <Button type="primary" ghost @click="ClickHigh">高度</Button>
        <Button type="error" ghost>清除</Button>
    </div>
    </div>
    </div>
</template>

<script>
  import {eventBus} from '../../eventbus/EventBus'
 // var defaultList;
  export default {
    name: 'Measure',
    data(){
      return {
      }
    },
    mounted (){
      //defaultList=this.typeList;
    },

      methods: {
        ClickHigh:function(){
            eventBus.$emit('startmeasure');
        },
        ClickArea:function(){
        },
        ClickLang:function(){
        },
       },
  }
</script>

<style lang="less">
    @import "../../../assets/dialog";
</style>
