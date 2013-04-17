/**
 * Advanced Character Controller
 */
var THREE = require('../../vendor/Three');
var util = require('../Util');
/* var Game = require('../Game'); */
var AbstractController = require('./PositionController');

var CharacterController = function(gameobject, camera, opts) {
	CharacterController.super_.call(this, gameobject, util.extend({
		'keys' : {
			/* w s a d q e z space-bar p */
			forward : 87,
			backward : 83,
			left : 65,
			right : 68,
			up : 32,
			checkpt : 80

		},
		velocityDecreaseRate : 0.05,
		velocityIncreaseRate : 0.3,
		velocityGravity : 0.3,

		jumpVelocity : 1.6,
		cameraPosition : [ 0, 18,15 ],
		//cameraPosition : [ 0, 37, 42 ],
		cameraRotation : [ -Math.PI / 4.5, 0, 0 ]
	}, opts));
	this.enabled = false;
	this.camera = camera;

	this.pitchObject = camera;// new THREE.Object3D();
	console.log(this.opts);
	// camera relative position
	this.pitchObject.position.set.apply(this.pitchObject.position,
			this.opts.cameraPosition);
	this.pitchObject.rotation.set.apply(this.pitchObject.rotation,
			this.opts.cameraRotation);

	// this.pitchObject.position.set(0, 37,40);
	// this.pitchObject.rotation.set(-Math.PI/4.5,0,0);
	// this.pitchObject.add(camera);
	this.gameobject = gameobject;

	this.dummy = new THREE.Object3D();
	// this.dummy.position.y = 1;
	this.dummy.add(this.pitchObject);
	// this.dummy.position.x = 0;
	// this.dummy.position.z = 420;
	this.dummy.position = this.gameobject.position;

/*	var cubeGeometry = new THREE.CubeGeometry(7, 14, 7, 1, 1, 1);
	var wireMaterial = new THREE.MeshBasicMaterial({
		color : 0xff0000,
		wireframe : true
	});
	this.collisionDetectBox = new THREE.Mesh(cubeGeometry, wireMaterial);
	this.dummy.add(this.collisionDetectBox);
	this.collisionDetectBox.position.y = 8;
*/
	this.dummy.rotation.x = this.gameobject.rotation.x;
	this.gameobject.rotation.y = -Math.PI / 2;
	this.dummy.rotation.y = Math.PI / 2;
	this.dummy.rotation.z = this.gameobject.rotation.z;
	this.gameobject.parent.add(this.dummy);
	// this.dummy.add(camera);

	// this.dummy.useQuaternion = true;
	this.isOnObject = false;
	this.canJump = false;

	this.lastVelocity = new THREE.Vector3(0, 0, 0);
	this.velocity = new THREE.Vector3(0, 0, 0);

	this.movement = new THREE.Vector3(0, 0, 0);
	this.rotation = new THREE.Vector3(0, 0, 0);

	this.temp = {};

	var PI_2 = Math.PI / 2;

	var onMouseMove = function(event) {

		if (this.enabled === false)
			return;

		var movementX = event.movementX || event.mozMovementX
				|| event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY
				|| event.webkitMovementY || 0;
		// this.pitchObject.rotation.y -= movementX * 0.004;
		this.dummy.rotation.y -= movementX * 0.004;
		this.gameobject.rotation.y -= movementX * 0.004;

		/*
		 * this.pitchObject.rotation.x -= movementY * 0.002;
		 * 
		 * /this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2,
		 * this.pitchObject.rotation.x));
		 */
	};

	function bindx(scope, fn) {
		return function() {
			fn.apply(scope, arguments);
		};
	}
	;

	this.opts.domElement.addEventListener('mousemove',
			bindx(this, onMouseMove), false);

};
util.inherits(CharacterController, AbstractController);
CharacterController.prototype.reset = function() {
	this.dummy.rotation.x = this.gameobject.rotation.x;
	this.gameobject.rotation.y = -Math.PI / 2;
	this.dummy.rotation.y = Math.PI / 2;
	this.dummy.rotation.z = this.gameobject.rotation.z;
	this.gameobject.parent.add(this.dummy);
	this.isOnObject = false;
	this.canJump = false;

	this.lastVelocity = new THREE.Vector3(0, 0, 0);
	this.velocity = new THREE.Vector3(0, 0, 0);

	this.movement = new THREE.Vector3(0, 0, 0);
	this.rotation = new THREE.Vector3(0, 0, 0);
};

