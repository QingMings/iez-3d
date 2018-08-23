<template>
    <div id="ToolBar" class="iez-toolbar-left">
        <div class="iez-buttons">
            <!--图层管理按钮-->
            <Button shape="circle" title="图层管理" class="ivu-btn-circle ivu-btn-icon-only">
                <Icon type="md-switch"/>
            </Button>
            <Button shape="circle" title="底图设置" class="ivu-btn-circle ivu-btn-icon-only">
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

export default {
  name: 'ToolBar',
  components: {Coordinates},
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    closeSupport(this.dropDownCloseSupport)
    // 测试手机旋转屏幕事件
    window.addEventListener('orientationchange', function(event) {

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
    }
  }
}
</script>
<style lang="less">
    @import "../../../assets/iez-toolbar-left";
</style>
