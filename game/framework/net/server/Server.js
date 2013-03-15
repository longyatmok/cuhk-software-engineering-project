var util = require('util');

var app = require('express')(), server = require('http').createServer(app), io = require(
		'socket.io').listen(server);
var Server = function(opts) {
	/*
	 * var opts = { VERSION : '0.0.0', KEY : 'CSCI3100-GROUP6', port : 7777 };
	 */
	server.listen(opts.port, function() {
		console.log("Express server listening on port" + opts.port);
	});

	io.sockets.on('connection', function(socket) {

		socket.emit('SM_helloworld', {
			data : "hello,world!"
		});
		socket.on('CM_helloworld', function(data) {
			console.log(" >>> [CM_helloworld]");
			console.log(data);
		});

		socket.on('CM_RoomList_Request',function(data){
			console.log(data);
			socket.emit('SM_RoomList_Response',{});
		});
		socket.on('CM_Login',
				function(data) {
					console.log(" >>> [CM_Login]");
					console.log(data);
					if (data.user_id == undefined
							|| data.user_token == undefined) {
						socket.emit('SM_Login_Response', {
							message : "message_error"
						});
						socket.disconnect();
					}

					if (data.user_id == '1' && data.user_token == 'abc') {
						socket.emit('SM_Login_Response', {
							message : "success",
							user : {
								username : 'admin',
								user_id : 1
							}
						});
					} else if (data.user_id == '0'
							&& data.user_token == 'DEMO_SESSION') {
						socket.emit('SM_Login_Response', {
							message : "success",
							user : {
								username : data.info.username,
								user_id : 0
							}
						});
					} else {
						socket.emit('SM_Login_Response', {
							message : "forbidden"
						});
						socket.disconnect();
					}

				});
	});
	this.listeners = [];
};
Server.prototype.onconnection = function(socket) {

};
Server.prototype.ondisconnection = function(socket) {

};
Server.prototype.register = function(ServerMessageClass) {
	// register the Server Message Class to the socket
};
Server.prototype.emit = function(MessageObject) {
	//emit an event described in the Client Message Object
};

module.exports = Server;