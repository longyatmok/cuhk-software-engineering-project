var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var GameObject = require('../../framework/gameobjects/GameObject');

var Region = require('../../framework/Region');
/* The title screen scene */

/**
 * Title screen
 * @constructor
 * @this {TitleScreen}
 */
var TitleScreen = function() { 
	TitleScreen.super_.call(this, {
		id : 'title-screen'
	});

	var logoCube = new LogoCube();
	this.regionobjects.add('logocube', logoCube);
	this.spawnLocation = new THREE.Vector3(0, 3, 2);
	this.spawnRotation = new THREE.Vector3(-1, 0, 1);
	/*
	this.camera.position = new THREE.Vector3(0,3,2);
	this.camera.rotation = new THREE.Vector3(-1, 0, 1);*/
	this.scene.add(logoCube);

};
util.inherits(TitleScreen, Region);


/**
 * testure and model of the Logo
 * @constructor
 * @this {LogoCube}
 */
LogoCube = function() {
	LogoCube.super_.call(this);

	this.geometry = new THREE.CubeGeometry(1, 1, 1);
	this.material = new THREE.MeshBasicMaterial({
		color : 0x29c2bf,
	});
	this.material2 = new THREE.MeshBasicMaterial({
		color : 0x000000,
		wireframe : true,
		wireframeLinewidth : 100
	});

	this.add(new THREE.Mesh(this.geometry, this.material));
	this.add(new THREE.Mesh(this.geometry, this.material2));
	this.children[ 1 ].scale.multiplyScalar( 1.01 ); //made wire more visible
	
	//LogoCube.super_.call(this, this.geometry, this.material);
};

util.inherits(LogoCube, THREE.Object3D);
/**
 * motion of the logo
 * @this {LogoCube}
 */
LogoCube.prototype.update = function() {
	this.rotation.x += 0.01;
	this.rotation.y += 0.005;
	this.rotation.z += 0.003;
};

module.exports = TitleScreen;