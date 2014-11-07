/**
 * @author mrdoob / http://mrdoob.com/
 */
var THREE = require('../Three');
THREE.PointerLockControls = function(camera, pitchObject) {

	var scope = this;

	if (pitchObject == undefined) {
		pitchObject = new THREE.Object3D();
		pitchObject.position = new THREE.Vector3(0,40,70);//camera position
	}

	pitchObject.add(camera);

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 1;
	yawObject.add(pitchObject);
	yawObject.position.x = 0;
	yawObject.position.z = 420;
	/*
	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add(pitchObject);
	yawObject.position.x = -8;
	yawObject.position.z = 420;*/
	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;

	var isOnObject = false;
	var canJump = false;
	var lastVelocity = new THREE.Vector3();
	var velocity = new THREE.Vector3();

	var PI_2 = Math.PI / 2;

	var onMouseMove = function(event) {

		if (scope.enabled === false)
			return;

		var movementX = event.movementX || event.mozMovementX
				|| event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY
				|| event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2,
				pitchObject.rotation.x));

	};

	var onKeyDown = function(event) {

		switch (event.keyCode) {

		case 38: // up
		case 87: // w
			moveForward = true;
			break;

		case 37: // left
		case 65: // a
			moveLeft = true;
			break;

		case 40: // down
		case 83: // s
			moveBackward = true;
			break;

		case 39: // right
		case 68: // d
			moveRight = true;
			break;

		case 32: // space
			if (canJump === true)
				velocity.y += 7;
			canJump = false;
			break;

		}

	};

	var onKeyUp = function(event) {

		switch (event.keyCode) {

		case 38: // up
		case 87: // w
			moveForward = false;
			break;

		case 37: // left
		case 65: // a
			moveLeft = false;
			break;

		case 40: // down
		case 83: // a
			moveBackward = false;
			break;

		case 39: // right
		case 68: // d
			moveRight = false;
			break;

		}

	};

	document.addEventListener('mousemove', onMouseMove, false);
	document.addEventListener('keydown', onKeyDown, false);
	document.addEventListener('keyup', onKeyUp, false);

	this.enabled = false;

	this.getObject = function() {

		return yawObject;

	};

	this.isOnObject = function(boolean) {

		isOnObject = boolean;
		canJump = boolean;

	};
	this.update = function(delta){}
	this.updatex = function(delta ,distance) {

		if (scope.enabled === false)
			return;

		delta *= 0.1;

		velocity.x += (-velocity.x) * 0.08 * delta;
		velocity.z += (-velocity.z) * 0.08 * delta;

		velocity.y -= 0.25 * delta;

		if (moveForward)
			velocity.z -= 0.12 * delta;
		if (moveBackward)
			velocity.z += 0.12 * delta;

		if (moveLeft)
			velocity.x -= 0.12 * delta;
		if (moveRight)
			velocity.x += 0.12 * delta;

		//if(distance!=undefined) console.log(distance);
		this.isOnObject( distance >=0 && distance <= 1 );

		if( (lastVelocity.y <= 0 && velocity.y <= 0 &&  velocity.y >  lastVelocity.y ) /*less negative*/){
		    
		}
		
		if(distance!=undefined && lastVelocity.y <= 0 && velocity.y <= 0 &&  velocity.y <  lastVelocity.y && Math.abs(velocity.y) > distance /*more negative*/){
		    velocity.y = -distance + 0.95;
		}
		if (isOnObject === true) {
		    velocity.y = Math.max(0, velocity.y);
		}


		yawObject.translateX(velocity.x);
		yawObject.translateY(velocity.y);
		yawObject.translateZ(velocity.z);
		
		if (yawObject.position.y < 1) {

			velocity.y = 0;
			yawObject.position.y = 1;

			canJump = true;
		}
		
		lastVelocity = velocity.clone();
	};

};
module.exports = THREE.PointerLockControls;