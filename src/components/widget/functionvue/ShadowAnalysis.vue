
<template>
    <div class="dialog-wrap "  id="shadow" style="width:350px;height: 280px">
        <div>
            <div>
                <label style="margin-left: -30px">
                    日期选择：
                </label>
                <DatePicker type="date" placeholder="Select date" class="input"></DatePicker>
                <br/>
                <label style="margin-left: -30px">
                    开始时间：
                </label>
                <TimePicker type="time" placeholder="Select time" class="input"></TimePicker>
                <br/>
                <label style="margin-left: -30px">
                    结束时间：
                </label>
                <TimePicker type="time" placeholder="Select time" class="input"></TimePicker>
                <br/>
                <label style="margin-left: -30px">
                    底部高程：
                </label>
                <InputNumber :max="1000" :min="0"  class="input"></InputNumber>
                <br/>
                <label style="margin-left: -30px">
                    拉伸高度：
                </label>
                <InputNumber :max="1000" :min="0"  class="input"></InputNumber>
                <!--<Input class="input" />-->
            </div>
            <div style="margin-top: 5px">
                <Button id="btn1"  type="primary" ghost style="margin-right: 5px">
                    阴影分析
                </Button>
                <Button id="btn2"  type="primary" ghost style="margin-right: 5px">
                    日照效果
                </Button>
                <Button id="btnClear"  type="error" ghost>
                    清除
                </Button>
            </div>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'ShadowAnalysis',
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
