var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');


var CM_Login = function( info ){
	this.NAME = "CM_Login";
	this.connection = AbstractConnection.instance;
	
	this.data = { user_id : localStorage['user_id'] , user_token : localStorage['user_token']};

};
util.inherits(CM_Login,ClientMessage);


module.exports = CM_Login;
