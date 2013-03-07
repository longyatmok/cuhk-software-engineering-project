/**
 * Gameplay (Abstract Class)
 */
var THREE = require('../vendor/Three');
var util = require('./Util');
var GameObjectManager = require('./GameObjectManager');
var World = require('./World');
THREE.PointerLockControls = require('../vendor/THREE/PointerLockControls');

var controls, time = Date.now();

var Gameplay = function(region, opts) {
	opts = World.extend({
		name : 'open-world'
	}, opts);

	this.region = region;
	this.scene = this.region.scene;

	this.directions = [];
//	this.directions.push(new THREE.Vector3(0, 1, 0)); // above
	this.directions.push(new THREE.Vector3(0, -1, 0)); // below
/*	this.directions.push(new THREE.Vector3(0, 0, 1)); // front
	this.directions.push(new THREE.Vector3(0, 0, -1)); // behind*/
	/*
	 * this.directions.push(new THREE.Vector3(1, 1, 1)); this.directionspush(new
	 * THREE.Vector3(-1, 1, 1)); this.directionspush(new THREE.Vector3(1, 1,
	 * -1)); this.directionspush(new THREE.Vector3(-1, 1, -1));
	 * this.directionspush(new THREE.Vector3(1, -1, 1)); this.directionspush(new
	 * THREE.Vector3(-1, -1, 1)); this.directionspush(new THREE.Vector3(1, -1,
	 * -1)); this.directionspush(new THREE.Vector3(-1, -1, -1));
	 */
	controls = new THREE.PointerLockControls(this.region.camera);

	this.scene.add(controls.getObject());
	this.gameobjects = new GameObjectManager();

	var havePointerLock = 'pointerLockElement' in document
			|| 'mozPointerLockElement' in document
			|| 'webkitPointerLockElement' in document;

	if (havePointerLock) {

		var element = document.body;

		var pointerlockchange = function(event) {

			if (document.pointerLockElement === element
					|| document.mozPointerLockElement === element
					|| document.webkitPointerLockElement === element) {

				controls.enabled = true;

				blocker.style.display = 'none';

			} else {

				controls.enabled = false;

				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';

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

			}

		}, false);

	} else {

		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

	}

};

Gameplay.prototype.render = function(dt) {
	this.gameobjects.render(dt);


	
	// DemoOneRegion.super_.prototype.render.call(this);
	time = Date.now();
	for ( var direction in this.directions) {
		// this.position refers to the character's current position
	/*	var ray = new THREE.Ray(controls.getObject().position,
				this.directions[direction]);
		*/
		var caster = new THREE.Raycaster();
		caster.ray.origin.copy(  controls.getObject().position );
		caster.ray.origin.y -= 10;
		caster.ray.direction = this.directions[direction];
		var intersections = caster
				.intersectObjects(this.region.regionobjects.objects);

		if (intersections.length > 0) {

			var distance = intersections[0].distance;
			if (distance > 0 && distance < 10) {
				console.log(direction + ' blocked');
				controls.isOnObject(true);
				controls.update(dt);
				return;
			}

		}

	}
	
	controls.isOnObject(false);
	controls.update(dt);

}

module.exports = Gameplay;