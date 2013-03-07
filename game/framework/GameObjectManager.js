/**
 * GameObject Manager
 */
var THREE = require('../vendor/Three');
var util = require('util');
var GameObject = require('./gameobjects/GameObject');

var GameObjectManager = function(opts) {

    this.objects = [];
    this.names = [];
    this.count = 0;
};

GameObjectManager.prototype.push = function(objects) {
    /*
     * if (!objects instanceof GameObject) { throw Error('Error on adding an
     * invalid GameObject'); }
     */
    this.objects.push(objects);
    this.names.push('unnamed-' + this.count);
    this.count++;
};
GameObjectManager.prototype.add = function(name, objects) {
    /*
     * if (!objects instanceof GameObject) { throw Error('Error on adding an
     * invalid GameObject'); }
     */
    this.objects.push(objects);
    this.names.push(name);
    this.count++;
};
GameObjectManager.prototype.get = function(name) {

    return this.objects[this.names.indexOf(name)];
};

GameObjectManager.prototype.render = function(dt) {
    this.objects.forEach(function(object) {
	if (object.update != null)
	    object.update(dt);
    });
    return this;
};

GameObjectManager.prototype.dispose = function(dt) {
    this.objects.forEach(function(object) {
	if (object.dispose != null)
	    object.dispose();
    });
    
    //TODO dispose object
    return this;
};
GameObjectManager.prototype.boilerplate = function() {
    // define Boilerplate Class
    this.add("__boilerplate_cube", new BoilerplateCube());
};

module.exports = GameObjectManager;

BoilerplateCube = function() {
    this.geometry = new THREE.CubeGeometry(2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({
	color : 0xff0000,
	wireframe : true
    });
    BoilerplateCube.super_.call(this, this.geometry, this.material);
};

util.inherits(BoilerplateCube, GameObject);

BoilerplateCube.prototype.update = function() {
    this.rotation.x += 0.02;
    this.rotation.y += 0.02;
    this.rotation.z += 0.01;
};
