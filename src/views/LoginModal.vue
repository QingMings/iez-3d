<template>
    <foo-modal name="login-modal" transition="pop-out"  :height="400">
        <div class="box">
            <div class="box-part" id="bp-left">
                <div class="partition" id="partition-register">
                    <div class="partition-title">用户登录</div>
                    <div class="partition-form">
                        <form autocomplete="false">

                            <div class="autocomplete-fix">
                                <input type="password">
                            </div>

                            <input id="n-username" type="text"  autocomplete="off" placeholder="用户名">
                            <input id="n-password2" type="password" placeholder="密码">
                        </form>

                        <div style="margin-top: 42px">
                        </div>

                        <!--<div class="button-set">-->
                            <!--<button id="goto-signin-btn">Sign In</button>-->
                            <!--<button id="register-btn">Register</button>-->
                        <!--</div>-->

                        <!--<button class="large-btn github-btn">connect with <span>github</span></button>-->
                        <button class="large-btn facebook-btn">登录</button>
                    </div>
                </div>
            </div>
            <div class="box-part" id="bp-right">
                <div class="box-messages">
                </div>
            </div>
        </div>

    </foo-modal>
</template>

<script>
const MODAL_WIDTH = 656
/**
 * @time: 2018/8/17上午9:48
 * @author:QingMings(1821063757@qq.com)
 * @desc: 登录页面
 *
 */
export default {
  name: 'LoginModal',
  data () {
    return {
      modalWidth: MODAL_WIDTH
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
  }
}
</script>

<style scoped lang="less">
@import "../assets/login-modal";
</style>
