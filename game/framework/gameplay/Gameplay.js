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
	this.gameobjects = new GameObjectManager();
	this.initialize();
};

Gameplay.prototype.initialize = function(){
	console.log('calling abstract method');
	//abstract method
};
Gameplay.prototype.render = function(dt) {
	this.gameobjects.render(dt);
};

module.exports = Gameplay;