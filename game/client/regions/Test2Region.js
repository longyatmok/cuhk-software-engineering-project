var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var Region = require('../../framework/Region');
// var Android = require('../gameobjects/Android');

THREE.PointerLockControls = require('../../vendor/THREE/PointerLockControls');
THREE.OBJMTLLoader = require('../../vendor/loaders/OBJMTLLoader');
srand = require('../../vendor/seedrandom');
var geometry, material, mesh;
var controls, time = Date.now();

var ray;
/**
 * The Challenge mode Map
 * 
 * @constructor
 * @this {DemoOneRegion}
 * @param opts
 */

var DemoOneRegion = function(opts) {
	DemoOneRegion.super_.call(this, util.extend({
		id : 'test2-region',
		seed : 'Sun Mar 17 2013 20:01:35 GMT+0800 '
	}, opts));

	this.objects = [];

	srand.seedrandom(this.opts.seed);
	//this.spawnPosition = new THREE.Vector3(58.39451956295419,  220.65849750094864, 0.2683576152494614);
	this.spawnLocation = new THREE.Vector3(5.102216640806638, 51.98950000000002, -5.673848598385386); //level one
	this.spawnRotation = new THREE.Vector3(0, -Math.PI / 2, 0);
	/*
	 * this.regionobjects.boilerplate(); this.camera.position = new
	 * THREE.Vector3(0,3,2); this.camera.rotation = new THREE.Vector3(-1, 0, 1);
	 * this.scene.add(this.regionobjects.get("__boilerplate_cube"));
	 */

	// the Ground
	/*
	 * ground = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new
	 * THREE.MeshLambertMaterial({ color : 0xDDDDDD })); ground.receiveShadow =
	 * true; ground.rotation.x = -Math.PI / 2;
	 * 
	 * this.regionobjects.add('ground', ground); this.scene.add(ground);
	 * this.camera.position.set(0, 500, 1500);
	 */

	var ambient = new THREE.AmbientLight( 0x101030 );
	ambient.position.set(5.102216640806638, 51.98950000000002, -5.673848598385386);
	ambient.color.setRGB( 1, 1,1 );
	this.scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0x101030 );
	directionalLight.position.set( 5.102216640806638, 51.98950000000002, -5.673848598385386).normalize();
	this.scene.add( directionalLight );

	
	var loader = new THREE.OBJMTLLoader();
	var self = this;
	var texture = THREE.ImageUtils.loadTexture('gameobjects/test2/demo01-RGB.png');
	
	loader.addEventListener( 'load', function ( e ) {
		var object = e.content;
		object.scale.set(10,10,10);
	//	object.position.y = - 80;
		xdxd = object;
	/*	var l;
       for ( var i = 0, l = object.children.length; i < l; i ++ ) {
            object.children[ i ].material.map = texture;
        }*/
	//	var object = event.content;
	//	object.scale(10,10,10);
		self.scene.add( object );
		self.regionobjects.objects = self.regionobjects.objects.concat(object.children);
		self.regionobjects.push(object.child);

	});
	loader.load( 'gameobjects/test2/demo01.obj', 'gameobjects/test2/demo01.mtl' );
	 
/*
	var jsonLoader = new THREE.JSONLoader();
	jsonLoader.load("gameobjects/test2/jump.js", function(geometry) {

		var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
		self.scene.add(mesh);
	//	self.regionobjects.push(mesh);
	});
*/
	// width, height, depth
	/*	var mesh = new THREE.Mesh(geometry, startMaterial);
		mesh.position.x = 0;
		mesh.position.y = 0;
		mesh.position.z = 0;
		this.scene.add(mesh);
		this.regionobjects.push(mesh);
	 */

	// var myAndroid = new Android();
};

util.inherits(DemoOneRegion, Region);

module.exports = DemoOneRegion;