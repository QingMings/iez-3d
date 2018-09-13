
<template>
    <div class="dialog-wrap " id="mymark">
        <div >
            <div>
                <Button type="primary" ghost @click="">添加标记</Button>
                <Button type="error" ghost>保存文件</Button>
            </div>
            <div style="margin-top: 8px">
                <table width="290.23" style=" margin-left: 5px;border: 1px solid #5a54af;text-align: left;">
                    <thead>
                    <tr >
                        <th width="80%" >名称</th>
                        <th style="text-align: center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for ="(user,index) in users">
                        <!--<td>{{index+1}}</td>-->
                        <td>{{user.name}}</td>
                        <!--<td>{{user.age}}</td>-->
                        <!--<td>{{user.school}}</td>-->
                        <td><Button  type='text'>删除</Button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import {eventBus} from '../../eventbus/EventBus'
  export default {
    name: 'MyMark',
    data(){
      return {
        user: {'name': ''},
        users: [
          {'name': '李磊'},
          {'name': '张成'},
          {'name': '炼心'}
        ]
      }
    },
    methods: {
      ...mapActions({
        isShow: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      }),


    },
  }
</script>


<style lang="less">
    @import "../../../assets/dialog";
</style>

