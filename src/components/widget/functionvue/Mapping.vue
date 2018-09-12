<template>
    <div class="dialog-wrap " id="mapping">
        <div  style="height: 500px" >
            <div>
                <Button type="primary" ghost @click="" title="打开文件"><Icon type="ios-folder-open" /></Button>
                <Button type="primary" ghost @click="" title="叠加文件"><Icon type="ios-albums" /></Button>
                <Button type="primary" ghost @click="" title="保存文件"><Icon type="md-bookmark" /></Button>
                <Button type="error" ghost title="清空标绘"><Icon type="ios-trash-outline" /></Button>
                <Button type="error" ghost title="是否可编辑"><Icon type="md-lock" /></Button>
                <Button type="error" ghost title="是否可编辑" v-if="iss"><Icon type="md-unlock" /></Button>
            </div>
            <Divider />
            <div>
                 <Select class="input">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">
                    {{ item.label }}
                </Option>
            </Select>
              <div></div>
            </div>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  import PanelTable from 'iview/src/components/date-picker/base/mixin'
  export default {
    name: 'Mapping',
    components: {PanelTable},
    data(){
      return {
        iss:false,
        typeList:[
          {
            label:'常用标号',
            value :'default'
          },
          {
            label:'图标点',
            value:'IconPoint'
          },
          {
            label:'模型',
            value:'model'
          }
        ],
      }
    },
    methods: {
      closeDialog:function(){
        //this.isvisible=!this.isvisible;
        // easyDialog.close();
      }

    },
  }
</script>

<style scoped>

</style>
