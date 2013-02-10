//foo = require('./test');
//var Game = require('../framework/Game');

var $ = require('./vendor/jquery');
THREE = require('./vendor/Three');
var GameCore = require('./Core');
jQuery(function() {
	game = new GameCore({
		"container" : $('#canvas_container'),
		"allowFullScreen" : true
	});
	game.boilerplate().initialize().start();
});
/*
 * jQuery(function() { foo.init(); });
 */