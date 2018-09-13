import Cesium from 'cesium/Cesium'
let handler=null;
let biaozhu=null;
let entity=null;
let shuz=[];

/*添加点*/
const add_dian=function(viewer,checked){

	if(handler!==null){
		if (!handler.isDestroyed()) {
			handler.destroy();
		}
	}


	handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	handler.setInputAction(function(movement) {

		if(handler!==null){
			if (!handler.isDestroyed()) {
				handler.destroy();
			}
		}

		var cartesian=null;
		if(checked){
			var ray=viewer.camera.getPickRay(movement.position);
			cartesian=viewer.scene.globe.pick(ray,viewer.scene);
		}else{
			cartesian=viewer.scene.camera.pickEllipsoid(movement.position,viewer.scene.globe.ellipsoid);
		}
	    if(cartesian){
	    	biaozhu=viewer.entities.add({
				  position :cartesian,
				  point : {
				    pixelSize : 10,
				    color : Cesium.Color.CHARTREUSE,
				    outlineColor : Cesium.Color.WHITE,
				    outlineWidth : 2,
				    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
				  }

			});
	    	shuz.push(biaozhu);
	    }
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}


/*添加线*/
const add_line=function(viewer,checked){
	var PolyLinePrimitive = (function(){
	    function _(positions){
	        this.options = {
	            polyline : {
	                positions :positions,
	                material: Cesium.Color.CHARTREUSE  ,
	                clampToGround : true,
	                width: 4
	            }
	        };
	        this.positions = positions;
	        this.init();
	    }

	    _.prototype.init = function(){
	        var _self = this;
	        var _update = function(){
	            return _self.positions;
	        };
	        this.options.polyline.positions = new Cesium.CallbackProperty(_update,false);
	        biaozhu=viewer.entities.add(this.options);
	        shuz.push(biaozhu);
	    };

	    return _;
	})();

	var positions = [];
	var poly = undefined;
	if(handler!==null){
		if (!handler.isDestroyed()) {
			handler.destroy();
		}
	}
	handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	handler.setInputAction(function(movement){
		var cartesian=null;
		if(checked){
			var ray=viewer.camera.getPickRay(movement.position);
			cartesian=viewer.scene.globe.pick(ray,viewer.scene);
		}else{
			cartesian=viewer.scene.camera.pickEllipsoid(movement.position,viewer.scene.globe.ellipsoid);
		}

		 if(typeof(cartesian) == "undefined"){
			 return;
		 }

	    if(positions.length == 0) {
	        positions.push(cartesian.clone());
	    }
	    positions.push(cartesian);

	    biaozhu = viewer.entities.add({
			position:positions[positions.length - 1],
	    });

	},Cesium.ScreenSpaceEventType.LEFT_CLICK);

	handler.setInputAction(function(movement){
		var cartesian=null;
		if(checked){
			var ray=viewer.camera.getPickRay(movement.endPosition);
			cartesian=viewer.scene.globe.pick(ray,viewer.scene);
		}else{
			cartesian=viewer.scene.camera.pickEllipsoid(movement.endPosition,viewer.scene.globe.ellipsoid);
		}

		 if(typeof(cartesian) == "undefined"){
			 return;
		 }

	    if(positions.length >= 2){
	        if (!Cesium.defined(poly)) {
	            poly = new PolyLinePrimitive(positions);
	        }else{
	            positions.pop();
	            positions.push(cartesian);
	        }
	    }
	},Cesium.ScreenSpaceEventType.MOUSE_MOVE);

	handler.setInputAction(function(movement){
	    handler.destroy();
	},Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

}

/*添加面*/
const add_polygon=function(viewer,checked){
	var PolyLinePrimitive = (function(){
	    function _(positions){
	        this.options = {
	        	polygon  : {
	                show : true,
	                hierarchy  : [],
	                material : Cesium.Color.CHARTREUSE.withAlpha(0.5)

	            }
	        };
	        this.positions = positions;
	        this._init();
	    }

	    _.prototype._init = function(){
	        var _self = this;
	        var _update = function(){
	            return _self.positions;
	        };
	        this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update,false);
	        biaozhu=viewer.entities.add(this.options);
	        shuz.push(biaozhu);
	    };

	    return _;
	})();

	var positions = [];
	var poly = undefined;
	if(handler!==null){
		if (!handler.isDestroyed()) {
			handler.destroy();
		}
	}
	handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	handler.setInputAction(function(movement){
		var cartesian=null;
		if(checked){
			var ray=viewer.camera.getPickRay(movement.position);
			cartesian=viewer.scene.globe.pick(ray,viewer.scene);
		}else{
			cartesian=viewer.scene.camera.pickEllipsoid(movement.position,viewer.scene.globe.ellipsoid);
		}

		 if(typeof(cartesian) == "undefined"){
			 return;
		 }

	    if(positions.length == 0) {
	        positions.push(cartesian.clone());
	    }
	    positions.push(cartesian);

	    biaozhu = viewer.entities.add({
			position:positions[positions.length - 1],
	    });
	    shuz.push(biaozhu);
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);

	handler.setInputAction(function(movement){
		var cartesian=null;
		if(checked){
			var ray=viewer.camera.getPickRay(movement.endPosition);
			cartesian=viewer.scene.globe.pick(ray,viewer.scene);
		}else{
			cartesian=viewer.scene.camera.pickEllipsoid(movement.endPosition,viewer.scene.globe.ellipsoid);
		}

		 if(typeof(cartesian) == "undefined"){
			 return;
		 }

	    if(positions.length >= 2){
	        if (!Cesium.defined(poly)) {
	            poly = new PolyLinePrimitive(positions);
	        }else{
	            positions.pop();
	            positions.push(cartesian);
	        }
	    }
	},Cesium.ScreenSpaceEventType.MOUSE_MOVE);

	handler.setInputAction(function(movement){
	    handler.destroy();
	},Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
}


/*添加文字*/
const add_title=function(viewer,checked){
	if(handler!==null){
		if (!handler.isDestroyed()) {
			handler.destroy();
		}
	}


	handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	handler.setInputAction(function(movement) {
		if(handler!==null){
			if (!handler.isDestroyed()) {
				handler.destroy();
			}
		}

		var cartesian=null;
		if(checked){
			var ray=viewer.camera.getPickRay(movement.position);
			cartesian=viewer.scene.globe.pick(ray,viewer.scene);
		}else{
			cartesian=viewer.scene.camera.pickEllipsoid(movement.position,viewer.scene.globe.ellipsoid);
		}
	    if(cartesian){
	    	biaozhu=viewer.entities.add({
				  position :cartesian,
				  label: {
					  text : '文字',
					  font: '18px sans-serif',
					  style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
				  }
			});
	    }
	    shuz.push(biaozhu);
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
const changeTitle=function(wz){
	biaozhu.label.text=wz;
}


/*清除标注*/
const clearBZ=function(viewer){
	var len=shuz.length;
	if(len==0){
		alert("请选择要删除的标注");
		return;
	}
	$(".biaohui .bztools .del").css({"border":"1px solid #00dcff","background":"rgba(0, 220, 255, 0.5)"});
	handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	handler.setInputAction(function(evt) {
		if(handler!==null){
			if (!handler.isDestroyed()) {
				handler.destroy();
			}
		}

		var pickedObject =viewer.scene.pick(evt.position);
	    if (Cesium.defined(pickedObject) && pickedObject.id!=null) {
	    	entity = viewer.entities.getById(pickedObject.id.id);
	    	viewer.entities.remove(entity);
	    	shuz.pop();
	    	$(".biaohui .bztools .del").css({"border":"1px solid #ffffff","background":""});
	    }
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

}

export {
  add_dian,
  add_line,
  add_polygon,
  add_title,
  changeTitle,
  clearBZ
}
