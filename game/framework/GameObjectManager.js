/**
 * GameObject Manager
 */
var THREE = require('../vendor/Three');
var util = require('util');
var GameObject = require('./gameobjects/GameObject');

var GameObjectManager = function(opts) {

    this.asset = [];
    this.names = [];
};

GameObjectManager.prototype.add = function(name, asset) {
    /*
     * if (!asset instanceof GameObject) { throw Error('Error on adding an
     * invalid GameObject'); }
     */
    this.asset.push(asset);
    this.names.push(name);
};
GameObjectManager.prototype.get = function(name) {

    return this.asset[this.names.indexOf(name)];
};

GameObjectManager.prototype.render = function(dt) {
    this.asset.forEach(function(object) {
	if (object.update != null)
	    object.update(dt);
    });
    return this;
};

GameObjectManager.prototype.dispose = function(dt) {
    this.asset.forEach(function(object) {
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
