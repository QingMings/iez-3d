<template>
    <div class="dialog-wrap "  id="measure" >
    <div>
    <div>
        <Button type="primary" ghost @click="ClickLine">长度</Button>
        <Button type="primary" ghost @click="ClickArea">面积</Button>
        <Button type="primary" ghost @click="ClickHigh">高度</Button>
        <Button type="error" ghost @click="ClickClear">清除</Button>
    </div>
    </div>
    </div>
</template>

<script>
  import {eventBus} from '../../eventbus/EventBus'
  import {MeasureType, ToolsEvent} from '../../../iez3d/eventhandler/ToolCaseEventHandler'
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
           eventBus.$emit(ToolsEvent.Measure,MeasureType.High);
        },
        ClickArea:function(){
          eventBus.$emit(ToolsEvent.Measure,MeasureType.Area);
        },
        ClickLine:function(){
          eventBus.$emit(ToolsEvent.Measure,MeasureType.Line);
        },
        ClickClear:function(){
          eventBus.$emit(ToolsEvent.Measure,MeasureType.Clear);
        },
       },
  }
</script>

<style lang="less">
    @import "../../../assets/dialog";
</style>
