import Cesium from 'cesium/Cesium'

var handler = null
var tempEntities = []
var floatingPoint
/* 距离测量 */
const measureLineSpace = function (viewer) {
  if (handler !== null) {
    if (!handler.isDestroyed()) {
      handler.destroy()
    }
  }
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  var positions = []
  var poly = null
  var distance = 0
  var cartesian = null
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid)
    if (typeof(cartesian) == 'undefined') {
      return
    }
    if (positions.length >= 2) {
      if (!Cesium.defined(poly)) {
        poly = new PolyLinePrimitive(positions)
      } else {
        positions.pop()
        positions.push(cartesian)
      }
      distance = getSpaceDistance(positions)
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)
    if (positions.length == 0) {
      positions.push(cartesian)
    }
    positions.push(cartesian)
    var textDisance = distance + '米'
    floatingPoint = viewer.entities.add({
      position: positions[positions.length - 1],
      point: {
        pixelSize: 5,
        color: Cesium.Color.WHITE,
      },
      label: {
        text: textDisance,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      }
    })
    tempEntities.push(floatingPoint)
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  handler.setInputAction(function (movement) {
    handler.destroy()
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  var PolyLinePrimitive = (function () {
    function _ (positions) {
      this.options = {
        polyline: {
          show: true,
          positions: [],
          material: Cesium.Color.CHARTREUSE,
          width: 2
        }
      }
      this.positions = positions
      this._init()
    }
    _.prototype._init = function () {
      var _self = this
      var _update = function () {
        return _self.positions
      }
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false)
      floatingPoint = viewer.entities.add(this.options)
      tempEntities.push(floatingPoint)
    }
    return _
  })()
}

function getSpaceDistance (positions) {
  var distance = 0
  for (var i = 0; i < positions.length - 1; i++) {
    var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i])
    var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1])
    var geodesic = new Cesium.EllipsoidGeodesic()
    geodesic.setEndPoints(point1cartographic, point2cartographic)
    var s = geodesic.surfaceDistance
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2))
    distance = distance + s
  }
  return distance.toFixed(2)
}

/* 面积测量 */
const measureAreaSpace = function (viewer) {
  if (handler !== null) {
    if (!handler.isDestroyed()) {
      handler.destroy()
    }
  }
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  var positions = []
  var tempPoints = []
  var polygon = null
  var cartesian = null
  var floatingPoint
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid)
    if (typeof(cartesian) == 'undefined') {
      return
    }
    if (positions.length >= 2) {
      if (!Cesium.defined(polygon)) {
        polygon = new PolygonPrimitive(positions)
      } else {
        positions.pop()
        positions.push(cartesian)
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)
    if (positions.length == 0) {
      positions.push(cartesian.clone())
    }
    //positions.pop();
    positions.push(cartesian)
    var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1])
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
    var heightString = cartographic.height
    tempPoints.push({lon: longitudeString, lat: latitudeString, hei: heightString})
    floatingPoint = viewer.entities.add({
      position: positions[positions.length - 1],
      point: {
        pixelSize: 5,
        color: Cesium.Color.WHITE,
      }
    })
    tempEntities.push(floatingPoint)
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  handler.setInputAction(function (movement) {
    handler.destroy()
    positions.pop()
    //tempPoints.pop();
    viewer.entities.remove(floatingPoint)
    var textArea = getArea(tempPoints) + '平方公里'
    floatingPoint = viewer.entities.add({
      position: positions[positions.length - 1],
      label: {
        text: textArea,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      }
    })
    tempEntities.push(floatingPoint)
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  var radiansPerDegree = Math.PI / 180.0
  var degreesPerRadian = 180.0 / Math.PI

  function getArea (points) {
    var res = 0
    for (var i = 0; i < points.length - 2; i++) {
      var j = (i + 1) % points.length
      var k = (i + 2) % points.length
      var totalAngle = Angle(points[i], points[j], points[k])
      var dis_temp1 = distance(positions[i], positions[j])
      var dis_temp2 = distance(positions[j], positions[k])
      res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle))
    }
    return (res / 1000000.0).toFixed(4)
  }

  function Angle (p1, p2, p3) {
    var bearing21 = Bearing(p2, p1)
    var bearing23 = Bearing(p2, p3)
    var angle = bearing21 - bearing23
    if (angle < 0) {
      angle += 360
    }
    return angle
  }

  function Bearing (from, to) {
    var lat1 = from.lat * radiansPerDegree
    var lon1 = from.lon * radiansPerDegree
    var lat2 = to.lat * radiansPerDegree
    var lon2 = to.lon * radiansPerDegree
    var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2))
    if (angle < 0) {
      angle += Math.PI * 2.0
    }
    angle = angle * degreesPerRadian
    return angle
  }

  var PolygonPrimitive = (function () {
    function _ (positions) {
      this.options = {
        polygon: {
          hierarchy: [],
          material: Cesium.Color.GREEN.withAlpha(0.5)
        }
      }
      this.hierarchy = positions
      this._init()
    }

    _.prototype._init = function () {
      var _self = this
      var _update = function () {
        return _self.hierarchy
      }

      this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false)
      floatingPoint = viewer.entities.add(this.options)
      tempEntities.push(floatingPoint)
    }

    return _
  })()

  function distance (point1, point2) {
    var point1cartographic = Cesium.Cartographic.fromCartesian(point1)
    var point2cartographic = Cesium.Cartographic.fromCartesian(point2)
    var geodesic = new Cesium.EllipsoidGeodesic()
    geodesic.setEndPoints(point1cartographic, point2cartographic)
    var s = geodesic.surfaceDistance
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2))
    return s
  }
}

/* 清除 */
const clear = function (viewer) {
  for (let i = 0; i < tempEntities.length; i++) {
    viewer.entities.remove(tempEntities[i])
  }
  tempEntities = []
}
export {
  measureLineSpace,
  measureAreaSpace,
  clear
}
