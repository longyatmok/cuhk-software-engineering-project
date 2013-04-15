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
	// this.spawnPosition = new THREE.Vector3(58.39451956295419,
	// 220.65849750094864, 0.2683576152494614);
	//this.spawnLocation  = new THREE.Vector3( 55.2784112120024,  200.70849750094865,1.085861763235605);
	this.spawnLocation = new THREE.Vector3(5.102216640806638,	51.98950000000002, -5.673848598385386); // level one
		//this.spawnLocation = new THREE.Vector3( -119.58874315990386, 174.85245740939652, -12.909299118498613); //level 2
	//this.spawnLocation = new THREE.Vector3( -107.06148269359106,  196.5840070855712,  30.37152831579152) //level 3
	//	this.spawnLocation = new THREE.Vector3( -99.48527609772871,  326.97335514261846, -1.0203549799491427); //level final
	//this.spawnLocation = new THREE.Vector3( -5.085903829482551, 403.36448449496726,  -0.34840961831098416); goal
	//TODO checkpoints
	this.spawnRotation = new THREE.Vector3(0, -Math.PI / 2, 0);

	var ambient = new THREE.AmbientLight(0x101030);
	//ambient.position.set(5.102216640806638, 51.98950000000002,-5.673848598385386);
	ambient.position.set( 1.2122700618825002,  11.833269838571699, 5.424165115119994);
	ambient.color.setRGB(1, 1, 1);
	this.scene.add(ambient);
	var ambient2 = new THREE.AmbientLight(0x101030);
	//ambient.position.set(5.102216640806638, 51.98950000000002,-5.673848598385386);
	ambient2.position.set( 5.395465196266683,  43.72500000000001,  10.925346489382699);
	ambient2.color.setRGB(1, 1, 1);
	this.scene.add(ambient2);
	
	

	var directionalLight = new THREE.DirectionalLight(0x101030);
	directionalLight.position.set( 1.2122700618825002,  11.833269838571699,  5.424165115119994).normalize();
	this.scene.add(directionalLight);

	var loader = new THREE.OBJMTLLoader();
	var self = this;

	loader.addEventListener('load', function(e) {
		var object = e.content;
		object.scale.set(10, 10, 10);

		xdxd = object;
		self.scene.add(object);
		self.regionobjects.objects = self.regionobjects.objects
				.concat(object.children);
		//self.regionobjects.push(object.child);

	});
	loader.load('gameobjects/test2/demo02.obj', 'gameobjects/test2/demo02.mtl');
//	loader.load('gameobjects/test2/demo01.obj', 'gameobjects/test2/demo01.mtl');

	/*
	 * var jsonLoader = new THREE.JSONLoader();
	 * jsonLoader.load("gameobjects/test2/jump.js", function(geometry) {
	 * 
	 * var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
	 * self.scene.add(mesh); // self.regionobjects.push(mesh); });
	 */
	// width, height, depth
	/*
	 * var mesh = new THREE.Mesh(geometry, startMaterial); mesh.position.x = 0;
	 * mesh.position.y = 0; mesh.position.z = 0; this.scene.add(mesh);
	 * this.regionobjects.push(mesh);
	 */

	// var myAndroid = new Android();
};

util.inherits(DemoOneRegion, Region);

module.exports = DemoOneRegion;