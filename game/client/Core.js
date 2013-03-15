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
//connection
var Connection = require('../framework/net/client/AbstractConnection');

var Overlay = require('../framework/Overlay');
//modules
var HelloWorldModule = require('../modules/helloworld/client/module');
var AuthModule = require('../modules/auth/client/module');
var RoomModule = require('../modules/room/client/module');
//gameplay
var Gameplay = require('../framework/gameplay/Gameplay');
var FreeGameplay = require('../framework/gameplay/FreeGameplay');
//regions
var Region = require('../framework/Region');
var TitleScreen = require('./regions/TitleScreen');
var TestRegion = require('./regions/TestRegion');
var DemoOneRegion = require('./regions/DemoOneRegion');
var scene;

var Core = function(opts) {
    Core.super_.call(this, util.extend({
	"rendererOpts" : {
	/*    clearColor : 0x000000,*/
	 /*   clearAlpha : 1,*/
	    antialias : true
	}/*,
	"physics" : true*/
    }, opts));

};
util.inherits(Core, World);

// methods start here
Core.prototype.initialize = function(callback) {
    Core.super_.prototype.initialize.call(this);
    this.overlay = new Overlay();
	this.overlay.add('title', '<div class="overlay-center"><img src="ui_im/title.png"><br/><span>CSCI3100 GROUP 6</span></p></div>');
	this.overlay.changeState('title');
    this.regions['title-screen'] = new TitleScreen();
 //   this.regions['test-region'] = new TestRegion();
    this.regions['demo-one'] = new DemoOneRegion();
    this.gameplayClasses['empty'] = Gameplay;
    this.gameplayClasses['free'] = FreeGameplay;
   
    this.setRegion('title-screen','empty');
  //  this.activeRegion = this.regions['demo-one']; //we have the terrain now   
  //  this.gameplay = new FreeGameplay(this.activeRegion); 
    
    //connection here
    this.connection = new Connection({address : 'ws://'+document.domain+':7777',KEY:'CSCI3100-GROUP6',VERSION:'0.0.0'});
    //define all modules here
    
    this.modules [ 'hello-world' ] = new HelloWorldModule( this );
    this.modules [ AuthModule.NAME ] = new AuthModule( this );
    this.modules [ RoomModule.NAME] = new RoomModule( this );
    //end
    this.connection.connect();
    
    callback();
    return this;
};


var now, lastbox = 0, boxes = [];
Core.prototype.render = function() { 
    TWEEN.update();
    Core.super_.prototype.render.call(this);
};
module.exports = Core;