CharacterController.prototype.isOnObjectFN = function(boolean) {

	this.isOnObject = boolean;
	this.canJump = boolean;

};
CharacterController.prototype.update = function() {

};
CharacterController.prototype.updatex = function(delta, distances) {
	// distances : 0 ground | 1 above |2 west |3 east |4 south |5 north
	// the box is 7 * 14 * 7
	if (!this.enabled)
		return;

	// console.log(distances);
	delta *= 0.1;

	this.velocity.x += (-this.velocity.x) * (this.opts.velocityDecreaseRate)
			* delta;
	this.velocity.z += (-this.velocity.z) * (this.opts.velocityDecreaseRate)
			* delta;

	this.velocity.y -= (this.opts.velocityGravity) * delta;

	if (this.keyStatus.checkpt) {
		this.temp.checkpt = true;
	} else if (this.temp.checkpt === true) {
		console.log(this.gameobject.position);
		console.log(this.opts.jumpVelocity * delta);
		this.temp.checkpt = false;
	}

	if (this.keyStatus.forward) {
		
		this.velocity.z = distances[5] == undefined || distances[5] > 5 ? this.velocity.z
				- (this.opts.velocityIncreaseRate) * delta
				: 0;

	}
	
	if (distances[5] != undefined && this.lastVelocity.z <= 0
				&& this.velocity.z <= 0
				&& this.velocity.z < this.lastVelocity.z
				&& Math.abs(this.velocity.z) > distances[5] /*
				 * more negative
				 */) {
			this.velocity.z = -(distances[5] - 1.0);
	}
				 
	if (this.keyStatus.backward) {
	
		this.velocity.z = distances[4] == undefined || distances[4] > 5 ? this.velocity.z
				+ (this.opts.velocityIncreaseRate) * delta
				: 0;

	}
	
		if (distances[4] != undefined && this.lastVelocity.z >= 0
				&& this.velocity.z >= 0
				&& this.velocity.z > this.lastVelocity.z
				&& Math.abs(this.velocity.z) > distances[4] /*
				 * more negative
				 */) {
			this.velocity.z = distances[4] - 1.0;
		}
				 
	if (this.keyStatus.left) {
		// this.dummy.rotation.y += 0.022 * delta;
		// this.gameobject.rotation.y += 0.022 * delta;

		
		this.velocity.x = distances[2] == undefined || distances[2] > 5 ? this.velocity.x
				- 0.1 * delta
				: 0;

		// this.velocity.x -= 0.08 * delta;
	}
	
	if (distances[2] != undefined && this.lastVelocity.x <= 0
				&& this.velocity.x <= 0
				&& this.velocity.x < this.lastVelocity.x
				&& Math.abs(this.velocity.x) > distances[2] /*
				 * more negative
				 */) {
			this.velocity.x = -(distances[2] - 1.0);
		}
				 
	if (this.keyStatus.right) {
		// this.dummy.rotation.y -= 0.022 * delta;
		// this.gameobject.rotation.y -= 0.022 * delta;

		
		this.velocity.x = distances[3] == undefined || distances[3] > 5 ? this.velocity.x
				+ 0.1 * delta
				: 0;

		// this.velocity.x += 0.08 * delta;
	}
	
	if (distances[3] != undefined && this.lastVelocity.x >= 0
				&& this.velocity.x >= 0
				&& this.velocity.x > this.lastVelocity.x
				&& Math.abs(this.velocity.x) > distances[3] /*
				 * more negative
				 */) {
			this.velocity.x = distances[3] - 1.0;
		}
				 
	if (this.keyStatus.up && this.canJump) {
		// above
		if (distances[1] != undefined && this.lastVelocity.y >= 0
				&& this.velocity.y >= 0
				&& this.velocity.y > this.lastVelocity.y
				&& Math.abs(this.velocity.y) > distances[1] /*
				 * more positive
				 */) {
			this.velocity.y = distances[1] - 1;
		} else {
			this.velocity.y += Math.min(this.opts.jumpVelocity * delta,20);
		}
		this.keyStatus.up = false;
		this.canJump = false;
	}

	// if(distances[0]!=undefined) console.log(distances[0]);
	this.isOnObjectFN(distances[0] >= 0 && distances[0] <= 3);

	// below
	
			 
	if (this.isOnObject === true) {
		this.velocity.y = Math.max(0, this.velocity.y);
	}

	if (distances[0] != undefined && this.lastVelocity.y <= 0
			&& this.velocity.y <= 0 && this.velocity.y < this.lastVelocity.y
			&& Math.abs(this.velocity.y) > distances[0] /*
			 * more negative
			 */) {
		this.velocity.y = -(distances[0] - 2.0);
	}
			 
	this.dummy.translateX(this.velocity.x);
	this.dummy.translateY(this.velocity.y);
	this.dummy.translateZ(this.velocity.z);

	if (this.dummy.position.y < 1) {

		this.velocity.y = 0;
		this.dummy.position.y = 1;

		this.canJump = true;
	}

	this.lastVelocity = this.velocity.clone();

	this.gameobject.rotation.x = this.dummy.rotation.x;

	this.gameobject.rotation.z = this.dummy.rotation.z;

};

module.exports = CharacterController;
