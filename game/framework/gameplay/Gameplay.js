/**
 * Gameplay (Abstract Class)
 */
var THREE = require('../../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('../GameObjectManager');
var World = require('../World');
THREE.PointerLockControls = require('../../vendor/THREE/PointerLockControls');

var controls, time = Date.now();

var Gameplay = function(region, opts) {
	this.opts = World.extend({
		name : 'abstract-gameplay'
	}, opts);
	this.region = region;
	this.scene = this.region.scene;
	this.camera = this.region.camera;
	this.gameobjects = new GameObjectManager();
	
//	this.initialize();
//	this.respawn();
	
};

Gameplay.prototype.respawn = function(){
	//this.camera = this.region.camera.clone();
	this.camera.position = this.region.spawnLocation.clone();
	this.camera.rotation = this.region.spawnRotation.clone();
};

Gameplay.prototype.initialize = function(){
	//this.respawn();
	console.log('calling abstract method');
	//abstract method
};
Gameplay.prototype.render = function(dt) {
	this.gameobjects.render(dt);
};

module.exports = Gameplay;