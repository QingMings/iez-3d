<template>
    <div class="dialog-wrap " id="sectionanalysis">
        <div>
            <div>
                <Button type="primary" ghost @click="sectionAnalysis">剖面分析</Button>
                <Button type="error" ghost @click="clear">清除</Button>
                <!--<RadioGroup v-model="button1" @on-change="changeRadio" type="Button">-->
                    <!--<Radio  type="primary" ghost label="剖面分析"></Radio>-->
                    <!--<Radio  type="primary" ghost label="清除"></Radio>-->
                <!--</RadioGroup>-->
            </div>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SectionAnalysis',
    data() {
      return {
        button1: '剖面分析',
      }
    },
    methods: {
      closeDialog: function () {
       // this.isvisible = !this.isvisible;
      },
      sectionAnalysis:function(itemName){

      },
      clear:function(){

      }

    }
  }
</script>

<style scoped>

</style>
