import Cesium from 'cesium/Cesium';
var DrMeaTool = {
moduleDef() {
	var g = Cesium.Color.fromCssColorString("#10EF01");
	var e = Cesium.Color.fromCssColorString("#E08811");
	var i = Cesium.Color.fromBytes(130, 180, 253, 135);
	var f = Cesium.Color.RED;
	var l = Cesium.HorizontalOrigin.LEFT;
	var O = "16px Helvetica";
	var v = !!0;
	var y = !!0;
	var b = !!0;
	var S = !!0;
	var r = function(e) {
		e.contextObj || new Error("请检查函数参数");
		this._contextObj = e.contextObj;
		this._useMea = e.useMea || !!0;
		this._useClampGrd = e.useClampGrd || !!0;
		this._lineSize = e.lineSize || 2;
		this._layerDrMea = new Cesium.CustomDataSource;
		this._contextObj.dataSources.add(this._layerDrMea);
		this._evtHandler = new Cesium.ScreenSpaceEventHandler(this._contextObj.canvas);
		this._mouseIsMove = !!0;
		this._contextObj.scene.globe.depthTestAgainstTerrain = !0
	};
	r.prototype.setUseMea = function(e) {
		this._useMea = e
	};
	r.prototype.setUseClampGrd = function(e) {
		this._useClampGrd = e
	};
	r.prototype.pos_DrS = function() {
		var s = this;
		v = !0;
		this._evtHandler.setInputAction(function(e) {
			if (v) {
				var i = new Cesium.Cartesian2(e.position.x, e.position.y);
				var t = s._contextObj.scene.globe.pick(s._contextObj.scene.camera.getPickRay(i), s._contextObj.scene);
				if (!s._useMea) return s._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return t
					}, !1),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: s._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
					}
				});
				var n = Cesium.Cartographic.fromCartesian(t);
				var r = Cesium.Math.toDegrees(n.longitude).toFixed(2);
				var o = Cesium.Math.toDegrees(n.latitude).toFixed(2);
				Cesium.sampleTerrain(s._contextObj.terrainProvider, 9, [n]).then(function(e) {
					var i = e[0].height > 1e3 ? (e[0].height / 1e3).toFixed(2) + "千米" : e[0].height.toFixed(2) + "米 ";
					return s._layerDrMea.entities.add({
						position: new Cesium.CallbackProperty(function() {
							return t
						}, !0),
						point: {
							pixelSize: 10,
							color: g,
							heightReference: s._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
						},
						label: {
							text: "经度: " + ("        " + r).slice(-9) + "°\n纬度: " + ("        " + o).slice(-9) + "°\n高度：" + ("        " + i).slice(-9) + "  ",
							font: O,
							fillColor: f,
							outlineColor: Cesium.Color.BLACK,
							outlineWidth: 2,
							style: Cesium.LabelStyle.FILL_AND_OUTLINE,
							showBackground: !0,
							horizontalOrigin: l,
							verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
							heightReference: s._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
							disableDepthTestDistance: new Cesium.CallbackProperty(function() {
								return S || b || y || v ? 0 : Number.POSITIVE_INFINITY
							}, !1)
						}
					})
				})
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
	};
	r.prototype.posM_DrS = function() {
		var s = this;
		v = !0;
		this._evtHandler.setInputAction(function(e) {
			if (v) {
				var i = s._contextObj.scene.pickPosition(e.position);
				if (!Cesium.defined(i) || !Cesium.defined(s._contextObj.scene.pick(e.position))) return;
				if (!s._useMea) return s._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return i
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: Cesium.HeightReference.NONE
					}
				});
				var t = Cesium.Cartographic.fromCartesian(i);
				var n = Cesium.Math.toDegrees(t.longitude).toFixed(2);
				var r = Cesium.Math.toDegrees(t.latitude).toFixed(2);
				var o = t.height > 1e3 ? (t.height / 1e3).toFixed(2) + "千米" : t.height.toFixed(2) + "米 ";
				s._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return i
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: Cesium.HeightReference.NONE
					},
					label: {
						text: "经度: " + ("        " + n).slice(-9) + "°\n纬度: " + ("        " + r).slice(-9) + "°\n高度：" + ("        " + o).slice(-9) + "  ",
						font: O,
						fillColor: f,
						outlineColor: Cesium.Color.BLACK,
						outlineWidth: 2,
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						showBackground: !0,
						horizontalOrigin: l,
						verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
						heightReference: Cesium.HeightReference.NONE,
						disableDepthTestDistance: Number.POSITIVE_INFINITY
					}
				})
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
	};
	r.prototype.pos_DrE = function() {
		v = !1, this._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
	};
	r.prototype.route_DrS = function() {
		var o = this;
		this.pos_DrE();
		y = !0;
		var s = [];
		var a = 0;
		var n = void 0;
		this._evtHandler.setInputAction(function(e) {
			if (y) {
				s.pop();
				var i = new Cesium.Cartesian2(e.position.x, e.position.y);
				var t = o._contextObj.scene.globe.pick(o._contextObj.scene.camera.getPickRay(i), o._contextObj.scene);
				s.push(t);
				o._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return t
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: o._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
					}
				});
				o._useMea && s.length > 1 && (o._useClampGrd, r = c(s));
				o._mouseIsMove = !1;
				n || (n = function(e) {
					if (y && s.length > 0) {
						if (o._mouseIsMove) {
							s.pop();
							var i = new Cesium.Cartesian2(e.endPosition.x, e.endPosition.y);
							var t = o._contextObj.scene.globe.pick(o._contextObj.scene.camera.getPickRay(i), o._contextObj.scene);
							s.push(t);
							o._useMea && s.length > 1 && (o._useClampGrd, a = c(s))
						} else {
							var n = new Cesium.Cartesian2(e.endPosition.x, e.endPosition.y);
							var r = o._contextObj.scene.globe.pick(o._contextObj.scene.camera.getPickRay(n), o._contextObj.scene);
							s.push(r);
							o._useMea && s.length > 1 && (o._useClampGrd, a = c(s));
							o._mouseIsMove = !0
						}
					}
				}, o._evtHandler.setInputAction(n, Cesium.ScreenSpaceEventType.MOUSE_MOVE))
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this._evtHandler.setInputAction(function(e) {
			if (y) {
				o._mouseIsMove = !1;
				o._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
				s.pop();
				var i = new Cesium.Cartesian2(e.position.x, e.position.y);
				var t = o._contextObj.scene.globe.pick(o._contextObj.scene.camera.getPickRay(i), o._contextObj.scene);
				s.push(t);
				o._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return t
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: o._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
					}
				});
				o._useMea && s.length > 1 && (o._useClampGrd, r = c(s));
				o.route_DrE()
			}
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		this._useMea ? this._useClampGrd ? this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return s[s.length - 1]
			}, !1),
			corridor: {
				positions: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return a > 1e3 ? (a / 1e3).toFixed(2).toString() + "千米" : a.toFixed(2).toString() + "米"
				}, !1),
				font: "15px Helvetica",
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: l,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				heightReference: this._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
				disableDepthTestDistance: new Cesium.CallbackProperty(function() {
					return S || b || y || v ? 0 : Number.POSITIVE_INFINITY
				}, !1)
			}
		}) : this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return s[s.length - 1]
			}, !1),
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return a > 1e3 ? (a / 1e3).toFixed(2).toString() + "千米" : a.toFixed(2).toString() + "米"
				}, !1),
				font: "15px Helvetica",
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: l,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM
			}
		}) : this._useClampGrd ? this._layerDrMea.entities.add({
			corridor: {
				positions: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				width: this._lineSize,
				material: e
			}
		}) : this._layerDrMea.entities.add({
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				width: this._lineSize,
				material: e
			}
		})
	};
	r.prototype.routeM_DrS = function() {
		var n = this;
		this.pos_DrE();
		y = !0;
		var r = [];
		var o = 0;
		var t = void 0;
		this._evtHandler.setInputAction(function(e) {
			if (y) {
				var i = n._contextObj.scene.pickPosition(e.position);
				if (!Cesium.defined(i) || !Cesium.defined(n._contextObj.scene.pick(e.position))) return;
				r.pop();
				r.push(i);
				n._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return i
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: Cesium.HeightReference.NONE
					}
				});
				n._useMea && r.length > 1 && (o = c(r));
				n._mouseIsMove = !1;
				t || (t = function(e) {
					if (y && r.length > 0)
						if (n._mouseIsMove) {
							var i = n._contextObj.scene.pickPosition(e.endPosition);
							if (!Cesium.defined(i) || !Cesium.defined(n._contextObj.scene.pick(e.endPosition))) return;
							r.pop(), r.push(i), n._useMea && r.length > 1 && (o = c(r))
						} else {
							var t = n._contextObj.scene.pickPosition(e.endPosition);
							if (!Cesium.defined(t) || !Cesium.defined(n._contextObj.scene.pick(e.endPosition))) return;
							r.push(t), n._useMea && r.length > 1 && (o = c(r)), n._mouseIsMove = !0
						}
				}, n._evtHandler.setInputAction(t, Cesium.ScreenSpaceEventType.MOUSE_MOVE))
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		if (this._evtHandler.setInputAction(function(e) {
				if (y) {
					var i = n._contextObj.scene.pickPosition(e.position);
					if (!Cesium.defined(i) || !Cesium.defined(n._contextObj.scene.pick(e.position))) return;
					n._mouseIsMove = !1, n._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE), r.pop(), r.push(i), n._layerDrMea.entities.add({
						position: new Cesium.CallbackProperty(function() {
							return i
						}, !0),
						point: {
							pixelSize: 10,
							color: g,
							heightReference: Cesium.HeightReference.NONE
						}
					}), n._useMea && r.length > 1 && (n._useClampGrd, o = c(r)), n.route_DrE()
				}
			}, Cesium.ScreenSpaceEventType.RIGHT_CLICK), this._useMea) return this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return r[r.length - 1]
			}, !1),
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return r
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return o > 1e3 ? (o / 1e3).toFixed(2).toString() + "千米" : o.toFixed(2).toString() + "米"
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: l,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
				pixelOffset: new Cesium.CallbackProperty(function() {
					return S || b || y || v ? new Cesium.Cartesian2(45, 45) : new Cesium.Cartesian2(0, 0)
				}, !1)
			}
		});
		this._layerDrMea.entities.add({
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return r
				}, !1),
				width: this._lineSize,
				material: e
			}
		})
	};
	r.prototype.route_DrE = function() {
		y = !1;
		this._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
	};
	r.prototype.region_DrS = function() {
		var o = this;
		this.pos_DrE();
		b = !0;
		var s = [];
		var a = 0;
		var n = void 0;
		this._evtHandler.setInputAction(function(e) {
			if (b) {
				s.pop();
				var i = new Cesium.Cartesian2(e.position.x, e.position.y);
				var t = o._contextObj.scene.globe.pick(o._contextObj.scene.camera.getPickRay(i), o._contextObj.scene);
				s.push(t);
				o._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return t
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: o._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
					}
				});
				o._useMea && s.length > 2 && (a = u(s, o._contextObj));
				o._mouseIsMove = !1;
				n || (n = function(e) {
					if (b && s.length > 0)
						if (o._mouseIsMove) {
							s.pop();
							var i = new Cesium.Cartesian2(e.endPosition.x, e.endPosition.y);
							var t = o._contextObj.scene.globe.pick(o._contextObj.scene.camera.getPickRay(i), o._contextObj.scene);
							s.push(t);
							o._useMea && s.length > 2 && (a = u(s, o._contextObj))
						} else {
							var n = new Cesium.Cartesian2(e.endPosition.x, e.endPosition.y);
							var r = o._contextObj.scene.globe.pick(o._contextObj.scene.camera.getPickRay(n), o._contextObj.scene);
							s.push(r);
							o._useMea && s.length > 2 && (a = u(s, o._contextObj)), o._mouseIsMove = !0
						}
				}, o._evtHandler.setInputAction(n, Cesium.ScreenSpaceEventType.MOUSE_MOVE))
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this._evtHandler.setInputAction(function(e) {
			if (b) {
				o._mouseIsMove = !1;
				o._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
				s.pop();
				var i = new Cesium.Cartesian2(e.position.x, e.position.y);
				var t = o._contextObj.scene.globe.pick(o._contextObj.scene.camera.getPickRay(i), o._contextObj.scene);
				s.push(t);
				o._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return t
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: o._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
					}
				});
				o._useMea && s.length > 2 && (a = u(s, o._contextObj));
				s.push(s[0]);
				o.region_DrE()
			}
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		this._useMea ? this._useClampGrd ? this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return s[s.length - 1]
			}, !1),
			polygon: {
				hierarchy: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				material: i,
				perPositionHeight: !this._useClampGrd
			},
			corridor: {
				positions: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return a > 1e6 ? (a / 1e6).toFixed(2).toString() + "平方公里" : a.toFixed(2).toString() + "平方米"
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: l,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				heightReference: this._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
				disableDepthTestDistance: new Cesium.CallbackProperty(function() {
					return S || b || y || v ? 0 : Number.POSITIVE_INFINITY
				}, !1)
			}
		}) : this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return s[s.length - 1]
			}, !1),
			polygon: {
				hierarchy: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				material: i,
				perPositionHeight: !this._useClampGrd
			},
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				width: this._lineSize,
				material: e,
				followSurface: !this._useClampGrd
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return a > 1e6 ? (a / 1e6).toFixed(2).toString() + "平方公里" : a.toFixed(2).toString() + "平方米"
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: l,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				heightReference: this._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
				disableDepthTestDistance: new Cesium.CallbackProperty(function() {
					return S || b || y || v ? 0 : Number.POSITIVE_INFINITY
				}, !1)
			}
		}) : this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return s[s.length - 1]
			}, !1),
			polygon: {
				hierarchy: new Cesium.CallbackProperty(function() {
					return s
				}, !1),
				material: i,
				perPositionHeight: !this._useClampGrd
			}
		})
	};
	r.prototype.regionM_DrS = function() {
		var n = this;
		this.pos_DrE();
		b = !0;
		var r = [];
		var o = 0;
		var t = void 0;
		this._evtHandler.setInputAction(function(e) {
			if (b) {
				var i = n._contextObj.scene.pickPosition(e.position);
				if (!Cesium.defined(i) || !Cesium.defined(n._contextObj.scene.pick(e.position))) return;
				r.pop();
				r.push(i);
				n._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return i
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: Cesium.HeightReference.NONE
					}
				});
				n._useMea && r.length > 2 && (o = u(r, n._contextObj));
				n._mouseIsMove = !1;
				t || (t = function(e) {
					if (b && r.length > 0)
						if (n._mouseIsMove) {
							var i = n._contextObj.scene.pickPosition(e.endPosition);
							if (!Cesium.defined(i) || !Cesium.defined(n._contextObj.scene.pick(e.endPosition))) return;
							r.pop();
							r.push(i);
							n._useMea && r.length > 2 && (o = u(r, n._contextObj))
						} else {
							var t = n._contextObj.scene.pickPosition(e.endPosition);
							if (!Cesium.defined(t) || !Cesium.defined(n._contextObj.scene.pick(e.endPosition))) return;
							r.push(t);
							n._useMea && r.length > 2 && (o = u(r, n._contextObj));
							n._mouseIsMove = !0
						}
				}, n._evtHandler.setInputAction(t, Cesium.ScreenSpaceEventType.MOUSE_MOVE))
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this._evtHandler.setInputAction(function(e) {
			if (b) {
				var i = n._contextObj.scene.pickPosition(e.position);
				if (!Cesium.defined(i) || !Cesium.defined(n._contextObj.scene.pick(e.position))) return;
				n._mouseIsMove = !1;
				n._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
				r.pop();
				r.push(i);
				n._layerDrMea.entities.add({
					position: new Cesium.CallbackProperty(function() {
						return i
					}, !0),
					point: {
						pixelSize: 10,
						color: g,
						heightReference: Cesium.HeightReference.NONE
					}
				});
				n._useMea && r.length > 2 && (o = u(r, n._contextObj));
				r.push(r[0]);
				n.region_DrE()
			}
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		this._useMea ? this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return r[r.length - 1]
			}, !1),
			polygon: {
				hierarchy: new Cesium.CallbackProperty(function() {
					return r
				}, !1),
				material: i,
				perPositionHeight: !0
			},
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return r
				}, !1),
				width: this._lineSize,
				material: e,
				followSurface: !this._useClampGrd
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return o > 1e6 ? (o / 1e6).toFixed(2).toString() + "平方公里" : o.toFixed(2).toString() + "平方米"
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: l,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
				pixelOffset: new Cesium.CallbackProperty(function() {
					return S || b || y || v ? new Cesium.Cartesian2(45, 45) : new Cesium.Cartesian2(0, 0)
				}, !1)
			}
		}) : this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return r[r.length - 1]
			}, !1),
			polygon: {
				hierarchy: new Cesium.CallbackProperty(function() {
					return r
				}, !1),
				material: i,
				perPositionHeight: !0
			}
		})
	};
	r.prototype.region_DrE = function() {
		b = !1;
		this._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
	};
	r.prototype.elev_DrS = function() {
		var r = this;
		this.pos_DrE();
		S = !0;
		var o = void 0;
		var s = void 0;
		var a = void 0;
		var l = void 0;
		var u = void 0;
		var c = void 0;
		var C = void 0;
		var p = 0;
		var m = 0;
		var d = 0;
		var h = !1;
		var _ = !1;
		this._evtHandler.setInputAction(function(e) {
			if (S) {
				if (_) {
					r._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
					var i = new Cesium.Cartesian2(e.position.x, e.position.y);
					var t = r._contextObj.scene.globe.pick(r._contextObj.scene.camera.getPickRay(i), r._contextObj.scene);
					u = r._contextObj.scene.globe.ellipsoid.cartesianToCartographic(t);
					if (l.height > u.height) {
						c = new Cesium.Cartographic(u.longitude, u.latitude, l.height);
						a = r._contextObj.scene.globe.ellipsoid.cartographicToCartesian(c);
						m = Cesium.Cartesian3.distance(o, a);
						m = d > 1e3 ? (m / 1e3).toFixed(2).toString() + "千米" : m.toFixed(2).toString() + "米";
						p = Cesium.Cartesian3.distance(t, a);
						p = d > 1e3 ? (p / 1e3).toFixed(2).toString() + "千米" : p.toFixed(2).toString() + "米";
						h = !0
					} else {
						c = new Cesium.Cartographic(l.longitude, l.latitude, u.height);
						a = r._contextObj.scene.globe.ellipsoid.cartographicToCartesian(c);
						p = Cesium.Cartesian3.distance(o, a);
						p = d > 1e3 ? (p / 1e3).toFixed(2).toString() + "千米" : p.toFixed(2).toString() + "米";
						m = Cesium.Cartesian3.distance(t, a);
						m = d > 1e3 ? (m / 1e3).toFixed(2).toString() + "千米" : m.toFixed(2).toString() + "米";
						h = !1
					}
					r._layerDrMea.entities.add({
						position: new Cesium.CallbackProperty(function() {
							return a
						}, !0),
						point: {
							pixelSize: 10,
							color: g,
							heightReference: r._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
						}
					});
					r._layerDrMea.entities.add({
						position: new Cesium.CallbackProperty(function() {
							return t
						}, !0),
						point: {
							pixelSize: 10,
							color: g,
							heightReference: r._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
						}
					});
					d = (d = Cesium.Cartesian3.distance(o, t)) > 1e3 ? (d / 1e3).toFixed(2).toString() + "千米" : d.toFixed(2).toString() + "米";
					r.elev_DrE()
				} else {
					var n = new Cesium.Cartesian2(e.position.x, e.position.y);
					o = r._contextObj.scene.globe.pick(r._contextObj.scene.camera.getPickRay(n), r._contextObj.scene);
					l = r._contextObj.scene.globe.ellipsoid.cartesianToCartographic(o);
					_ = !0;
					r._layerDrMea.entities.add({
						position: new Cesium.CallbackProperty(function() {
							return o
						}, !0),
						point: {
							pixelSize: 10,
							color: g,
							heightReference: r._useClampGrd ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
						}
					});
					C = function(e) {
						var i = new Cesium.Cartesian2(e.endPosition.x, e.endPosition.y);
						s = r._contextObj.scene.globe.pick(r._contextObj.scene.camera.getPickRay(i), r._contextObj.scene);
						u = r._contextObj.scene.globe.ellipsoid.cartesianToCartographic(s);
						if (l.height > u.height) {
							c = new Cesium.Cartographic(u.longitude, u.latitude, l.height);
							a = r._contextObj.scene.globe.ellipsoid.cartographicToCartesian(c);
							m = Cesium.Cartesian3.distance(o, a);
							m = d > 1e3 ? (m / 1e3).toFixed(2).toString() + "千米" : m.toFixed(2).toString() + "米";
							p = Cesium.Cartesian3.distance(s, a);
							p = d > 1e3 ? (p / 1e3).toFixed(2).toString() + "千米" : p.toFixed(2).toString() + "米";
							h = !0
						} else {
							c = new Cesium.Cartographic(l.longitude, l.latitude, u.height);
							a = r._contextObj.scene.globe.ellipsoid.cartographicToCartesian(c);
							p = Cesium.Cartesian3.distance(o, a);
							p = d > 1e3 ? (p / 1e3).toFixed(2).toString() + "千米" : p.toFixed(2).toString() + "米";
							m = Cesium.Cartesian3.distance(s, a);
							m = d > 1e3 ? (m / 1e3).toFixed(2).toString() + "千米" : m.toFixed(2).toString() + "米";
							h = !1
						}
						d = (d = Cesium.Cartesian3.distance(o, s)) > 1e3 ? (d / 1e3).toFixed(2).toString() + "千米" : d.toFixed(2).toString() + "米"
					};
					r._evtHandler.setInputAction(C, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
				}
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return o && s ? Cesium.Cartesian3.lerp(o, s, .5, new Cesium.Cartesian3) : void 0
			}, !1),
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return o && s ? [o, s] : []
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return "空间距离：" + d
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.TOP,
				disableDepthTestDistance: new Cesium.CallbackProperty(function() {
					return S || b || y || v ? 0 : Number.POSITIVE_INFINITY
				}, !1)
			}
		});
		this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return o && a ? Cesium.Cartesian3.lerp(o, a, .5, new Cesium.Cartesian3) : void 0
			}, !1),
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return o && a ? [o, a] : []
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return h ? "水平距离：" + m : "垂直距离：" + p
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				disableDepthTestDistance: new Cesium.CallbackProperty(function() {
					return S || b || y || v ? 0 : Number.POSITIVE_INFINITY
				}, !1)
			}
		});
		this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return s && a ? Cesium.Cartesian3.lerp(s, a, .5, new Cesium.Cartesian3) : void 0
			}, !1),
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return a && s ? [a, s] : []
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return h ? "垂直距离：" + p : "水平距离：" + m
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				disableDepthTestDistance: new Cesium.CallbackProperty(function() {
					return S || b || y || v ? 0 : Number.POSITIVE_INFINITY
				}, !1)
			}
		})
	};
	var d = !0;
	r.prototype.elevM_DrS = function() {
		var t = this;
		this.pos_DrE();
		S = !0;
		var n = void 0;
		var r = void 0;
		var o = void 0;
		var s = void 0;
		var a = void 0;
		var l = void 0;
		var u = 0;
		var c = 0;
		var C = 0;
		var p = !1;
		var m = !1;
		this._evtHandler.setInputAction(function(e) {
			if (S) {
				if (m) {
					var i = t._contextObj.scene.pickPosition(e.position);
					if (!Cesium.defined(i) || !Cesium.defined(t._contextObj.scene.pick(e.position))) return;
					t._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
					a = Cesium.Cartographic.fromCartesian(i);
					if (s.height > a.height) {
						o = Cesium.Cartesian3.fromRadians(a.longitude, a.latitude, s.height);
						c = Cesium.Cartesian3.distance(n, o);
						c = C > 1e3 ? (c / 1e3).toFixed(2).toString() + "千米" : c.toFixed(2).toString() + "米";
						u = Cesium.Cartesian3.distance(i, o);
						u = C > 1e3 ? (u / 1e3).toFixed(2).toString() + "千米" : u.toFixed(2).toString() + "米";
						p = !0
					} else {
						o = Cesium.Cartesian3.fromRadians(s.longitude, s.latitude, a.height);
						u = Cesium.Cartesian3.distance(n, o);
						u = C > 1e3 ? (u / 1e3).toFixed(2).toString() + "千米" : u.toFixed(2).toString() + "米";
						c = Cesium.Cartesian3.distance(i, o);
						c = C > 1e3 ? (c / 1e3).toFixed(2).toString() + "千米" : c.toFixed(2).toString() + "米";
						p = !1
					}
					t._layerDrMea.entities.add({
						position: new Cesium.CallbackProperty(function() {
							return o
						}, !0),
						point: {
							pixelSize: 10,
							color: g,
							heightReference: Cesium.HeightReference.NONE
						}
					});
					t._layerDrMea.entities.add({
						position: new Cesium.CallbackProperty(function() {
							return i
						}, !0),
						point: {
							pixelSize: 10,
							color: g,
							heightReference: Cesium.HeightReference.NONE
						}
					});
					C = (C = Cesium.Cartesian3.distance(n, i)) > 1e3 ? (C / 1e3).toFixed(2).toString() + "千米" : C.toFixed(2).toString() + "米";
					t.elev_DrE()
				} else {
					if (d = !1, n = t._contextObj.scene.pickPosition(e.position), d = !0, !Cesium.defined(n) || !Cesium.defined(t._contextObj.scene.pick(e.position))) return;
					s = Cesium.Cartographic.fromCartesian(n);
					m = !0;
					t._layerDrMea.entities.add({
						position: new Cesium.CallbackProperty(function() {
							return n
						}, !0),
						point: {
							pixelSize: 10,
							color: g,
							heightReference: Cesium.HeightReference.NONE
						}
					});
					l = function(e) {
						r = t._contextObj.scene.pickPosition(e.endPosition), Cesium.defined(r) && Cesium.defined(t._contextObj.scene.pick(e.endPosition)) && (a = Cesium.Cartographic.fromCartesian(r), s.height > a.height ? (o = Cesium.Cartesian3.fromRadians(a.longitude, a.latitude, s.height), c = Cesium.Cartesian3.distance(n, o), c = C > 1e3 ? (c / 1e3).toFixed(2).toString() + "千米" : c.toFixed(2).toString() + "米", u = Cesium.Cartesian3.distance(r, o), u = C > 1e3 ? (u / 1e3).toFixed(2).toString() + "千米" : u.toFixed(2).toString() + "米", p = !0) : (o = Cesium.Cartesian3.fromRadians(s.longitude, s.latitude, a.height), u = Cesium.Cartesian3.distance(n, o), u = C > 1e3 ? (u / 1e3).toFixed(2).toString() + "千米" : u.toFixed(2).toString() + "米", c = Cesium.Cartesian3.distance(r, o), c = C > 1e3 ? (c / 1e3).toFixed(2).toString() + "千米" : c.toFixed(2).toString() + "米", p = !1), C = (C = Cesium.Cartesian3.distance(n, r)) > 1e3 ? (C / 1e3).toFixed(2).toString() + "千米" : C.toFixed(2).toString() + "米")
					};
					t._evtHandler.setInputAction(l, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
				}
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK), this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return n && r ? Cesium.Cartesian3.lerp(n, r, .5, new Cesium.Cartesian3) : void 0
			}, !1),
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return n && r ? [n, r] : []
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return "空间距离：" + C
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.TOP,
				show: new Cesium.CallbackProperty(function() {
					return d
				}, !1),
				disableDepthTestDistance: Number.POSITIVE_INFINITY
			}
		}), this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return n && o ? Cesium.Cartesian3.lerp(n, o, .5, new Cesium.Cartesian3) : void 0
			}, !1),
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return n && o ? [n, o] : []
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return p ? "水平距离：" + c : "垂直距离：" + u
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				show: new Cesium.CallbackProperty(function() {
					return d
				}, !1),
				disableDepthTestDistance: Number.POSITIVE_INFINITY
			}
		}), this._layerDrMea.entities.add({
			position: new Cesium.CallbackProperty(function() {
				return r && o ? Cesium.Cartesian3.lerp(r, o, .5, new Cesium.Cartesian3) : void 0
			}, !1),
			polyline: {
				positions: new Cesium.CallbackProperty(function() {
					return o && r ? [o, r] : []
				}, !1),
				width: this._lineSize,
				material: e
			},
			label: {
				text: new Cesium.CallbackProperty(function() {
					return p ? "垂直距离：" + u : "水平距离：" + c
				}, !1),
				font: O,
				fillColor: f,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				showBackground: !0,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				show: new Cesium.CallbackProperty(function() {
					return d
				}, !1),
				disableDepthTestDistance: Number.POSITIVE_INFINITY
			}
		})
	};
	r.prototype.elev_DrE = function() {
		S = !1;
		this._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this._evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
	};
	r.prototype.destory = function() {
		this.pos_DrE();
		this.route_DrE();
		this.region_DrE();
		this.elev_DrE();
		this._layerDrMea.entities.removeAll()
	};

	function u(e, i) {
		var t = e.length,
			n = 0,
			r = void 0,
			o = void 0;
		if (t > 2) {
			for (var s = 0; s < t; s++) {
				r = e[s], o = e[(s + 1) % t];
				var a = i.scene.globe.ellipsoid,
					l = new Cesium.Cartesian3(r.x, r.y, r.z),
					u = a.cartesianToCartographic(l),
					c = new Cesium.Cartesian3(o.x, o.y, o.z),
					C = a.cartesianToCartographic(c);
				n += (C.longitude - u.longitude) * (2 + Math.sin(u.latitude) + Math.sin(C.latitude))
			}
			n = 6378137 * n * 6378137 / 2
		}
		return Math.abs(n)
	}

	function c(e) {
		for (var i = 0, t = 0; t < e.length - 1; t++) {
			i += Cesium.Cartesian3.distance(e[t], e[t + 1])
		}
		return i
	}
	Cesium.DrawTool = r
}
}


export default DrMeaTool;