var THREE = require('../../../vendor/Three');
var util = require('../../Util');
var GameObjectManager = require('../../GameObjectManager');
var World = require('../../../World');
var io = require('../../../vendor/socket.io-client');

var Connection = function(opts) {
	var io = require('socket.io').listen(80);
	io.sockets.on('connection', function(socket) {
	    //register messages
	  });
	};
	Connection.prototype.register = function(ServerMessageClass){
	   //register the Server Message Class to the socket
	};
	Connection.prototype.emit = function(MessageObject){
	  //emit an event described in the Client Message Object
	};
