// this is a demo region for demo use
var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var Region = require('../../framework/Region');
// var Android = require('../gameobjects/Android');
THREE.PointerLockControls = require('../../vendor/THREE/PointerLockControls');
srand = require('../../vendor/seedrandom');
var geometry, material, mesh;
var controls, time = Date.now();

var ray;
/**
 * This is a demo region for demo use
 * 
 * @constructor
 * @this {DemoOneRegion}
 * @param opts
 */

var DemoOneRegion = function(opts) {
    DemoOneRegion.super_.call(this, util.extend({
	id : 'test-region',
	seed : 'Sun Mar 17 2013 20:01:35 GMT+0800 '
    }, opts));

    this.objects = [];
    console.log('seed');
    console.log(this.opts.seed);
    srand.seedrandom(this.opts.seed);
    this.spawnLocation = new THREE.Vector3(495, 200, 0);
    // this.spawnRotation = new THREE.Vector3(0, 0, 0);
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

    this.scene.fog = new THREE.Fog(0xffffff, 0, 750);

    var light = new THREE.DirectionalLight(0xffffff, 1.4);
    light.position.set(1, 1, 1);
    this.scene.add(light);

    var light = new THREE.DirectionalLight(0xffffff, 0.73);
    light.position.set(-1, -0.5, -1);
    this.scene.add(light);

    // ground
    geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    /*
     * for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
     * 
     * var vertex = geometry.vertices[ i ]; vertex.x += srand.random() * 20 -
     * 10; vertex.y += srand.random() * 2; vertex.z += srand.random() * 20 - 10; }
     * 
     * for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
     * 
     * var face = geometry.faces[ i ]; face.vertexColors[ 0 ] = new
     * THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() *
     * 0.25 + 0.75 ); face.vertexColors[ 1 ] = new THREE.Color().setHSL(
     * srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
     * face.vertexColors[ 2 ] = new THREE.Color().setHSL( srand.random() * 0.2 +
     * 0.5, 0.75, srand.random() * 0.25 + 0.75 ); face.vertexColors[ 3 ] = new
     * THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() *
     * 0.25 + 0.75 ); }
     */
    // material = new THREE.MeshBasicMaterial( { vertexColors:
    // THREE.VertexColors } );
    material = new THREE.MeshLambertMaterial({
	color : 0x000000
    });

    mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);
    this.gameobjects.add('region.ground', mesh);

    // objects
    var geometry = new THREE.CubeGeometry(20, 20, 20);
for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 3 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );

	}

    var basicMaterial = new THREE.MeshPhongMaterial({
	color : 0x2BB6ED,
	specular : 0xffffff
    });

    var startMaterial = new THREE.MeshLambertMaterial({
	color : 0x51B324
    });

    var fakeMaterial = new THREE.MeshLambertMaterial({
	color : 0xffffff
    });

    var checkpointMaterial = new THREE.MeshLambertMaterial({
	color : 0xff0000
    });

    var real = false;

    for ( var i = 0; i < 25; i++) {

	for ( var j = 0; j < 12; j++) {
		material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

	var mesh = new THREE.Mesh(geometry, material  );
	mesh.position.x = 100 - i * 20;
	mesh.position.y =  Math.floor(srand.random()  * 10) * 20 + 160;
	mesh.position.z = Math.floor(srand.random()  * 12) * 20  - 40;
	material.color.setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );

	this.scene.add(mesh);

	// material.color.setHSL( srand.random() * 0.2 + 0.5, 0.75,
	// srand.random() * 0.25 + 0.75 );

	
	this.regionobjects.push(mesh);
	
	}
    }

    // starting platform
    {
	var dummy = new THREE.Mesh();
	var geometry = new THREE.Geometry();

	var box = new THREE.CubeGeometry(20, 20, 20);
	var platform1 = new THREE.CubeGeometry(80, 20, 100);
	var platform2 = new THREE.CubeGeometry(80, 20, 100);
	// the start location
	dummy.geometry = platform1;
	dummy.position = new THREE.Vector3(480, 160, 0);
	THREE.GeometryUtils.merge(geometry, dummy);
/*
	//the stair in front of start location platform
	for ( var i = 1; i <= 10; i++) {
	    dummy.geometry = new THREE.CubeGeometry(40, 20, 60);
	    dummy.position = new THREE.Vector3(480 - i * 30, 160 + i * 10, 0);
	    THREE.GeometryUtils.merge(geometry, dummy);
	}*/
/*
	dummy.geometry = new THREE.CubeGeometry(500, 20, 500);
	dummy.position = new THREE.Vector3(0, 120, 0);
	THREE.GeometryUtils.merge(geometry, dummy);
*/
	//the left and right road in front of the start location platform
	dummy.geometry = new THREE.CubeGeometry(400, 20, 20);
	dummy.position = new THREE.Vector3(320, 160, -55);
	THREE.GeometryUtils.merge(geometry, dummy);
	
	dummy.position = new THREE.Vector3(320, 160, 55);
	THREE.GeometryUtils.merge(geometry, dummy);

	// width, height, depth
	var mesh = new THREE.Mesh(geometry, startMaterial);
	mesh.position.x = 0;
	mesh.position.y = 0;
	mesh.position.z = 0;
	this.scene.add(mesh);
	this.regionobjects.push(mesh);
    }

    // var myAndroid = new Android();

};

util.inherits(DemoOneRegion, Region);

module.exports = DemoOneRegion;