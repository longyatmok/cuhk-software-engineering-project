// a testing region
var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var Region = require('../../framework/Region');


/**
 * the first region used to test Region Class
 * @constructor
 * @this {TestRegion}
 */
var TestRegion = function() {
    TestRegion.super_.call(this,{
	id : 'test-region'
    });
    
    this.regionobjects.boilerplate();
	this.spawnLocation = new THREE.Vector3(0,3,2);
	this.spawnRotation = new THREE.Vector3(-1, 0, 1);
	/*
    this.camera.position = new THREE.Vector3(0,3,2);
    this.camera.rotation = new THREE.Vector3(-1, 0, 1);*/
    this.scene.add(this.regionobjects.get("__boilerplate_cube"));
  
};
util.inherits(TestRegion, Region);



module.exports = TestRegion;