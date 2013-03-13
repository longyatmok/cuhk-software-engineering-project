var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var World = require('../../framework/World');
var io = require('../../vendor/socket.io-client');
var io = require('../../vendor/socket.io-client');
var ClientMessage = require('../../framework/net/client/ClientMessage');
var ServerMessage = require('../../framework/net/client/ServerMessage');

var HelloWorldModule = function( world ){
	world.connection.register( SM_Helloworld );
	console.log("SM_Helloworld (client)");
	console.log(data);
};

util.inherits(HelloWorldModule , Module);
SM_Helloworld.name = "SM_helloworld";

module.exports = HelloWorldModule;