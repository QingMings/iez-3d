
<template>
    <div class="dialog-wrap "  id="flood">
        <div >
            <div>
                <label>
                    最大高度：
                </label>
                <InputNumber :max="1000" :min="0"  class="input"></InputNumber>
                <!--<Input class="input" />-->
                <br/>
                <label>
                    最小高度：
                </label>
                <InputNumber :max="1000" :min="0"  class="input"></InputNumber>
                <br/>
                <label>
                    淹没速度：
                </label>
                <InputNumber :max="1000" :min="0" class="input"></InputNumber>
                <!--<Input class="input" />-->
            </div>
            <div style="margin-top: 5px">
                <Button id="btnLocation" style="width: 50px" type="primary" ghost>
                    开始
                </Button>
            </div>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'FloodAnalysis',
    data(){
      return {
      }
    },
    methods: {
      ...mapActions({
        isShow: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      }),
      closeDialog:function(){
        layer.close();
      //  this.isvisible=!this.isvisible;
        // easyDialog.close();
      }

    },
  }
</script>


<style lang="less">
    @import "../../../assets/dialog";
</style>
