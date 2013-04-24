/**
 * Game Server
 * old main for testing only
 * @deprecated
 */
var app = require('express')(), server = require('http').createServer(app), io = require(
		'socket.io').listen(server);

var opts = {
	VERSION : '0.0.0',
	KEY : 'CSCI3100-GROUP6'
};

server.listen(7777, function() {
	console.log("Express server listening on port 7777");
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

CM_ROOMLIST_Request = function ( data ){
 this.mode = data.mode;	
 var roomList = server.roomlist [ this.mode ];
 
 var response = SM_ROOMLIST_Response ( roomlist ,this.mode);
 response.emit();
}
until.inherits( CM_ROOM;OST_Request , ClientMessage);

SM_ROOMLIST_Response = function ( roomlist ,mode){
	this.data = {
			'roomlist' : roomlist,
			'mode' : mode
	};
}
until.inherits( CM_ROOM;OST_Request , ServerMessage);

io.sockets.on('connection', function(socket) {
	//write packets here
	socket.__verify = false;
	connection.register( CM_ROOMLIST_Request );
	
	socket.emit('__client-verify');
	socket.on('__client-verify-response', function(data) {
		if (data.version != undefined) {
			if (data.version == opts.VERSION && data.key == opts.KEY) {
				socket.__verify = true;
				return socket.emit('__client-verify-result', {
					result : 'success'
				});
			}
		}
		socket.emit('__client-verify-result', {
			result : 'access-denied'
		});
		socket.disconnect();
	});

	
	
	
	
	
	
	socket.on('CM_ROOMLIST_Request', function ( data){
		return socket.emit('SM_ROOMLIST_Response',{
			roomlist : server.roomlist [ data.mode ],
			mode : data.mode
		});
	});
	
	
	socket.on('CM_Chat' , function( data){
		
		io.sockets.in( data.room ).emit('SM_Chat',{
			message : data.message
			id : data.user_id
			name : User.find( data.user_id ).username
		});
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});