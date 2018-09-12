<template>
    <div id="ToolBar" class="iez-toolbar-left">
        <div class="iez-buttons">
            <!--图层管理按钮-->
            <div ref="layerManagerWrapper" class="layer-manager-wrapper">
                <Button shape="circle" title="图层管理" @click="layerManagerDropDownHandler"
                        class="ivu-btn-circle ivu-btn-icon-only">
                    <Icon type="md-switch"/>
                </Button>
                <div class="layer-manager-dropDown" :class="{'layer-manager-dropDown-visible':layerManagerVisible }">
                    <div class="layerManagerTitle">图层管理</div>
                    <Tree :data="configData" ref="layerManagerTree" show-checkbox class="layer-manager-tree"
                          @on-node-check="onTreeItemChecked" @on-node-select="onTreeItemSelected"></Tree>
                </div>
            </div>
            <Button shape="circle" title="底图设置" @click="shareTest" class="ivu-btn-circle ivu-btn-icon-only">
                <Icon type="ios-map"/>
            </Button>
            <div ref="dropDownwrapper" class="dropDownwrapper">
                <Dropdown trigger="custom" @on-click="openDialog" :visible="visible" placement="bottom-start">
                    <Button shape="circle" title="常用工具" @click="dropDownHandler"
                            class="ivu-btn-circle ivu-btn-icon-only">
                        <Icon type="ios-hammer"/>
                    </Button>

                    <!--<DropdownMenu slot="list" class="iez-dropMenu" v-for="tool in tools" v-bind:key="data">-->
                    <!--<DropdownItem><span>{{tool}}}</span></DropdownItem>-->
                    <!--</DropdownMenu>-->
                    <DropdownMenu slot="list" class="iez-dropMenu">
                        <DropdownItem  name="coordinates" >坐标定位</DropdownItem>
                        <DropdownItem  name="measure">图上量算</DropdownItem>
                        <DropdownItem  name="flight">飞行漫游</DropdownItem>
                        <DropdownItem  name="MyMark">我的标记</DropdownItem>
                        <DropdownItem  name="Mapping">图上标绘</DropdownItem>
                        <DropdownItem  name="SectionAnalysis">剖面分析</DropdownItem>
                        <DropdownItem  name="FloodAnalysis">淹没分析</DropdownItem>
                        <DropdownItem  name="ShadowAnalysis">阴影分析</DropdownItem>
                        <DropdownItem  name="HorizonsAnalysis">可视域分析</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <Location ></Location>
        <Measure ></Measure>
        <SectionAnalysis ></SectionAnalysis>
        <!--<coordinates></coordinates>-->
        <MyMark ></MyMark>
        <Mapping ></Mapping>
        <Flight ></Flight>
        <FloodAnalysis></FloodAnalysis>
        <ShadowAnalysis></ShadowAnalysis>
        <HorizonsAnalysis></HorizonsAnalysis>
        <!--<test></test>-->
    </div>
</template>
<script type="text/javascript">
import {closeSupport, hasChild,openDia} from '../../../utils/util'
import Coordinates from '../../../views/coordinates'
import Location from '../functionvue/Location'
import SectionAnalysis from '../functionvue/SectionAnalysis'
import FloodAnalysis from '../functionvue/FloodAnalysis'
import ShadowAnalysis from '../functionvue/ShadowAnalysis'
import HorizonsAnalysis from '../functionvue/HorizonsAnalysis'
import MyMark from '../functionvue/MyMark'
import Measure from '../functionvue/Measure'
import Mapping from '../functionvue/Mapping'
import Flight from '../functionvue/Flight'
import {MapConfig} from '../../../iez3d/layers/MapConfig'
import {eventBus} from '../../eventbus/EventBus'
import {mapGetters} from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import {Event} from '../../../utils/constant'
// import {openDia} from '../../../utils/openLayer'
export default {
  name: 'ToolBar',
  components: { Coordinates ,
    Location,
    Measure,
    SectionAnalysis,
    MyMark,
    Mapping,
    Flight,
    FloodAnalysis,
    ShadowAnalysis,
    HorizonsAnalysis
  },
  data () {
    return {
      visible: false,
      layerManagerVisible: false,
      configData: MapConfig
    }
  },
  computed: {
    ...mapGetters({
      isShow:'getVis'
    }),
  },
  mounted () {
    closeSupport(this.dropDownCloseSupport)
    closeSupport(this.layerManagerDropDownCloseSupport)
    // 测试手机旋转屏幕事件
    window.addEventListener('orientationchange', function (event) {
    })
  },
  methods: {
    ...mapMutations({
      addMsg: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    dropDownHandler: function () {
      this.visible = !this.visible
    },
    dropDownCloseSupport: function (e) {
      if (this.$refs.dropDownwrapper !== undefined) {
        if (!this.$refs.dropDownwrapper.contains(e.target)) {
          this.visible = false
        }
      }
    },
    openDialog : function(itemName){
      switch (itemName) {
        case 'coordinates':
          openDia("#location","坐标定位");
          //openDia("#test");
          break;
        case 'flight':
          openDia("#flight","飞行漫游");
          break;
        case 'MyMark':
          openDia("#mymark","我的标记");
        break;
        case 'Mapping':
          openDia("#mapping","图上标绘");
          break;
        case 'SectionAnalysis':
          openDia("#sectionanalysis","剖面分析");
          break;
        case 'FloodAnalysis':
          openDia("#flood","淹没分析");
          break;
        case 'ShadowAnalysis':
          openDia("#shadow","阴影分析");
          break;
        case 'measure':
          openDia("#measure","图上量算");
          break;
        case 'HorizonsAnalysis':
          openDia("#horizons","可视域分析");
          break;

      }

      // console.info(itemName)
      // this.$store.dispatch("increment");
    },
    ...mapActions({
      isShowDia: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    showDialog: function (a) {
      this.$nextTick(() => {
        this.$modal.show('coordinatesGo', null, {draggable: true})
      })
    },
    shareTest: function () {
      eventBus.$emit('startmeasure');
            // layer.alert("helloWorld");
    },
    mytest: function () {

    },
    layerManagerDropDownHandler: function () {
      this.layerManagerVisible = !this.layerManagerVisible
    },
    layerManagerDropDownCloseSupport: function (e) {
      if (this.$refs.layerManagerWrapper !== undefined) {
        if (!this.$refs.layerManagerWrapper.contains(e.target)) {
          this.layerManagerVisible = false
        }
      }
    },
    onTreeItemCheckedChange (selectedList) {
      const filterByType = (node) => (node.type !== undefined)
      // console.info(a)
      // console.info(this.configData)
      var checked = this.$refs.layerManagerTree.getCheckedNodes()
      // var result = checked.filter(filterByType)
      // console.info(JSON.stringify(result))
      var result2 = this.configData
      console.info(JSON.stringify(result2))
      // const node = selectedList[selectedList.length - 1]
      // console.info(node.title)
    },
    onTreeItemChecked ({node, checked}) {
      if (hasChild(node)) {
        console.info('checked')
        eventBus.$emit(Event.ShowChildData, {node: node, checked: checked})
      } else {
        eventBus.$emit(Event.ShowData, {node: node, checked: checked})
      }
    },
    onTreeItemSelected (node) {
      eventBus.$emit(Event.FlyToData, node)
    }
  }
}
</script>
<style lang="less">
    @import "../../../assets/iez-toolbar-left";
    /*@import "~vue-ztreev3/css/metroStyle/metroStyle.css";*/
</style>
