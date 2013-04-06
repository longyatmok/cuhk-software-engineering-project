/**
 * FreeGameplay (Abstract Class)
 */
var THREE = require('../../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('../GameObjectManager');
var World = require('../World');

var Gameplay = require('./Gameplay');
THREE.PointerLockControls = require('../../vendor/THREE/PointerLockControls');

var time = Date.now();

var FreeGameplay = function(region, opts) {
    this.opts = World.extend({
	name : 'free-world'
    }, opts);
    FreeGameplay.super_.call(this, region, this.opts);

};
util.inherits(FreeGameplay, Gameplay);

FreeGameplay.prototype.respawn = function() {
    // FreeGameplay.super_.prototype.respawn.call(this);

    this.region.camera.position = new THREE.Vector3(0, 0, 0);
    this.region.camera.rotation = this.region.spawnRotation.clone();

    this.controls = new THREE.PointerLockControls(this.region.camera);
    this.gameobjects.add('controls', this.controls);
    this.scene.add(this.controls.getObject());
};

FreeGameplay.prototype.initialize = function() {

    var self = this;
    this.directions = [];
  

    
    this.directions.push(new THREE.Vector3(0, -1, 0)); // below
    this.directions.push(new THREE.Vector3(0, 1, 0)); // above
    this.directions.push(new THREE.Vector3(0, 0, 1)); // front
    this.directions.push(new THREE.Vector3(0, 0, -1)); // behind

    /*
     * this.directions.push(new THREE.Vector3(1, 1, 1)); this.directionspush(new
     * THREE.Vector3(-1, 1, 1)); this.directionspush(new THREE.Vector3(1, 1,
     * -1)); this.directionspush(new THREE.Vector3(-1, 1, -1));
     * this.directionspush(new THREE.Vector3(1, -1, 1)); this.directionspush(new
     * THREE.Vector3(-1, -1, 1)); this.directionspush(new THREE.Vector3(1, -1,
     * -1)); this.directionspush(new THREE.Vector3(-1, -1, -1));
     */
    // this.controls = controls = new
    // THREE.PointerLockControls(this.region.camera);
    // this.scene.add(controls.getObject());
    // this.gameobjects = new GameObjectManager();
    var havePointerLock = 'pointerLockElement' in document
	    || 'mozPointerLockElement' in document
	    || 'webkitPointerLockElement' in document;

    if (havePointerLock) {

	var element = document.body;

	var pointerlockchange = function(event) {

	    if (document.pointerLockElement === element
		    || document.mozPointerLockElement === element
		    || document.webkitPointerLockElement === element) {

		self.gameobjects.get('controls').enabled = true;
		World.instance.overlay.visible(false);
		// blocker.style.display = 'none';

	    } else {

		self.gameobjects.get('controls').enabled = false;

		World.instance.overlay.visible(true);
		instructions.style.display = '';

	    }

	}

	var pointerlockerror = function(event) {

	    instructions.style.display = '';

	}

	// Hook pointer lock state change events
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

	    instructions.style.display = 'none';
	    if (!self.gameobjects.get('controls').enabled) {

		self.gameobjects.get('controls').enabled = true;
		World.instance.overlay.visible(false);
		// blocker.style.display = 'none';

	    } else {

		self.gameobjects.get('controls').enabled = false;

		World.instance.overlay.visible(true);
		instructions.style.display = '';

	    }
/*
	    // Ask the browser to lock the pointer
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

	    }*/

	}, false);

    } else {

	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

    }

};

FreeGameplay.prototype.render = function(dt) {
    this.gameobjects.render(dt);

    // DemoOneRegion.super_.prototype.render.call(this);
    time = Date.now();
    var directionDistance = [];
    for ( var direction in this.directions) {
	// this.position refers to the character's current position
	/*
	 * var ray = new THREE.Ray(controls.getObject().position,
	 * this.directions[direction]);
	 */
	var caster = new THREE.Raycaster();
	caster.ray.origin.copy(this.controls.getObject().position);
	// caster.ray.origin.y -= 20;
	caster.ray.direction = this.directions[direction];
	var intersections = caster
		.intersectObjects(this.region.regionobjects.objects);

	if (intersections.length > 0) {

	    var distance = intersections[0].distance;
	    directionDistance[ direction ] = distance;
	    break;
	   // return;
	}

    }
    this.controls.updatex(dt,directionDistance[0]);
    return;
    // this.controls.isOnObject(false);
    this.controls.updatex(dt);

}

module.exports = FreeGameplay;