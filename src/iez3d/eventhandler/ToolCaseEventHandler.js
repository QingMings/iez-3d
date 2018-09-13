// 常用工具 eventBus 处理
import Cesium from 'cesium/Cesium'
import {clear, measureAreaSpace, measureLineSpace} from '../../utils/measure'
import {add_dian,add_line,  add_polygon, add_title, changeTitle, clearBZ} from '../../utils/biaozhu'

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

  init () {
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    this.eventbus.$on('startmeasure', target => {
      // measureLineSpace(this.viewer)
      console.log('startmeasure [this,this.drawTool,target]=', [this, this.drawTool, target])
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK) // 删除默认事件 destory
      //this.drawTool["destory"];
      this.drawTool['route_DrS']()
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

      }
      // measureLineSpace(this.viewer)
      console.log('startfly [this,this.flyTool,target]=', [this, this.flyTool, target])
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK) // 删除默认事件 destory
      //this.drawTool["destory"];
      this.flyTool['runFlyOnPath'](flyOption)
    })
    this.eventbus.$on(ToolsEvent.Measure, target => {
      switch (target) {
        case MeasureType.Line:
          measureLineSpace(this.viewer)
          break
        case MeasureType.Area:
          measureAreaSpace(this.viewer)
          break
        case MeasureType.Clear:
          clear(this.viewer)
          break
        // case MeasureType.High:
        //   this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK) // 删除默认事件 destory
        //   this.drawTool["route_DrS"]();
        //   break
      }

    })
    this.eventbus.$on(ToolsEvent.Mapping, ({type, status,val}) => {
      switch (type){
        case MarkType.Point:
          add_dian(this.viewer,status)
          break;
        case MarkType.Line:
          add_line(this.viewer,status)
          break;
        case MarkType.Polygon:
          add_polygon(this.viewer,status)
          break;
        case MarkType.Title:
          add_title(this.viewer,status)
          break;
        case MarkType.ChangeTitle:
          changeTitle(val)
          break;
        case MarkType.Clear:
          clearBZ(this.viewer,status)
          break;
      }
    })

  }
}
//量测
export const MeasureType = {
  Line: 'line',
  Area:'area',
  High:'high',
  Clear:'clear'

}
//标注
export const MarkType = {
  Point: 'point',
  Line: 'line',
  Polygon:'polygon',
  Title:'title',
  ChangeTitle:'changeTitle',
  Clear:'clear'

}
//ToolsEvent 常用工具事件
export const ToolsEvent = {
  Mapping:'mapping',
  Measure:'measure'
}
