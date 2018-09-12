<template>
    <div class="dialog-wrap "  id="flight" style="height: 500px;width:355px" >
        <div  >
            <Tabs type="card">
                <TabPane label="路线">
                    <div>
                        <Button type="primary" ghost @click="">新增路线</Button>
                        <Button type="primary" ghost @click="" >保存路线</Button>
                    </div>
                    <div>
                        <table width="290.23" style="text-align: center;border-color:#92B8B1; border-style:solid ">
                            <thead>
                            <tr>
                                <th width="50%" >名称</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>飞行路线</td>
                                <td>
                                    <Button  type='text' title="飞行" @click="StartFly"><Icon type="md-jet" /></Button>
                                    <Button  type='text' title="编辑"><Icon type="md-card" /></Button>
                                    <Button  type='text' title="删除"><Icon type="ios-trash-outline" /></Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </TabPane>
                <TabPane label="坐标" style="text-align: left">
                    <div>
                       <div>批量修改高程速度（辅助功能）</div>
                        <div>
                            <table>
                                <tr>
                                    <td>在原值上增加：</td>
                                    <td> <InputNumber :max="100" :min="0" class="input" ></InputNumber></td>
                                </tr>
                                <tr>
                                    <td>全部修改为：</td>
                                    <td> <InputNumber :max="1000" :min="0"  class="input" ></InputNumber></td>
                                </tr>
                                <tr>
                                    <td>速度（km/h）：</td>
                                    <td> <InputNumber :max="1000" :min="100" class="input" ></InputNumber></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>


                    <div>坐标列表</div>
                    <!--<div>-->
                        <!--<div>第一点</div>-->
                        <!--<div style="float:right;margin-top: -30px">-->
                            <!--<Button  type="text"  title="添加"  ><Icon type="ios-add" /></Button>-->
                            <!--<Button  type="text" title="删除"><Icon type="ios-trash-outline" /></Button>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div>
                        <table>
                            <tr>
                            <td style="width: 36%">经度：</td>
                            <td> <InputNumber :max="180" :min="-180" v-model="lng" class="input" ></InputNumber></td>
                        </tr>
                            <tr>
                                <td style="width: 36%">纬度：</td>
                                <td> <InputNumber :max="90" :min="-90" v-model="lat" class="input" ></InputNumber></td>
                            </tr>
                            <tr>
                                <td style="width: 36%">高度：</td>
                                <td> <InputNumber :max="1000" :min="-1000" v-model="high" class="input" ></InputNumber></td>
                            </tr>
                        </table>
                    </div>
                    </div>
                </TabPane>
                <TabPane label="属性" >
                    <table>
                        <tr>
                            <td>名称</td>
                            <td><Input  class="input" /></td>
                        </tr>
                        <tr>
                            <td>漫游对象</td>
                            <td><Input  class="input" /></td>
                        </tr>
                        <tr>
                            <td>显示注记</td>
                            <td>
                                <Radio>是</Radio>
                                <Radio v-model="single">否</Radio>
                            </td>
                        </tr>
                        <tr>
                            <td>显示路线</td>
                            <td>
                                <Radio>是</Radio>
                                <Radio v-model="single">否</Radio>
                            </td>
                        </tr>
                        <tr>
                            <td>显示投影</td>
                            <td>
                                <Radio>是</Radio>
                                <Radio v-model="single">否</Radio>
                            </td>
                        </tr>
                        <tr>
                            <td>离地警报</td>
                            <td>
                                <Radio>是</Radio>
                                <Radio v-model="single">否</Radio>
                            </td>
                        </tr>
                        <tr>
                            <td>视角</td>
                            <td>
                                <Select class="input" >
                                    <Option value="none">无</Option>
                                    <Option value="follow" disabled>跟随视角</Option>
                                    <Option value="first">锁定第一视角</Option>
                                    <Option value="shangdi">锁定上帝视角</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td>锁定视角距离</td>
                            <td>
                                <InputNumber :max="1000" :min="1" v-model="value1" class="input" ></InputNumber>
                            </td>
                        </tr>
                        <tr>
                            <td>锁定视角高度</td>
                            <td>
                                <InputNumber :max="1000" :min="1" v-model="value2" class="input" ></InputNumber>
                            </td>
                        </tr>
                        <tr>
                            <td>是否循环漫游</td>
                            <td>
                                <Radio>是</Radio>
                                <Radio v-model="single">否</Radio>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%">备注</td>
                            <td>
                                <Input  class="input" />
                            </td>
                        </tr>
                    </table>
                    <div>
                        <Button type="primary" style="margin-right: 5px" ghost @click="">开始漫游</Button>
                        <Button type="error" ghost @click="" >删除路线</Button>
                    </div>
                </TabPane>
            </Tabs>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  import {eventBus} from '../../eventbus/EventBus'
  export default {
    name: 'Flight',
    data(){
      return {
        single:true,
        value1:1,
        value2:1,
        lng:0,
        lat:0,
        high:0,
      }
    },
    methods: {
      StartFly:function(){
        console.info("111111");
        eventBus.$emit('startfly');
      }

    },
  }
</script>

<style scoped>

</style>
