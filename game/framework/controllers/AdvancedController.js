/**
 * Advanced Vehicle Controller (Experiment)
 */
var THREE = require('../../vendor/Three');
var util = require('../Util');
/* var Game = require('../Game'); */
var AbstractController = require('./PositionController');

var AdvancedController = function(gameobject, camera, opts) {
    AdvancedController.super_.call(this, gameobject, util.extend({
	'keys' : {
	    /* w s a d q e z space-bar shift */
	    forward : 87,
	    backward : 83,
	    left : 65,
	    right : 68,
	    ltrigger : 81,
	    rtrigger : 69,
	    reverse : 90,
	    /*up : 32,
	    down : 86,*/
up2 : 32,
down2 : 86,
	    upsidedown : 88
	/* z */
	},
	'maxSpeed' : 300, /* 83.3 M / Sec = 300 KM / Hour */
	'acceleration' : 60, /* ms-2 */

	'airResist' : 90,
	'airDrift' : 0.1,
	'airBrake' : 180,

	'driftLerp' : 0.35,
	'angularLerp' : 1,
	'angularSpeed' : 1,
	'airAngularSpeed' : 1
    }, opts));

    // this.quaternion = new THREE.Quaternion();

    this.camera = camera;
    // use dummy gameobject as we don't want rotation also applied on camera
    this.dummy = new THREE.Object3D();
    this.dummy.position = gameobject.position.clone();
    // this.dummy.rotation = gameobject.rotation;
    gameobject.parent.add(this.dummy);
    // this.dummy.add(camera);
    this.dummy.add(camera);
    // this.dummy.useQuaternion = true;

    // this.angular = 0;
    this.speed = 0.0;
    // this.drift = 0.0;
    this.movement = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Vector3(0, 0, 0);
    // this.velocity = new THREE.Vector3(0, 0, 0);

    this.temp = {};

};
util.inherits(AdvancedController, AbstractController);
AdvancedController.prototype.update = function(delta) {
    this.movement.set(0, 0, 0);
    this.rotation = new THREE.Vector3(0, 0, 0);

    if (this.keyStatus.reverse) {
	this.temp.reverse = true;

    } else if (this.temp.reverse) {
	this.dummy.rotation.y = this.object.rotation.y = this.object.rotation.y == 0 ? Math.PI
		: 0;
	this.speed -= this.speed * 0.6;
	this.temp.reverse = false;
    }

    if (this.keyStatus.upsidedown) {
	this.temp.upsidedown = true;

    } else if (this.temp.upsidedown) {
	new TWEEN.Tween(this.object.rotation).to({
	    x : this.object.rotation.x + Math.PI
	}, 500).start();
	new TWEEN.Tween(this.dummy.rotation).to({
	    x : this.object.rotation.x + Math.PI
	}, 500).start();
	this.temp.upsidedown = false;
    }

	if(this.keyStatus.up2){
		this.movement.y++;
	}else if(this.keyStatus.down2){
		this.movement.y--;
	}
    if (this.keyStatus.left || this.keyStatus.right || this.keyStatus.up
	    || this.keyStatus.down) {
	if (this.keyStatus.left) {
	    var rotation_matrix = new THREE.Matrix4()
		    .makeRotationY(((this.opts.maxSpeed * 0.3 + this.speed * 4) / this.opts.maxSpeed)
			    * Math.PI / 3 * delta);
	} else if (this.keyStatus.right) {
	    var rotation_matrix = new THREE.Matrix4()
		    .makeRotationY(((this.opts.maxSpeed * 0.3 + this.speed * 4) / this.opts.maxSpeed)
			    * -Math.PI / 3 * delta);
			
	//deprecating
	} else if (this.keyStatus.up) {
	    var rotation_matrix = new THREE.Matrix4()
		    .makeRotationX(((this.opts.maxSpeed * 0.5 + this.speed * 2) / this.opts.maxSpeed)
			    * Math.PI / 3 * delta);
	} else if (this.keyStatus.down) {
	    var rotation_matrix = new THREE.Matrix4()
		    .makeRotationX(((this.opts.maxSpeed * 0.5 + this.speed * 2) / this.opts.maxSpeed)
			    * -Math.PI / 3 * delta);
	}

	this.object.matrix.multiply(rotation_matrix);
	this.object.rotation.setEulerFromRotationMatrix(this.object.matrix);
	this.dummy.matrix.multiply(rotation_matrix);
	this.dummy.rotation.setEulerFromRotationMatrix(this.dummy.matrix);
    }

    /*
     * if (this.keyStatus.left) {
     * 
     * this.rotation.z += (2 * Math.PI / 360) * 90 * delta; } else if
     * (this.keyStatus.right) { this.rotation.z -= (2 * Math.PI / 360) * 90 *
     * delta; } else {
     * 
     * if (this.object.rotation.z > (2 * Math.PI / 360)* 5) { this.rotation.z -=
     * (2 * Math.PI / 360) * 90 * delta; } else if (this.object.rotation.z <
     * -5*(2 * Math.PI / 360)) { this.rotation.z += (2 * Math.PI / 360) * 90 *
     * delta; } else { this.rotation.z = 0; } }
     */
    // apply speed where the vehicle pointing
    this.speed += this.keyStatus.forward ? this.opts.acceleration * delta
	    : -this.opts.airResist * delta;

    /*
     * if (this.keyStatus.left) { angularAmount += this.angularSpeed * delta;
     * rollAmount -= this.rollAngle; } else if (this.keyStatus.right) {
     * angularAmount -= this.angularSpeed * delta; rollAmount += this.rollAngle; }
     * 
     * this.angular += (angularAmount - this.angular) * this.opts.angularLerp;
     * this.rotation.y = this.angular;
     * 
     * this.speed = Math.max(0.0, Math.min(this.speed, this.opts.maxSpeed));
     * this.speedRatio = this.speed / this.maxSpeed; this.movement.z -=
     * this.speed * delta;
     */
    this.speed = Math.max(0.0, Math.min(this.speed, this.opts.maxSpeed));

    /*
     * this.object.rotation.z = Math.max(-Math.PI / 3, Math.min(
     * this.object.rotation.z + this.rotation.z, Math.PI / 3)); /*
     * this.movement.x -= Math.min(this.speed, this.opts.maxVSpeed)(
     * this.object.rotation.z / Math.PI) delta;
     */

    this.movement.z -= this.speed * delta - Math.abs(this.movement.x);

    this.dummy.translateX(this.movement.x);
    this.dummy.translateY(this.movement.y);
    this.dummy.translateZ(this.movement.z);
    this.object.position = this.dummy.position;
    // this.dummy.position = this.object.position;

    // throw Error('Override this method to update your object');
};

module.exports = AdvancedController;
