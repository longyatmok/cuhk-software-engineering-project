/**
 * GameModule
 * 
 */
var THREE = require('../../../vendor/Three');
var $ = require('../../../vendor/jQuery');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var Overlay = require('../../../framework/Overlay');
var Module = require('../../../framework/Module');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');

var SM_Game_State = require('./SM_Game_State');


/**
 * GameModule for game status
 * @constructor
 * @this {GameModule}
 * @param world 
 */
var GameModule = function(world) {
	
	this.world = world;
	this.room = null;
	this.gameplay
	world.connection.register(SM_Game_State);


	console.log("game module loaded");
};
util.inherits(GameModule, Module);

GameModule.NAME = 'Game-Module';


module.exports = GameModule;