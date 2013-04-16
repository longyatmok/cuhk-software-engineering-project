var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');

/**
 * Client side game state msg for sync
 * @constructor
 * @this {CM_Game_State}
 * @param object 
 */

var CM_Game_State = function (object) {
	this.NAME = "CM_Game_State";
	this.connection = AbstractConnection.instance;
	this.data = {
			position: object.position.toArray(),
			rotation: object.rotation.toArray()
	};
};

util.inherits(CM_Game_State, ClientMessage);

module.exports = CM_Game_State;
