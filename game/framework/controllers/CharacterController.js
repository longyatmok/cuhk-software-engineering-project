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
	    /* w s a d q e z space-bar */
	    forward : 87,
	    backward : 83,
	    left : 65,
	    right : 68,
	    up : 32

	}
    }, opts));

    this.camera = camera;

    this.pitchObject = new THREE.Object3D();
    // camera relative position
    this.pitchObject.position = new THREE.Vector3(0, 40, 70);

    this.pitchObject.add(camera);
    this.gameobject = gameobject;

    this.dummy = new THREE.Object3D();
    this.dummy.position.y = 1;
    this.dummy.add(this.pitchObject);
    this.dummy.position.x = 0;
    this.dummy.position.z = 420;
    this.dummy.position = this.gameobject.position;

    var cubeGeometry = new THREE.CubeGeometry(7, 14, 7, 1, 1, 1);
    var wireMaterial = new THREE.MeshBasicMaterial({
	color : 0xff0000,
	wireframe : true
    });
    this.collisionDetectBox = new THREE.Mesh(cubeGeometry, wireMaterial);
    this.dummy.add(this.collisionDetectBox);
    this.collisionDetectBox.position.y = 8;

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
    /*
     * var onMouseMove = function(event) {
     * 
     * if (this.enabled === false) return;
     * 
     * var movementX = event.movementX || event.mozMovementX ||
     * event.webkitMovementX || 0; var movementY = event.movementY ||
     * event.mozMovementY || event.webkitMovementY || 0;
     * 
     * this.dummy.rotation.y -= movementX * 0.002; this.pitchObject.rotation.x -=
     * movementY * 0.002;
     * 
     * this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2,
     * this.pitchObject.rotation.x)); };
     * 
     * function bindx(scope, fn) { return function() { fn.apply(scope,
     * arguments); }; } ;
     * 
     * this.opts.domElement.addEventListener('mousemove', bindx(this,
     * onMouseMove), false);
     */

};
util.inherits(CharacterController, AbstractController);

CharacterController.prototype.isOnObjectFN = function(boolean) {

    this.isOnObject = boolean;
    this.canJump = boolean;

};
CharacterController.prototype.update = function() {

};
CharacterController.prototype.updatex = function(delta, distances) {
    // distances : 0 ground 1 above 2 west 3 east 4 south 5 north
    // the box is 7 * 14 * 7
    if (!this.enabled)
	return;

    delta *= 0.1;

    this.velocity.x += (-this.velocity.x) * 0.08 * delta;
    this.velocity.z += (-this.velocity.z) * 0.08 * delta;

    this.velocity.y -= 0.25 * delta;

    if (this.keyStatus.forward) {
	if (distances[5] != undefined && this.lastVelocity.z <= 0
		&& this.velocity.z <= 0
		&& this.velocity.z < this.lastVelocity.z
		&& Math.abs(this.velocity.z) > distances[5] /*
		 * more negative
		 */) {
	    this.velocity.y = -distances[5];
	}
	this.velocity.z = distances[5] == undefined || distances[5] > 5 ? this.velocity.z
		- 0.12 * delta
		: 0;

    }
    if (this.keyStatus.backward) {
	if (distances[4] != undefined && this.lastVelocity.z >= 0
		&& this.velocity.z >= 0
		&& this.velocity.z > this.lastVelocity.z
		&& Math.abs(this.velocity.z) > distances[4] /*
		 * more negative
		 */) {
	    this.velocity.y = distances[4];
	}
	this.velocity.z = distances[4] == undefined || distances[4] > 5 ? this.velocity.z
		+ 0.12 * delta
		: 0;

    }
    if (this.keyStatus.left) {
	this.dummy.rotation.y += 0.022 * delta;
	this.gameobject.rotation.y += 0.022 * delta;
	// this.velocity.x -= 0.06 * delta;
    }
    if (this.keyStatus.right) {
	this.dummy.rotation.y -= 0.022 * delta;
	this.gameobject.rotation.y -= 0.022 * delta;
	// this.velocity.x += 0.06 * delta;
    }
    if (this.keyStatus.up && this.canJump) {
	this.velocity.y += 7;
	this.keyStatus.up = false;
	this.canJump = false;
    }

    // if(distances[0]!=undefined) console.log(distances[0]);
    this.isOnObjectFN(distances[0] >= 0 && distances[0] <= 1);

    // above
    if (distances[1] != undefined && this.lastVelocity.y >= 0
	    && this.velocity.y >= 0 && this.velocity.y < this.lastVelocity.y
	    && Math.abs(this.velocity.y) > distances[1] /*
	     * more positive
	     */) {
	this.velocity.y = distances[1];
    }

    // below
    if (distances[0] != undefined && this.lastVelocity.y <= 0
	    && this.velocity.y <= 0 && this.velocity.y < this.lastVelocity.y
	    && Math.abs(this.velocity.y) > distances[0] /*
	     * more negative
	     */) {
	this.velocity.y = -distances[0] + 0.95;
    }
    if (this.isOnObject === true) {
	this.velocity.y = Math.max(0, this.velocity.y);
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
