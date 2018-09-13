// 设置相关 eventBus 事件处理
import Cesium from 'cesium/Cesium'

export default class SettingEventHandler {
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
    // 是否开启地形
    this.eventbus.$on(SettingEvent.enableTerrain, isEnable => {
      if (isEnable) {
        this.viewer.terrainProvider = Cesium.createWorldTerrain()
      } else {
        this.viewer.terrainProvider =new  Cesium.EllipsoidTerrainProvider()
      }
    })
  }
}

export const SettingEvent = {
  enableTerrain: 'enableTerrain'
}
