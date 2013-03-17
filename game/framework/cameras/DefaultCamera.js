var THREE = require('../../vendor/Three');
var util = require('../Util');
var DefaultCamera = function() {

	DefaultCamera.super_.apply(this, arguments);

	this._marker = new THREE.Mesh(new THREE.SphereGeometry(
			5, 5, 5), new THREE.MeshPhongMaterial({
		color : 0xff0000,
		emissive : 0xff0000,
		shading : THREE.FlatShading
	}));
	

};

DefaultCamera.prototype.update = function(){
	if(this._marker.parent != this.parent){
		this.parent.add(this._marker);
	}
	
}

util.inherits(DefaultCamera, THREE.PerspectiveCamera);
module.exports = DefaultCamera;