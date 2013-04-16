// this is a demo region for demo use
var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var Region = require('../../framework/Region');
//var Android = require('../gameobjects/Android');
THREE.PointerLockControls = require('../../vendor/THREE/PointerLockControls');
srand = require('../../vendor/seedrandom');
var geometry, material, mesh;
var controls,time = Date.now();

var ray;
/**
 * This is a demo region for demo use
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
	srand.seedrandom( this.opts.seed);
	this.spawnLocation = new THREE.Vector3(10,-8,420);
//	this.spawnRotation = new THREE.Vector3(0, 0, 0);
	/*
	this.regionobjects.boilerplate();
	this.camera.position = new THREE.Vector3(0,3,2);
	this.camera.rotation = new THREE.Vector3(-1, 0, 1);
	this.scene.add(this.regionobjects.get("__boilerplate_cube"));
	 */

	//the Ground
	/*ground = new THREE.Mesh(new THREE.PlaneGeometry(500, 500),
			new THREE.MeshLambertMaterial({
				color : 0xDDDDDD
			}));
	ground.receiveShadow = true;
	ground.rotation.x = -Math.PI / 2;
	
	this.regionobjects.add('ground', ground);
	this.scene.add(ground);
	this.camera.position.set(0, 500, 1500);*/

	this.scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

	var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
	light.position.set( 1, 1, 1 );
	this.scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
	light.position.set( -1, - 0.5, -1 );
	this.scene.add( light );


	// floor

	geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

		var vertex = geometry.vertices[ i ];
		vertex.x += srand.random() * 20 - 10;
		vertex.y += srand.random() * 2;
		vertex.z += srand.random() * 20 - 10;

	}

	for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 3 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );

	}

	material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

	mesh = new THREE.Mesh( geometry, material );
	this.scene.add( mesh );

	// objects

	geometry = new THREE.CubeGeometry( 20, 20, 20 );

	for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );
		face.vertexColors[ 3 ] = new THREE.Color().setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );

	}

	for ( var i = 0; i < 500; i ++ ) {

		material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = Math.floor( srand.random() * 20 - 10 ) * 20;
		mesh.position.y = Math.floor( srand.random() * 20 ) * 20 + 10;
		mesh.position.z = Math.floor( srand.random() * 20 - 10 ) * 20;
		this.scene.add( mesh );

		material.color.setHSL( srand.random() * 0.2 + 0.5, 0.75, srand.random() * 0.25 + 0.75 );

		this.regionobjects.push( mesh );

	}

//	var myAndroid = new Android();
	

	
	
	
};

util.inherits(DemoOneRegion, Region);
/*
DemoOneRegion.prototype.render = function() {
	controls.isOnObject( false );

	ray.ray.origin.copy( controls.getObject().position );
	ray.ray.origin.y -= 10;

	var intersections = ray.intersectObjects( objects );

	if ( intersections.length > 0 ) {

		var distance = intersections[ 0 ].distance;

		if ( distance > 0 && distance < 10 ) {

			controls.isOnObject( true );

		}

	}

	controls.update( Date.now() - time );
	DemoOneRegion.super_.prototype.render.call(this);
	time = Date.now();

}*/

module.exports = DemoOneRegion;