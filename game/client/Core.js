/**
 * Game Core
 */
var util = require('../framework/Util');
var World = require('../framework/World');

var THREE = require('../vendor/Three');
var THREEx = THREEx || {};
THREEx.FullScreen = require('../vendor/THREEx/FullScreen');
THREE.TrackballControls = require('../vendor/THREE/TrackballControls');
THREEx.WindowResize = require('../vendor/THREEx/WindowResize');
TWEEN = require('../vendor/Tween');
var Physijs = require('../vendor/Physi');
// var Ammo = require('../vendor/ammo');
var MqoLoader = require('../vendor/loaders/MqoLoader');
var PositionController = require('../framework/controllers/PositionController');
var AdvancedController = require('../framework/controllers/AdvancedController');

var scene;
var Core = function(opts) {
    Core.super_.call(this, util.extend({
	"rendererOpts" : {
	    clearColor : 0x000000,
	    clearAlpha : 1,
	    antialias : true
	},
	"physics" : true
    }, opts));

};
util.inherits(Core, World);

// methods start here
Core.prototype.initialize = function(callback) {
    Core.super_.prototype.initialize.call(this);
    this.boilerplate();
    callback();
    return this;
};

var now, lastbox = 0, boxes = [];
Core.prototype.render = function() {
 
    TWEEN.update();

    Core.super_.prototype.render.call(this);
};
module.exports = Core;