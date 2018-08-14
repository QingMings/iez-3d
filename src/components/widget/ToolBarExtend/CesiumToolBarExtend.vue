<template>
    <span class="iez-toolbar-right">
        <!--cesium toolbar 扩展-->
        <div class="iez-toolbar-ext">
            <!--用户头像-->
            <div class="iez-avatar " :title="user.userName">
                <Badge>
                    <Avatar shape="square" icon="person" :src="user.userProfile" tabindex="0"></Avatar>
                </Badge>
            </div>
            <!--设置-->
            <div ref="settingWrapper" class="iez-setting-wrapper " >
               <Dropdown trigger="custom" :visible="visible" placement="bottom-start">
                   <div @click='settingDropDownHandler' title="设置">
                       <Badge>
                           <Avatar shape="square" icon="ios-options" tabindex="0" ></Avatar>
                       </Badge>
                   </div>
                   <DropdownMenu slot="list" class="iez-dropMenu" v-for="(data, index) in settings" v-bind:key="data">
                       <DropdownItem :title="data">
                         <span>{{data}} </span>  <i-switch size="small" :name="data" :value="getSetting(index)" :disabled="isEnabled(index)" @on-change="switchChange(data, $event)"></i-switch>
                       </DropdownItem>
                   </DropdownMenu>
               </Dropdown>
            </div>
        </div>
    </span>
</template>
<script type="text/javascript">
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'CesiumToolBarExtend',
  data () {
    return {
      settings: ['热点标注','建筑标注'],
      visible: false
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({}),
    ...mapGetters('userModule', {
      user: 'getUser'
    }),
    ...mapGetters('settingModule',{
      getSettingByIndex: 'getSettingByIndex'
    })
  },
  methods: {
    /**
     *@time: 2018/8/14下午3:39
     *@author:QingMings(1821063757@qq.com)
     *@desc: 收缩 展开 设置下拉菜案
     *
     */
    settingDropDownHandler: function () {
      this.visible = !this.visible
    },
    /**
     *@time: 2018/8/14下午3:41
     *@author:QingMings(1821063757@qq.com)
     *@desc:  设置项 switch 开关状态 提交到 vuex 中
     *
     */
    switchChange: function (data, status) {

    },
    /**
     *@time: 2018/8/14下午3:43
     *@author:QingMings(1821063757@qq.com)
     *@desc: 设置项 switch 是否启用
     *
     */
    isEnabled: function (index) {
        return false
    },
    /**
     *@time: 2018/8/14下午3:49
     *@author:QingMings(1821063757@qq.com)
     *@desc: 根据 index 获取设置项
     *
     */
    getSetting: function (index) {
      return this.getSettingByIndex(index)
    }
  }
}
</script>
<style lang="less">
    @import "../../../assets/iez-toolbar-extend";
</style>
