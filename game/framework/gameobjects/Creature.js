var THREE = require('../client/vendor/Three');
var util = require('util');
var GameObject = require('./GameObject');

Creature = function() {
	this.geometry = new THREE.CubeGeometry(2, 2, 2);
	this.material = new THREE.MeshBasicMaterial({
		color : 0xff0000,
		wireframe : true
	});
	Creature.super_.call(this, this.geometry, this.material);
};

util.inherits(Creature, GameObject);

