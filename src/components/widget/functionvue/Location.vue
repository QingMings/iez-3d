
<template>
    <div class="dialog-wrap " id="location">
        <div >
            <div>
                <label>
                    经度：
                </label>
                <InputNumber :max="180" :min="-180" v-model="lng" class="input"></InputNumber>
                <!--<Input class="input" />-->
                <br/>
                <label>
                    纬度：
                </label>
                <InputNumber :max="190" :min="-90" v-model="lat" class="input"></InputNumber>
                <br/>
                <label>
                    高度：
                </label>
                <InputNumber :max="190" :min="-90" v-model="high" class="input"></InputNumber>
                <!--<Input class="input" />-->
            </div>
            <div style="margin-top: 5px">
                <Button id="btnLocation" style="width: 50px" type="primary" ghost>
                    定位
                </Button>
                <!--<Button id="btnClose" style="width: 50px" @click="closeDialog" type="primary" ghost >-->
                    <!--关闭-->
                <!--</Button>-->
            </div>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Location',
    data(){
      return {
        lng:1,
        lat:1,
        high:0,
      }
    },
    methods: {
      ...mapActions({
        isShow: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      }),
      closeDialog:function(){
       // this.isvisible=!this.isvisible;
       // easyDialog.close();
      }

    },
  }
</script>


<style lang="less">
    @import "../../../assets/dialog";
</style>
