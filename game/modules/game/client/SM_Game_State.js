// server side game state msg for sync
var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');

/**
 * SM_Game_State for sync
 * @constructor
 * @this {SM_Game_State}
 * @param data 
 */

var SM_Game_State = function(data) {
	this.name = 'SM_Game_State';
	switch (data.type) {
	case 'start':
		//World.instance.modules[ '']
		break;
	case 'end':

		break;
	case 'sync':
	default:

		break;

	break;
}
};

util.inherits(SM_Game_State, ServerMessage);

SM_Game_State.NAME = "SM_Game_State";

module.exports = SM_Game_State;
