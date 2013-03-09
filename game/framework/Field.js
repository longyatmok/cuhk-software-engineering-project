/**
 * @deprecated
 * Field (Abstract Class)
 */
var THREE = require('../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('./GameObjectManager');
var World = require('./World');

var Field = function(regions) {
    //TODO assumed only one region passed to Field
    this.regions = [];
    this.region.push(regions);
    this.activated_ = false;
};

Field.prototype.activate = function() {
    if (this.activated_)
	return false;
    this.activated_ = true;
    // scene
    var scene;
    if (World.opts.physics) {
	scene = new Physijs.Scene();
	scene.setGravity(World.opts["physics.gravity"]);
	scene.addEventListener('update', function() {
	    scene.simulate(undefined, 1);
	});
    } else {
	scene = new THREE.Scene();
    }

    this.scene = scene;

    this.camera = new THREE.PerspectiveCamera(75, World.opts.width
	    / World.opts.height, 0.1, 10000);

    if (World.opts.resize) {
	window.addEventListener('resize', util.callback(this, function() {
	    this.camera.aspect = window.innerWidth / window.innerHeight;
	    this.camera.updateProjectionMatrix();
	}), false);
    }

    this.regions.forEach(util.callback(this, function(region) {
    	region.attachTo(this.scene);
    }));

    return true;
};
module.exports = Field;