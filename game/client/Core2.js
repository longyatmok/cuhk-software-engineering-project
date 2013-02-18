/**
 * Game Core
 */
var util = require('../framework/Util');
var World = require('../framework/World');

var THREE = require('../vendor/Three');
var THREEx = THREEx || {};
THREEx.FullScreen = require('../vendor/THREEx/FullScreen');
THREE.TrackballControls = require('../vendor/THREE/TrackballControls');
THREEx.WindowResize = require('../vendor/THREEx/WindowResize');
TWEEN = require('../vendor/Tween');
var Physijs = require('../vendor/Physi');
// var Ammo = require('../vendor/ammo');
var MqoLoader = require('../vendor/loaders/MqoLoader');
var PositionController = require('../framework/controllers/PositionController');
var AdvancedController = require('../framework/controllers/AdvancedController');

var scene;
var Core = function(opts) {
    Core.super_.call(this, util.extend({
	"rendererOpts" : {
	    clearColor : 0x000000,
	    clearAlpha : 1,
	    antialias : true
	},
	"physics" : true
    }, opts));

};
util.inherits(Core, World);

// methods start here
Core.prototype.initialize = function(callback) {
    Core.super_.prototype.initialize.call(this);

    // start scene
    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3(0, -30, 0));
    scene.addEventListener('update', function() {
	scene.simulate(undefined, 1);
    });

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth
	    / window.innerHeight, 0.1, 10000);
    camera.position.set(60, 50, 60);
    // camera.lookAt(scene.position);
    scene.add(camera);

    // add lights
    // Light
    light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(20, 40, -15);
    light.target.position.copy(scene.position);
    light.castShadow = true;
    light.shadowCameraLeft = -60;
    light.shadowCameraTop = -60;
    light.shadowCameraRight = 60;
    light.shadowCameraBottom = 60;
    light.shadowCameraNear = 20;
    light.shadowCameraFar = 200;
    light.shadowBias = -.0001
    light.shadowMapWidth = light.shadowMapHeight = 2048;
    light.shadowDarkness = .7;
    scene.add(light);

    // define scene and cameras
    this.scenes.add("main", scene, {
	"main" : camera
    });
    this.scenes.setActive("main");

    // Ground
    ground_material = Physijs.createMaterial(new THREE.MeshLambertMaterial({
	color : 0xDDDDDD
    }), .8, // high friction
    .3 // low restitution
    );

    ground = new Physijs.BoxMesh(new THREE.CubeGeometry(10000, 1, 10000),
	    ground_material, 0 // mass
    );
    ground.receiveShadow = true;
    scene.add(ground);

    this.controls = new THREE.TrackballControls(this.scenes.active.cameras.main);
    this.controls.rotateSpeed = 4.0;
    this.controls.zoomSpeed = 3.6;
    this.controls.panSpeed = 2.0;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.keys = [ 65, 83, 68 ];
    this.gameobjects.add("__boilerplate_controls_trackball", this.controls);
    spawnBox();

    scene.simulate();

    var self = this;

    // this.scenes.active.cameras.main.position.set(0, 500, 750);
    // this.scenes.active.cameras.main.useQuaternion = true;

    // this.gameobjects.add("game.controls",controls);

    // Ammo world
    /*
     * collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
     * dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
     * overlappingPairCache = new Ammo.btDbvtBroadphase(); solver = new
     * Ammo.btSequentialImpulseConstraintSolver(); scene.world = new
     * Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver,
     * collisionConfiguration); scene.world.setGravity(new Ammo.btVector3(0,
     * -40, 0)); // Ground ground = new THREE.Mesh(new THREE.PlaneGeometry(500,
     * 500), new THREE.MeshLambertMaterial({ color : 0xDDDDDD }));
     * ground.receiveShadow = true; ground.rotation.x = -Math.PI / 2;
     * scene.add(ground); // Ground physics groundShape = new
     * Ammo.btBoxShape(new Ammo.btVector3(500, 1, 500)); groundTransform = new
     * Ammo.btTransform(); groundTransform.setIdentity();
     * groundTransform.setOrigin(new Ammo.btVector3(0, -1, 0));
     * 
     * groundMass = 0; localInertia = new Ammo.btVector3(0, 0, 0); motionState =
     * new Ammo.btDefaultMotionState(groundTransform); rbInfo = new
     * Ammo.btRigidBodyConstructionInfo(groundMass, motionState, groundShape,
     * localInertia); groundAmmo = new Ammo.btRigidBody(rbInfo);
     * scene.world.addRigidBody(groundAmmo);
     */
    MqoLoader.load('gameobjects/0-RAISER/0-RAISER.mqo', function(mqo) {
	var mesh = MqoLoader.toTHREEJS(mqo, {
	    MaterialConstructor : THREE.MeshPhongMaterial
	});
	// mesh.scale = new THREE.Vector3(5,5,5);
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
	self.scenes.active.cameras.main.position.set(0, 3.35, 7.8);
    });

    callback();
    // TWEEN.start();
    return this;
};

var now, lastbox = 0, boxes = [];
Core.prototype.render = function() {
    /*
     * // Create a new box every second now = new Date().getTime(); if (now -
     * lastbox > 1000) { createBox(); lastbox = now; }
     */
    TWEEN.update();
    // Run physics
    // updateBoxes();

    Core.super_.prototype.render.call(this);
};

//deprecated
Core.prototype.onWindowResize = function() {

    this.scenes.active.cameras.main.aspect = window.innerWidth
	    / window.innerHeight;
    this.scenes.active.cameras.main.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.controls.handleResize();
    this.render();
}


spawnBox = (function() {
    var box_geometry = new THREE.CubeGeometry(1, 1, 1), handleCollision = function(
	    collided_with, linearVelocity, angularVelocity) {
	switch (++this.collisions) {

	case 1:
	    this.material.color.setHex(0xcc8855);
	    break;

	case 2:
	    this.material.color.setHex(0xbb9955);
	    break;

	case 3:
	    this.material.color.setHex(0xaaaa55);
	    break;

	case 4:
	    this.material.color.setHex(0x99bb55);
	    break;

	case 5:
	    this.material.color.setHex(0x88cc55);
	    break;

	case 6:
	    this.material.color.setHex(0x77dd55);
	    break;
	}
    }, createBox = function() {
	var box, material;

	material = Physijs.createMaterial(new THREE.MeshLambertMaterial({

	}), .6, // medium friction
	.3 // low restitution
	);

	material.color.setRGB(Math.random() * 100 / 100,
		Math.random() * 100 / 100, Math.random() * 100 / 100); /*
									 * material.map.wrapS =
									 * material.map.wrapT =
									 * THREE.RepeatWrapping;
									 * material.map.repeat.set(
									 * .5,
									 * .5 );
									 */

	// material = new THREE.MeshLambertMaterial({ map:
	// THREE.ImageUtils.loadTexture( 'images/rocks.jpg' )
	// });
	box = new Physijs.BoxMesh(box_geometry, material);
	box.collisions = 0;

	box.position
		.set(Math.random() * 15 - 7.5, 25, Math.random() * 15 - 7.5);

	box.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math
		.random()
		* Math.PI);

	box.castShadow = true;
	box.addEventListener('collision', handleCollision);
	box.addEventListener('ready', spawnBox);
	scene.add(box);
    };

    return function() {
	setTimeout(createBox, 1000);
    };
})();

module.exports = Core;