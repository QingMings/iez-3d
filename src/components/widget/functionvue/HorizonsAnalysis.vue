<template>
    <div class="dialog-wrap " id="horizons">
        <div >
            <div>
                <Button type="primary" ghost>添加视域点</Button>
                <Button type="error" ghost>清除</Button>
            </div>
            <div style="margin-top: 8px">
                <table width="285" style=" margin-left: 5px;border: 1px solid #5a54af;text-align: left;">
                    <tr >
                        <td style="width:35%">方向（度）</td>
                        <td><Slider></Slider></td>
                    </tr>
                    <tr >
                        <td>翻转（度）</td>
                        <td><Slider></Slider></td>
                    </tr>
                    <tr >
                        <td>距离（度）</td>
                        <td><Slider></Slider></td>
                    </tr>
                    <tr >
                        <td>水平视场角（度）</td>
                        <td><Slider></Slider></td>
                    </tr>
                    <tr >
                        <td>水平视场角（度）</td>
                        <td><Slider></Slider></td>
                    </tr>
                </table>
            </div>
            <!--<p class="dialog-close" @click="closeDialog">x</p>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: 'HorizonsAnalysis'
  }
</script>

<style scoped>

</style>
