/**
 * main to initialize GameCore
 * @constructor
 */

var $ = require('../vendor/jquery');
THREE = require('../vendor/Three');

var GameCore = require('./Core');
jQuery(function() {
	game = new GameCore({
		"container" : $('#canvas_container')[0], //define canvas element
		"allowFullScreen" : true
	});

	game.initialize(function() {
		game.start();
	});
});
