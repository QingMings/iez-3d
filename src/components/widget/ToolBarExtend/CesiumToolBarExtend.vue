<template>
    <span class="iez-toolbar-right">
        <!--cesium toolbar 扩展-->
        <div class="iez-toolbar-ext">
            <div  class="iez-baseLayers-wrapper">
                <div id="BaseLayersPicker"></div>
            </div>
            <!--用户头像-->
            <div ref="userWrapper" class="iez-user-wrapper">
                <Dropdown trigger="custom" :visible="userVisible" @on-click="logOut" placement="bottom-end">
                    <div class="iez-avatar " @click="loginGo" :title="user.userName">
                        <Badge>
                            <Avatar shape="square" icon="person" :src="user.userProfile" tabindex="0"></Avatar>
                        </Badge>
                    </div>
                    <DropdownMenu slot="list" class="iez-dropMenu">
                        <DropdownItem>退出登录</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <!--设置-->
            <div ref="settingWrapper" class="iez-setting-wrapper ">
               <Dropdown trigger="custom" :visible="settingVisible" placement="bottom-start">
                   <div @click='settingDropDownHandler' title="设置">
                       <Badge>
                           <Avatar shape="square" icon="ios-options" tabindex="0"></Avatar>
                       </Badge>
                   </div>
                   <DropdownMenu slot="list" class="iez-dropMenu" v-for="(data, index) in settings" v-bind:key="data">
                       <DropdownItem :title="data">
                         <span>{{data}} </span>  <i-switch size="small" :name="data" :value="getSetting(index)"
                                                           :disabled="isEnabled(index)"
                                                           @on-change="switchChange(data, $event)"></i-switch>
                       </DropdownItem>
                   </DropdownMenu>
               </Dropdown>
            </div>
        </div>
        <login-modal></login-modal>
    </span>
</template>
<script type="text/javascript">
import {closeSupport} from '../../../utils/util'
import {mapGetters, mapMutations, mapState} from 'vuex'
import LoginModal from '../../../views/LoginModal'

export default {
  name: 'CesiumToolBarExtend',
  components: {LoginModal},
  data () {
    return {
      settings: ['热点标注', '建筑标注'],
      settingVisible: false,
      userVisible: false
    }
  },
  mounted () {
    closeSupport(this.settingDropDownCloseSupport)
  },
  computed: {
    ...mapState({}),
    ...mapGetters('userModule', {
      user: 'getUser'
    }),
    ...mapGetters('settingModule', {
      getSettingByIndex: 'getSettingByIndex'
    })
  },
  methods: {

    ...mapMutations('userModule', {
      resetUser: 'resetUser'
    }),
    /**
     *@time: 2018/8/14下午3:39
     *@author:QingMings(1821063757@qq.com)
     *@desc: 收缩 展开 设置下拉菜案
     *
     */
    settingDropDownHandler: function () {
      this.settingVisible = !this.settingVisible
    },
    /**
     *@time: 2018/8/15下午1:47
     *@author:QingMings(1821063757@qq.com)
     *@desc: iview dropDown 点击空白处关闭下拉支持
     *
     */
    settingDropDownCloseSupport: function (e) {
      if (this.$refs.settingWrapper !== undefined) {
        if (!this.$refs.settingWrapper.contains(e.target)) {
          this.settingVisible = false
        }
      }
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
    },
    /**
     * @time: 2018/8/20下午3:29
     * @author:QingMings(1821063757@qq.com)
     * @desc: 收缩 展开 用户下拉菜单
     *
     */
    userDropDownHandler: function () {
      this.userVisible = !this.userVisible
    },
    /**
     * @time: 2018/8/20上午11:18
     * @author:QingMings(1821063757@qq.com)
     * @desc: 弹出登录页面
     *
     */
    loginGo: function () {
      if (!this.user.logged) {
        // 未登录，显示登录框
        this.$nextTick(() => {
          this.$modal.show('login-modal', null, {draggable: true})
        })
      } else {
        // 显示退出登录下拉菜单
        this.userDropDownHandler()
      }
    },
    /**
     * @time: 2018/8/20下午2:53
     * @author:QingMings(1821063757@qq.com)
     * @desc: 退出登录
     *
     */
    logOut: function () {
      this.resetUser()
      this.userDropDownHandler() // 隐藏退出登录按钮
      console.log(`--debug--退出登录`)
      // todo 清除 cookie
      // todo 清除 token
    }
  }
}
</script>
<style lang="less">
    @import "../../../assets/iez-toolbar-extend";
</style>
