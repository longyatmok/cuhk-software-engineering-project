var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');

var SM_Login_Response = function(data) {
	console.log(" SM_Login_Response" );
	console.log(data);
};

util.inherits(SM_Login_Response, ServerMessage);
SM_Login_Response.NAME = "SM_Login_Response";

module.exports = SM_Login_Response;
