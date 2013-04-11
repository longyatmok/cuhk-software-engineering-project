var THREE = require('../../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('../GameObjectManager');
var World = require('../World');
THREE.PointerLockControls = require('../../vendor/THREE/PointerLockControls');

var controls, time = Date.now();
/**
 * Gameplay (Abstract Class)
 * 
 * @constructor
 * @this {Gameplay}
 * @param {region,
 *            opts}
 */
var Gameplay = function(region, opts) {
	this.opts = World.extend({
		name : 'abstract-gameplay'
	}, opts);
	this.region = region;
	this.scene = this.region.scene;
	this.camera = this.region.camera;
	this.gameobjects = new GameObjectManager();

	// this.initialize();
	// this.respawn();

};

/**
 * Gameplay respawn
 * 
 * @this {Gameplay}
 */

Gameplay.prototype.respawn = function() {
	// this.camera = this.region.camera.clone();
	this.camera.position = this.region.spawnLocation.clone();
	this.camera.rotation = this.region.spawnRotation.clone();
};
/**
 * Gameplay initialization
 * 
 * @this {Gameplay}
 */

Gameplay.prototype.initialize = function() {
	// this.respawn();
	console.log('calling abstract method');
	// abstract method
};
/**
 * Gameplay render
 * 
 * @this {Gameplay}
 * @param dt
 */
Gameplay.prototype.render = function(dt) {
	this.gameobjects.render(dt);
};

Gameplay.prototype.renderAfter = function(renderer, dt) {

};
module.exports = Gameplay;