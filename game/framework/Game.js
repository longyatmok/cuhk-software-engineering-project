//abstract game class
var jQuery = require('../client/vendor/jQuery');
var THREE = require('../client/vendor/Three');
var THREEx = THREEx || {};
THREEx.FullScreen = require('../client/vendor/THREEx/FullScreen');
THREE.TrackballControls = require('../client/vendor/THREE/TrackballControls');
THREEx.WindowResize = require('../client/vendor/THREEx/WindowResize');
var SceneManager = require('./SceneManager');
var AssetManager = require('./AssetManager');
var GameObjectManager = require('./GameObjectManager');
var util = require('util');

/**
 * Three.js Game Engine
 */
var Game = function(opts) {
	var game = this;
	this.opts = Game.extend({
		"width" : window.innerWidth,
		"height" : window.innerHeight,
		"container" : document.body,
		"allowFullScreen" : false,
		"fullScreenOpts" : {}
	}, opts);

	this.scenes = new SceneManager();
	this.assets = new AssetManager();
	this.gameobjects = new GameObjectManager();

	// renderer
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(this.opts.width, this.opts.height);
	this.renderer.autoClear = false;
	this.renderer.shadowMapEnabled = true;
	this.renderer.shadowMapSoft = true;
	this.opts.container.append(this.renderer.domElement);

	if (opts.allowFullScreen) {
		console.log("fullscreen : on");
		THREEx.FullScreen.bindKey(Game.extend({
			element : this.renderer.domElement
		}, this.opts.fullScreenOpts));
	}

	if (opts.width == this.opts.width && opts.height == this.opts.height
			|| (!opts.width && !opts.height)) {
		console.log("resize handler : on");
		window.addEventListener('resize', function() {
			game.onWindowResize();
		}, false);
	}

	this.initialized = false;
	this.active = false;
};

Game.ready = function(func) {
	window.addEventListener("load", function load(event) {
		window.removeEventListener("load", load, false);
		func();
	}, false);
};
Game.extend = jQuery.extend;

// boilerplate
Game.prototype.boilerplate = function() {
	this.scenes.boilerplate();
	this.gameobjects.boilerplate();
	console.log(this.scenes.active);
//	this.scenes.active.scene.add(this.gameobjects.get("__boilerplate_cube"));
	var activeScene = this.scenes.active.scene;
   /*
	
	MqoLoader.load('gameobjects/0-RAISER/0-RAISER.mqo', function(mqo) {
        xmesh = MqoLoader.toTHREEJS(mqo, {
 			MaterialConstructor : THREE.MeshPhongMaterial
        });
        console.log("adding 0-RAISER");
        activeScene.add( xmesh );
      });
    */   
	
	controls = new THREE.TrackballControls(this.scenes.active.cameras.main);
	controls.rotateSpeed = 4.0;
	controls.zoomSpeed = 3.6;
	controls.panSpeed = 2.0;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	// controls.addEventListener('change', this.render);
	return this;
};

/**
 * Initialization code goes here
 */
Game.prototype.initialize = function() {
	this.initialized = true;
	return this;
};

Game.prototype.start = function() {
	if (this.initialized == false) {
		throw Error("Game NOT INITIALIEZD");
	}
	this.active = true;
	var game = this;
	function animate() {
		if (game.active) {
			requestAnimationFrame(animate);
			controls.update();
			game.render();

		}
	}

	animate();
};
Game.prototype.pause = function() {
	if (this.initialized == false) {
		throw Error("Game NOT INITIALIEZD");
	}
	this.active = false;
	return this;
};


Game.prototype.stop = function() {
	this.pause();
	this.initialized = false;
	//TODO free resource
	return this;
};

Game.prototype.render = function() {
	this.gameobjects.render();
	this.scenes.render();

	this.renderer.clear();
	this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	this.renderer.render(this.scenes.active.scene,
			this.scenes.active.cameras.main);
	
	//override this method to add other camera

};

Game.prototype.onWindowResize = function() {

	this.scenes.active.cameras.main.aspect = window.innerWidth
			/ window.innerHeight;
	this.scenes.active.cameras.main.updateProjectionMatrix();

	this.renderer.setSize(window.innerWidth, window.innerHeight);

	//this.controls.handleResize();

	this.render();
}

module.exports = Game;