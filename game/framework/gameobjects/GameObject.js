/**
 * Object inside the game world to represent anything inside the game world.
 * @constructor
 * @this {GameObject}
 * @param {geometry, material} 
 */
var THREE = require('../../vendor/Three');
var util = require('util');

var GameObject = function(geometry , material){
	GameObject.super_.call(this,geometry , material);
};
util.inherits(GameObject , THREE.Mesh);

/**
 * Load game object
 * @return {boolean} false
 */
GameObject.prototype.load_ = function(){
	return false;
};

/**
 * Update game object
 */
//loop code goes here
GameObject.prototype.update = function(){
	return false;
};

/**
 * Dispose game object
 */
GameObject.prototype.dispose = function(){
	return false;
};
//TODO

module.exports = GameObject;
