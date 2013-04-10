var util = require('../../../framework/Util');
var THREE = require('../../../vendor/Three');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var FreeGameplay = require('../../../framework/gameplay/FreeGameplay');
var ColladaLoader = require('../../../vendor/loaders/ColladaLoader');
var CharacterController = require('../../../framework/controllers/CharacterController');
var THREEx = THREEx || {};
THREE.TrackballControls = require('../../../vendor/THREE/TrackballControls');
/**
 * Practice Mode is a standalone free mode. inherited from FreeGameplay
 * 
 * @constructor
 * @this {PracticeModeGameplay}
 * @param region
 *                Region
 * @param opts
 *                Options Object
 */
var PracticeModeGameplay = function(region, opts) {
	this.opts = World.extend({
		name : 'practice-world'
	}, opts);
	this.ready = false;
	PracticeModeGameplay.super_.call(this, region, this.opts);
};
util.inherits(PracticeModeGameplay, FreeGameplay);
PracticeModeGameplay.prototype.respawn = function() {
	if (!this.ready)
		return false;
	// FreeGameplay.super_.prototype.respawn.call(this);
	if (this.controls == undefined) {
		this.region.camera.position = new THREE.Vector3(0, 0, 0);
		this.region.camera.rotation = new THREE.Vector3(0, 0, 0);
		this.gameobjects.get('game.player').position = this.region.spawnLocation
				.clone();
		this.gameobjects.get('game.player').rotation = this.region.spawnRotation
		.clone();
		this.controls = new CharacterController(this.gameobjects
				.get('game.player'), this.region.camera);
		this.gameobjects.add('controls', this.controls);
		this.scene.add(this.controls.dummy);
		/*
		    this.controls2 = new THREE.TrackballControls(this.region.camera);
		    this.controls2.rotateSpeed = 4.0;
		    this.controls2.zoomSpeed = 3.6;
		    this.controls2.panSpeed = 2.0;
		    this.controls2.noZoom = false;
		    this.controls2.noPan = true;
		    this.controls2.staticMoving = true;
		    this.controls2.dynamicDampingFactor = 0.3;
		 
		    this.gameobjects.add("__boilerplate_controls_trackball", this.controls2);
		 */

	} else {
		this.gameobjects.get('game.player').position.x = this.region.spawnLocation.x;
		this.gameobjects.get('game.player').position.y = this.region.spawnLocation.y;
		this.gameobjects.get('game.player').position.z = this.region.spawnLocation.z;
		this.controls.reset();
	}
};

PracticeModeGameplay.prototype.initialize = function() {
	PracticeModeGameplay.super_.prototype.initialize.call(this); // pointer
	// lock
	// initialize
	this.directions = [];
	this.directions.push(new THREE.Vector3(0, -1, 0));// 0 below
	this.directions.push(new THREE.Vector3(0, 1, 0)); // 1 above
	this.directions.push(new THREE.Vector3(0, 0, 1)); // 2 west
	this.directions.push(new THREE.Vector3(0, 0, -1));// 3 east
	this.directions.push(new THREE.Vector3(1, 0, 0)); // 4 south
	this.directions.push(new THREE.Vector3(-1, 0, 0));// 5 north
	//this.directions.push(new THREE.Vector3(1, -1, 1));
	var self = this;

	console.log("[loader]start");
	var loader = new THREE.ColladaLoader();
	loader.load('gameobjects/avatar/boy01_v2.dae', function(result) {
		var avatar = result.scene;
		self.gameobjects.add('character.template', avatar.clone());
		avatar.scale = new THREE.Vector3(0.01, 0.01, 0.02);
		console.log("[loader] success");

		self.gameobjects.add('game.player', avatar);
		self.scene.add(avatar);

		self.ready = true;
		self.respawn();
		/*
		 * avatar.position = self.controls.getObject().position; avatar.rotation =
		 * self.controls.getObject().rotation;
		 */
	});

}
var lines = [];
PracticeModeGameplay.prototype.render = function(dt) {
	if (!this.ready)
		return;
	this.gameobjects.render(dt);

	var directionDistance = [];

	time = Date.now();

	for ( var direction in this.directions) {
		// this.position refers to the character's current position
		var caster = new THREE.Raycaster();
		caster.ray.origin.copy(this.gameobjects.get('game.player').position);
		// caster.ray.origin.y += 5;
		var vector = this.directions[direction].clone();
		var axis = new THREE.Vector3(0, 1, 0);
		var angle = (Math.PI / 2)
				+ (this.gameobjects.get('game.player').rotation.y); // prefect!
		// (the direction vector change as the character's rotation is changed
		var matrix = new THREE.Matrix4().makeRotationAxis(axis, angle);

		vector.applyMatrix4(matrix);

		caster.ray.direction = vector;
		var intersections = caster
				.intersectObjects(this.region.regionobjects.objects);

		if (lines[direction] != undefined) {
			this.scene.remove(lines[direction]);
		}

		if (intersections.length > 0) {

			var geometry = new THREE.Geometry();
			// DEBUG RAY LINE START // POSITION OF MESH TO SHOOT RAYS OUT OF
			geometry.vertices
					.push(this.gameobjects.get('game.player').position);
			geometry.vertices.push(intersections[0].point);

			lines[direction] = new THREE.Line(geometry,
					new THREE.LineBasicMaterial({
						color : 0x990000
					}));
			this.scene.add(lines[direction]);

			// DEBUG RAY LINE END
			var distance = intersections[0].distance;
			if (distance) {
				directionDistance[direction] = distance;
			}

		}

	}

	if (this.gameobjects.get('game.player').position.y < 40) {
		this.respawn();
	}
	// DEBUG
	/*
	 * if (directionDistance.length > 0) console.log(directionDistance);
	 */
	this.controls.updatex(dt, directionDistance);
	return;

}
module.exports = PracticeModeGameplay;