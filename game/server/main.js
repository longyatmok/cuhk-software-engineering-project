/**
 * Game Server
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

io.sockets.on('connection', function(socket) {
	//write packets here
	socket.__verify = false;
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

});