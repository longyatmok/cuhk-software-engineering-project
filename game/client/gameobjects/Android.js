var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObject = require('../../framework/gameobjects/GameObject');

var Android = function() {
    this.geometry = new THREE.CubeGeometry(2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({
	color : 0xff0000,
	wireframe : true
    });
    Android.super_.call(this, this.geometry, this.material);
};

util.inherits(Android, GameObject);

Android.prototype.update = function() {
 
};

module.exports = Android;