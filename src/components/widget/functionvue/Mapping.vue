<template>
    <div class="dialog-wrap " id="mapping" style="width:360px">
        <div>
            <div>
                <Button type="primary" ghost @click="PointClick">点标注</Button>
                <Button type="primary" ghost @click="LineClick">线标注</Button>
                <Button type="primary" ghost @click="PolygonClick">面标注</Button>
                <Button type="primary" ghost @click="TitleClick">文字标注</Button>
                <Button type="error" ghost @click="ClearClick">清除</Button>
            </div>
            <div style="margin-top: 5px">
                修改文字标注：<input class="input"  v-on:change="ChangeTitle" v-model="valueTitle"/>
            </div>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  import PanelTable from 'iview/src/components/date-picker/base/mixin'
  import {eventBus} from '../../eventbus/EventBus'
  import {mapGetters} from 'vuex'
  import {MarkType, ToolsEvent} from '../../../iez3d/eventhandler/ToolCaseEventHandler'
  export default {
    name: 'Mapping',
    components: {PanelTable},
    data(){
      return {
        iss:false,
        valueTitle:'文字'
      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters('settingModule', {
        getEnableTerrain: 'getEnableTerrain'
      })
    },
    methods: {
      PointClick:function(){
        eventBus.$emit(ToolsEvent.Mapping,{type: MarkType.Point,status: this.getEnableTerrain});
      },
      LineClick:function(){
        eventBus.$emit(ToolsEvent.Mapping,{type: MarkType.Line,status: this.getEnableTerrain});
      },
      PolygonClick:function(){
        eventBus.$emit(ToolsEvent.Mapping,{type: MarkType.Polygon,status: this.getEnableTerrain});
      },
      TitleClick:function(){
        eventBus.$emit(ToolsEvent.Mapping,{type: MarkType.Title,status: this.getEnableTerrain});
      },
      ClearClick:function(){
        eventBus.$emit(ToolsEvent.Mapping,{type: MarkType.Clear,status: this.getEnableTerrain});
      },
      ChangeTitle:function(){
        eventBus.$emit(ToolsEvent.Mapping,{type: MarkType.ChangeTitle,status: this.getEnableTerrain,val:this.valueTitle});
      }
    },
  }
</script>

<style scoped>

</style>
