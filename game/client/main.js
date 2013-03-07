//foo = require('./test');
//var Game = require('../framework/Game');

var $ = require('../vendor/jquery');
THREE = require('../vendor/Three');

var GameCore = require('./Core');
jQuery(function() {
    game = new GameCore({
	"container" : $('#canvas_container')[0],
	"allowFullScreen" : true
    });
    /*
    game.boilerplate().initialize(function() {
	game.start();

    });*/
    game.initialize(function() {
	game.start();

    });
});
/*
 * jQuery(function() { foo.init(); });
 */