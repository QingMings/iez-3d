// 常用工具 eventBus 处理
export default class ToolCaseEventHandler {
  constructor (iez3d) {
    if (!Cesium.defined(iez3d)) {
      throw new Cesium.DeveloperError('iez3d 参数是必须的')
    }
    this.viewer = iez3d.viewer
    this.camera = iez3d.camera
    this.scene = iez3d.scene
    this.handler = iez3d.handler
    this.eventbus = iez3d.eventbus
    this.iez3d = iez3d
    this.init()
  }
  init() {
    this.eventbus.$on('startmeasure', target => {
      // measureLineSpace(this.viewer)
      console.log("startmeasure [this,this.drawTool,target]="  ,[this,this.drawTool,target])
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK) // 删除默认事件 destory
      //this.drawTool["destory"];
      this.drawTool["route_DrS"]();
    })
    this.eventbus.$on('startfly', target => {
      var flyOption = {
        pathGeoJsonUrl: 'E:/sampledata/map97geo.json',
        staticPos: [117.244548, 40.21395],
        flyHeight: 300,
        multiplier: 2,
        pathWidth: 3,
        flySpeed: 50,
        pathShow: !!1,
        pathLeadTime: 0,
        pathTrailTime: 60,
        modelUrl: 'E:/sampledata/model/CesiumAir/Cesium_Air.gltf'

      };
      // measureLineSpace(this.viewer)
      console.log("startfly [this,this.flyTool,target]="  ,[this,this.flyTool,target])
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK) // 删除默认事件 destory
      //this.drawTool["destory"];
      this.flyTool["runFlyOnPath"](flyOption);
    })
  }
}
