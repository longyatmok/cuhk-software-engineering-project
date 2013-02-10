var THREE = require('../client/vendor/Three');
var util = require('util');

var GameObject = function(geometry , material){
	GameObject.super_.call(this,geometry , material);
};
util.inherits(GameObject , THREE.Mesh);

//loop code goes here
GameObject.prototype.update = function(){
	return false;
};
//TODO



module.exports = GameObject;
