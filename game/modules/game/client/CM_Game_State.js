var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');


var CM_Game_State = function (object) {
	this.data = {
			position: object.position,
			rotation: object.rotation
	};
};

util.inherits(CM_Game_State, ClientMessage);

module.exports = CM_Game_State;
