import Cesium from 'cesium/Cesium'
import {DataType} from './constant'

/**
 * @time: 2018/8/20下午4:38
 * @author:QingMings(1821063757@qq.com)
 * @desc: 添加对iview dropDownMenu custom 自定义下拉 点击页面其他位置关闭下拉菜单的支持
 *
 */
export const closeSupport = (closeFunc) => {
  var theNavigator
  if (typeof navigator !== 'undefined') {
    theNavigator = navigator
  } else {
    theNavigator = {}
  }
  var hasPointerEvents = typeof PointerEvent !== 'undefined' && (!Cesium.defined(theNavigator.pointerEnabled) || theNavigator.pointerEnabled)
  if (hasPointerEvents) {
    document.addEventListener('pointerdown', closeFunc, true)
  } else {
    document.addEventListener('mousedown', closeFunc, true)
    document.addEventListener('touchstart', closeFunc, true)
  }
}
/**
 * @time: 2018/8/20下午4:37
 * @author:QingMings(1821063757@qq.com)
 * @desc: 判断是否是移动设备
 *
 */
export const isMobile = () => {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true
  } else {
    return false
  }
}
/**
 * @time: 2018/9/4上午8:30
 * @author:QingMings(1821063757@qq.com)
 * @desc: 统一错误提示配置
 *
 */
export const error = message => {
  return {
    content: message,
    duration: 10,
    closable: true
  }
}
/**
 * @time: 2018/9/4上午8:30
 * @author:QingMings(1821063757@qq.com)
 * @desc: 统一消息提示配置
 *
 */
export const info = message => {
  return {
    content: message,
    duration: 5,
    closable: true
  }
}
/**
 * @time: 2018/9/4上午8:31
 * @author:QingMings(1821063757@qq.com)
 * @desc:  检查 是否有子元素 并返回 boolean 值
 * @param {node} iview tree node
 * @return {Boolean}
 */
export const hasChild = node => {
  return (node.children != undefined && node.children.length > 0)
}

/**
 * 弹框
 * @param openid div id
 * @param titleName 标题名称
 */
export const openDia=function (openid,titleName) {
  layer.open({
    type: 1 //Page层类型
    //,area: ['500px', '300px']
    ,title: titleName
    ,shade: 0 ,//遮罩透明度
    // ,maxmin: true //允许全屏最小化
    offset: ['70px', '150px']
    ,anim: 1 //0-6的动画形式，-1不开启
    ,content: $(openid)
  });
}

// 克隆一部分属性
export const cloneObj = target => {
  let obj = {}
  Object.assign(obj, target)
  return obj
}
/**
 * @time: 2018/9/10下午5:22
 * @author:QingMings(1821063757@qq.com)
 * @desc: subData对象 生成处理
 *
 */
export const subDataGen = (node, subDatas, dataSource) => {
  let subData = cloneObj(node)
  subData['dataSource'] = dataSource
  subDatas.push(subData)
  return subData
}
/**
 * @time: 2018/9/11下午5:16
 * @author:QingMings(1821063757@qq.com)
 * @desc: 数据处理，给模型数据添加一个属性，标识不级联
 *
 */
export const dataProcess = dataArray => {
  // category
  dataArray.filter(data => data.type === DataType.category).forEach(data => {
    // modalData or ImageryData
    data.children.forEach(childData => {
      if (childData.type === DataType.modelData){
        if (childData.children){
          childData['checkStrictly'] = false
        }
      }
    })
  })
return dataArray
}
export default {
  closeSupport,
  isMobile,
  subDataGen,
  dataProcess,
  openDia
}
