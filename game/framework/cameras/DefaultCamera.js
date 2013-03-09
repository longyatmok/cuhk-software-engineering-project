var THREE = require('../../vendor/Three');
var util = require('../Util');
var DefaultCamera = function(){
	this.id;
	DefaultCamera.super_.apply(this,arguments);

};
util.inherits(DefaultCamera,THREE.PerspectiveCamera);
