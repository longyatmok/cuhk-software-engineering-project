/**
 * Simple Controller
 */
var THREE = require('../../vendor/Three');
var util = require('../Util');

var PositionController = function(gameobject, opts) {
    this.object = gameobject;
    this.enable = true;
    this.opts = util.extend({
	'domElement' : document,
	'keys' : {
	    forward : 87, // w
	    backward : 83, // s
	    left : 65, // a
	    right : 68, // d
	/*
	 * ltrigger : 81, rtrigger : 69,
	 */
	}
    }, opts);

  //  this.active = true;
    this.keyStateMapping = {};
    this.keyStatus = {};
    for ( var state in this.opts.keys) {
	this.keyStatus[state] = false;
	this.keyStateMapping[this.opts.keys[state]] = state;
    }

    this.onKeyDown = function(event) {
	
	if (this.keyStateMapping[event.keyCode] && this.enabled) {
	
	    this.keyStatus[this.keyStateMapping[event.keyCode]] = true;
	}
    };

    this.onKeyUp = function(event) {
	if (this.keyStateMapping[event.keyCode]) {
	    this.keyStatus[this.keyStateMapping[event.keyCode]] = false;
	}
    };

    function bind(scope, fn) {
	return function() {
	    fn.apply(scope, arguments);
	};
    };
    this.opts.domElement.addEventListener('keydown',
	    bind(this, this.onKeyDown), false);
    this.opts.domElement.addEventListener('keyup', bind(this, this.onKeyUp),
	    false);
};

PositionController.prototype.update = function() {
	if(!this.enable) return;
    if (this.keyStatus.forward)
	this.object.position.z -= 1;
    if (this.keyStatus.backward)
	this.object.position.z += 1;
    if (this.keyStatus.left)
	this.object.position.x -= 1;
    if (this.keyStatus.right)
	this.object.position.x += 1;
    // throw Error('Override this method to update your object');
};
module.exports = PositionController;
