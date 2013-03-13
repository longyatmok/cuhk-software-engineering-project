var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var Module = require('../../../framework/Module');
var io = require('../../../vendor/socket.io-client');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
//client messages

//server messages
var SM_Login_Response = require('./SM_Login_Response');
var CM_Login = require('./CM_Login');
var AuthModule = function( world ){
	world.connection.register( SM_Login_Response );
	console.log("auth module loaded");
};

AuthModule.prototype.login = function(){
var cm=	new CM_Login();
cm.emit();
}
util.inherits(AuthModule , Module);

module.exports = AuthModule;