// old game core for testing
/**
 * Game Core
 */
var util = require('../framework/Util');
var Game = require('../framework/World');
var THREE = require('../vendor/Three');
var THREEx = THREEx || {};
THREEx.FullScreen = require('../vendor/THREEx/FullScreen');
THREE.TrackballControls = require('../vendor/THREE/TrackballControls');
THREEx.WindowResize = require('../vendor/THREEx/WindowResize');

TWEEN = require('../vendor/Tween');
var Ammo = require('../vendor/ammo');
var MqoLoader = require('../vendor/loaders/MqoLoader');
var PositionController = require('../framework/controllers/PositionController');
var AdvancedController = require('../framework/controllers/AdvancedController');
var scene;

var Core = function(opts) {
    Core.super_.call(this, opts);
};
util.inherits(Core, Game);

// methods start here
Core.prototype.initialize = function(callback) {
    var self = this;
    Core.super_.prototype.initialize.call(this);
    scene = this.scenes.active.scene; // TODO

    this.scenes.active.cameras.main.position.set(0, 500, 750);
    // this.scenes.active.cameras.main.useQuaternion = true;

    // this.gameobjects.add("game.controls",controls);

    // Ammo world
    collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    overlappingPairCache = new Ammo.btDbvtBroadphase();
    solver = new Ammo.btSequentialImpulseConstraintSolver();
    scene.world = new Ammo.btDiscreteDynamicsWorld(dispatcher,
	    overlappingPairCache, solver, collisionConfiguration);
    scene.world.setGravity(new Ammo.btVector3(0, -40, 0));

    // Ground
    ground = new THREE.Mesh(new THREE.PlaneGeometry(500, 500),
	    new THREE.MeshLambertMaterial({
		color : 0xDDDDDD
	    }));
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Ground physics
    groundShape = new Ammo.btBoxShape(new Ammo.btVector3(500, 1, 500));
    groundTransform = new Ammo.btTransform();
    groundTransform.setIdentity();
    groundTransform.setOrigin(new Ammo.btVector3(0, -1, 0));

    groundMass = 0;
    localInertia = new Ammo.btVector3(0, 0, 0);
    motionState = new Ammo.btDefaultMotionState(groundTransform);
    rbInfo = new Ammo.btRigidBodyConstructionInfo(groundMass, motionState,
	    groundShape, localInertia);
    groundAmmo = new Ammo.btRigidBody(rbInfo);
    scene.world.addRigidBody(groundAmmo);

    MqoLoader.load('gameobjects/0-RAISER/0-RAISER.mqo', function(mqo) {
	var mesh = MqoLoader.toTHREEJS(mqo, {
	    MaterialConstructor : THREE.MeshPhongMaterial
	});
	console.log("adding 0-RAISER");
	xmesh = mesh;
	scene.add(mesh);

	mesh.position = new THREE.Vector3(0, 50, 250);

	self.gameobjects.add('game.player', mesh);
	scene.remove(self.scenes.active.cameras.main);
	var controls = new AdvancedController(mesh,
		self.scenes.active.cameras.main, {
		    'domElement' : document
		});
	self.gameobjects.add('game.player.controller', controls);

	// mesh.add();
	self.scenes.active.cameras.main.position.set(1.2, 4.5, 28);
    });

    callback();
    // TWEEN.start();
    return this;
};

var now, lastbox = 0, boxes = [];
Core.prototype.render = function() {

    // Create a new box every second
    now = new Date().getTime();
    if (now - lastbox > 1000) {
	createBox();
	lastbox = now;
    }
    TWEEN.update();
    // Run physics
    updateBoxes();

    Core.super_.prototype.render.call(this);
};
var createBox = function() {
    var box, position_x, position_z, mass, startTransform, localInertia, boxShape, motionState, rbInfo, boxAmmo;

    position_x = Math.random() * 50 - 5;
    position_z = Math.random() * 50 - 5;

    // Create 3D box model
    box = new THREE.Mesh(new THREE.CubeGeometry(3, 3, 3),
	    new THREE.MeshLambertMaterial({
		opacity : 0,
		transparent : true
	    }));
    box.material.color.setRGB(Math.random() * 100 / 100,
	    Math.random() * 100 / 100, Math.random() * 100 / 100);
    box.castShadow = true;
    box.receiveShadow = true;
    box.useQuaternion = true;
    scene.add(box);

    new TWEEN.Tween(box.material).to({
	opacity : 1
    }, 500).start();

    // Create box physics model
    mass = 3 * 3 * 3;
    startTransform = new Ammo.btTransform();
    startTransform.setIdentity();
    startTransform.setOrigin(new Ammo.btVector3(position_x, 60, position_z));

    localInertia = new Ammo.btVector3(0, 0, 0);

    boxShape = new Ammo.btBoxShape(new Ammo.btVector3(1.5, 1.5, 1.5));
    boxShape.calculateLocalInertia(mass, localInertia);

    motionState = new Ammo.btDefaultMotionState(startTransform);
    rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, boxShape,
	    localInertia);
    boxAmmo = new Ammo.btRigidBody(rbInfo);
    scene.world.addRigidBody(boxAmmo);

    boxAmmo.mesh = box;
    boxes.push(boxAmmo);
};

var updateBoxes = function() {
    scene.world.stepSimulation(1 / 60, 5);
    var i, transform = new Ammo.btTransform(), origin, rotation;

    for (i = 0; i < boxes.length; i++) {
	boxes[i].getMotionState().getWorldTransform(transform);

	origin = transform.getOrigin();
	boxes[i].mesh.position.x = origin.x();
	boxes[i].mesh.position.y = origin.y();
	boxes[i].mesh.position.z = origin.z();

	rotation = transform.getRotation();
	boxes[i].mesh.quaternion.x = rotation.x();
	boxes[i].mesh.quaternion.y = rotation.y();
	boxes[i].mesh.quaternion.z = rotation.z();
	boxes[i].mesh.quaternion.w = rotation.w();
    }
    ;
};

module.exports = Core;