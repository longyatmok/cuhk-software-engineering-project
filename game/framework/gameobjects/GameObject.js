var THREE = require('../../vendor/Three');
var util = require('util');

var GameObject = function(geometry , material){
	GameObject.super_.call(this,geometry , material);
};
util.inherits(GameObject , THREE.Mesh);

GameObject.prototype.load_ = function(){
	return false;
};
//loop code goes here
GameObject.prototype.update = function(){
	return false;
};

GameObject.prototype.dispose = function(){
	return false;
};
//TODO

module.exports = GameObject;
