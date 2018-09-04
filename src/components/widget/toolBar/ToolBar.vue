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
                <Dropdown trigger="custom" @on-click="showDialog" :visible="visible" placement="bottom-start">
                    <Button shape="circle" title="常用工具" @click="dropDownHandler"
                            class="ivu-btn-circle ivu-btn-icon-only">
                        <Icon type="ios-hammer"/>
                    </Button>

                    <!--<DropdownMenu slot="list" class="iez-dropMenu" v-for="tool in tools" v-bind:key="data">-->
                    <!--<DropdownItem><span>{{tool}}}</span></DropdownItem>-->
                    <!--</DropdownMenu>-->
                    <DropdownMenu slot="list" class="iez-dropMenu">
                        <DropdownItem name="coordinates">坐标定位</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <coordinates></coordinates>
    </div>
</template>
<script type="text/javascript">
import {closeSupport} from '../../../utils/util'
import Coordinates from '../../../views/coordinates'
// import 'jquery'
// import 'vue-ztreev3/js/jquery.ztree.all'
// import 'vue-ztreev3/css/zTreeStyle/zTreeStyle.css'
import {MapConfig} from '../../../iez3d/layers/MapConfig'
import {eventBus} from '../../eventbus/EventBus'

export default {
  name: 'ToolBar',
  components: {Coordinates},
  data () {
    return {
      visible: false,
      layerManagerVisible: false,
      configData: MapConfig
    }
  },
  mounted () {
    closeSupport(this.dropDownCloseSupport)
    closeSupport(this.layerManagerDropDownCloseSupport)
    // 测试手机旋转屏幕事件
    window.addEventListener('orientationchange', function (event) {
    })
  },
  methods: {
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
    showDialog: function (a) {
      this.$nextTick(() => {
        this.$modal.show('coordinatesGo', null, {draggable: true})
      })
    },
    shareTest: function () {

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
      if (node.children !== undefined) {
        if (checked) {
          eventBus.$emit(`showChildData`, node)
        } else if (!checked) {
          eventBus.$emit(`hideChildData`, node)
        }
      } else {
        // console.info(JSON.stringify({'nodeName':node.title, 'nodeStatus': checked}))
        if (checked) {
          eventBus.$emit(`dataShow${node.type}`, node)
        } else if (!checked) {
          eventBus.$emit(`dataHide${node.type}`, node)
        }
      }
    },
    onTreeItemSelected (node) {
      eventBus.$emit(`zoomTo`, node)
    }
  }
}
</script>
<style lang="less">
    @import "../../../assets/iez-toolbar-left";
    /*@import "~vue-ztreev3/css/metroStyle/metroStyle.css";*/
</style>
