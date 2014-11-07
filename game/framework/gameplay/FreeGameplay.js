/**
 * FreeGameplay (Abstract Class) inherited from Gameplay
 * 
 * @constructor
 * @this {FreeGameplay}
 * @param {region,
 *            opts}
 */
var THREE = require('../../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('../GameObjectManager');
var World = require('../World');
var Gameplay = require('./Gameplay');
var ColladaLoader = require('../../vendor/loaders/ColladaLoader');
var CharacterController = require('../controllers/CharacterController');

/**
 * 
 * 
 * @constructor
 * @this {FreeGameplay}
 * @param region
 *            Region
 * @param opts
 *            Options Object
 */

var EventListener;
var FreeGameplay = function(region, opts) {
	this.opts = World.extend({
		name : 'free-world',
		yLevel : 10,
		debugLine : false
	}, opts);
	this.ready = false;
	FreeGameplay.super_.call(this, region, this.opts);
};
util.inherits(FreeGameplay, Gameplay);

FreeGameplay.prototype.respawn = function(position) {
	if (!this.ready)
		return false;
	if(typeof position =="undefined"){
		position  = this.region.spawnLocation;
	}
	// FreeGameplay.super_.prototype.respawn.call(this);
	if (this.controls == undefined) {
		this.region.camera.position = new THREE.Vector3(0, 0, 0);
		this.region.camera.rotation = new THREE.Vector3(0, 0, 0);
		this.gameobjects.get('game.player').position = position.clone();
		this.gameobjects.get('game.player').rotation = this.region.spawnRotation
				.clone();
		this.controls = new CharacterController(this.gameobjects
				.get('game.player'), this.region.camera);
		this.gameobjects.add('controls', this.controls);
		this.scene.add(this.controls.dummy);

	} else {
		this.gameobjects.get('game.player').position.x = position.x;
		this.gameobjects.get('game.player').position.y = position.y;
		this.gameobjects.get('game.player').position.z =position.z;
		this.controls.reset();
	}
};
FreeGameplay.prototype.dispose = function(){
	document.removeEventListener('pointerlockchange', EventListener, false);
document.removeEventListener('mozpointerlockchange',EventListener,
	false);
document.removeEventListener('webkitpointerlockchange', EventListener,
	false);

};
FreeGameplay.prototype.initialize = function() {
	FreeGameplay.super_.prototype.initialize.call(this);

	//the way to use pointer lock
	//pointer lock example 
	//@see https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock
	var havePointerLock = 'pointerLockElement' in document
			|| 'mozPointerLockElement' in document
			|| 'webkitPointerLockElement' in document;

	if (havePointerLock) {

		var element = document.body;

		var pointerlockchange = EventListener = function(event) {

			if (document.pointerLockElement === element
					|| document.mozPointerLockElement === element
					|| document.webkitPointerLockElement === element) {

				self.gameobjects.get('controls').enabled = true;
				World.instance.overlay.visible(false);
			} else {
				self.gameobjects.get('controls').enabled = false;
				World.instance.overlay.visible(true);
				instructions.style.display = '';

			}

		}

		var pointerlockerror = function(event) {
			instructions.style.display = '';
		}

		document
				.addEventListener('pointerlockchange', pointerlockchange, false);
		document.addEventListener('mozpointerlockchange', pointerlockchange,
				false);
		document.addEventListener('webkitpointerlockchange', pointerlockchange,
				false);

		document.addEventListener('pointerlockerror', pointerlockerror, false);
		document.addEventListener('mozpointerlockerror', pointerlockerror,
				false);
		document.addEventListener('webkitpointerlockerror', pointerlockerror,
				false);

		instructions.addEventListener('click', function(event) {
			//request pointer lock
			element.requestPointerLock = element.requestPointerLock
					|| element.mozRequestPointerLock
					|| element.webkitRequestPointerLock;

			if (/Firefox/i.test(navigator.userAgent)) {

				var fullscreenchange = function(event) {

					if (document.fullscreenElement === element
							|| document.mozFullscreenElement === element
							|| document.mozFullScreenElement === element) {

						document.removeEventListener('fullscreenchange',
								fullscreenchange);
						document.removeEventListener('mozfullscreenchange',
								fullscreenchange);

						element.requestPointerLock();
					}

				}

				document.addEventListener('fullscreenchange', fullscreenchange,
						false);
				document.addEventListener('mozfullscreenchange',
						fullscreenchange, false);

				element.requestFullscreen = element.requestFullscreen
						|| element.mozRequestFullscreen
						|| element.mozRequestFullScreen
						|| element.webkitRequestFullscreen;

				element.requestFullscreen();

			} else {

				element.requestPointerLock();

			}

		}, false);

	} else {

		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

	}

	//defines directions
	
	this.directions = [];
	this.directions.push(new THREE.Vector3(0, -1, 0));// 0 below
	this.directions.push(new THREE.Vector3(0, 1, 0)); // 1 above
	this.directions.push(new THREE.Vector3(0, 0, 1)); // 2 west
	this.directions.push(new THREE.Vector3(0, 0, -1));// 3 east
	this.directions.push(new THREE.Vector3(1, 0, 0)); // 4 south
	this.directions.push(new THREE.Vector3(-1, 0, 0));// 5 north
	// this.directions.push(new THREE.Vector3(1, -1, 1));
	var self = this;

	console.log("[loader]start");
	var loader = new THREE.ColladaLoader();
	
	//load the player's character
	loader.load('gameobjects/steve/steve.dae', function(result) {
		var avatar = result.scene;
		avatar.scale = new THREE.Vector3(0.02, 0.02, 0.04);
		console.log("[loader] success");
		self.gameobjects.add('character.template', avatar.clone());
		//avatar_fps = new THREE.Object3D();
		self.gameobjects.add('game.player',avatar);
		self.scene.add(avatar);

		self.ready = true;
		self.respawn();

	});
/*	loader.load('gameobjects/avatar/boy01_v2.dae', function(result) {
		var avatar = result.scene;
		avatar.scale = new THREE.Vector3(0.01, 0.01, 0.02);
		console.log("[loader] success");
		self.gameobjects.add('character.template', avatar.clone());
		//avatar_fps = new THREE.Object3D();
		self.gameobjects.add('game.player',avatar);
		self.scene.add(avatar);

		self.ready = true;
		self.respawn();

	});*/

}
var lines = [];
FreeGameplay.prototype.render = function(dt) {
	if (!this.ready)
		return;
	this.gameobjects.render(dt);

	var directionDistance = [];

	

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

		if (this.opts.debugLine === true && lines[direction] != undefined) {
			this.scene.remove(lines[direction]);
		}

		if (intersections.length > 0) {

			var geometry = new THREE.Geometry();
			// DEBUG RAY LINE START // POSITION OF MESH TO SHOOT RAYS OUT OF
			geometry.vertices
					.push(this.gameobjects.get('game.player').position);
			geometry.vertices.push(intersections[0].point);

			if (this.opts.debugLine === true) {
				lines[direction] = new THREE.Line(geometry,

				new THREE.LineBasicMaterial({
					color : 0x990000
				}));
				this.scene.add(lines[direction]);

			}
			// DEBUG RAY LINE END
			if (intersections[0].distance) {
				directionDistance[direction] = intersections[0].distance; // take
				// the
				// nearest
				// intersection
				// object
			}

		}

	}
	

	if (this.gameobjects.get('game.player').position.y < this.opts.yLevel) {
		this.respawn();
	}
	
	if(this.gameobjects.get('game.player').position.y > 174){
		this.region.spawnLocation = new THREE.Vector3( -119.58874315990386, 180.5245740939652, -12.909299118498613);
	}
	// DEBUG
	/*
	 * if (directionDistance.length > 0) console.log(directionDistance);
	 */
	this.controls.updatex(Date.now() - World.instance.time, directionDistance);
	return;

}
module.exports = FreeGameplay;