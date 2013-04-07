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
var GameModule = require('../modules/game/client/module');
//gameplay
var Gameplay = require('../framework/gameplay/Gameplay');
var FreeGameplay = require('../framework/gameplay/FreeGameplay');
var PracticeModeGameplay = require('../modules/gameplay/client/PracticeModeGameplay');
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
	},
	VERSION : '0.1.0'
    /*,
	"physics" : true*/
    }, opts));

};
util.inherits(Core, World);

// methods start here
Core.prototype.initialize = function(callback) {
    Core.super_.prototype.initialize.call(this);
    this.overlay = new Overlay();

    this.regions['title-screen'] = TitleScreen;
 //   this.regions['test-region'] = new TestRegion();
    this.regions['demo-one'] = DemoOneRegion;

    this.gameplayClasses['empty'] = Gameplay;
    this.gameplayClasses['free'] = FreeGameplay;
    this.gameplayClasses['practice'] = PracticeModeGameplay;
   
    this.setRegion('title-screen','empty');
  //  this.activeRegion = this.regions['demo-one']; //we have the terrain now   
  //  this.gameplay = new FreeGameplay(this.activeRegion); 
    
    //connection here
    this.connection = new Connection({address : 'ws://'+document.domain+':7777'});
    //define all modules here
    
    this.modules [ 'hello-world' ] = new HelloWorldModule( this );
    this.modules [ AuthModule.NAME ] = new AuthModule( this );
    this.modules [ RoomModule.NAME ] = new RoomModule( this );
    this.modules [ GameModule.NAME ] = new GameModule( this );
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