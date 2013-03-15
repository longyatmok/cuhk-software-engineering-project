var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var CM_Helloworld = require('./CM_Helloworld');
var CM_Login = require('../../auth/client/CM_Login');

var SM_Helloworld = function(data) {
	console.log("testing");
	console.log(data);
	console.log("send msg to server");
	var cm = new CM_Helloworld({
		username : "admin",
		foo : "bar"
	});
	cm.emit();
	
/*	var cm2 = new CM_Login();
	cm2.emit();
	*/
};


util.inherits(SM_Helloworld, ServerMessage);
SM_Helloworld.NAME = "SM_helloworld";

module.exports = SM_Helloworld;
