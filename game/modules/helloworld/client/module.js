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
var SM_Helloworld = require('./SM_Helloworld');

var HelloWorldModule = function( world ){
	world.connection.register( SM_Helloworld );
	console.log("Helloworld module loaded");
};

util.inherits(HelloWorldModule , Module);

module.exports = HelloWorldModule;