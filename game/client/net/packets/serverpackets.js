var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var Connection = require('../../../framework/net/Connection');
var io = require('../../../vendor/socket.io-client');

var serverpackets = function(conn , socket) {
	socket.on('__client-verify', function(data) {
		socket.emit('__client-verify-response', {
			key : conn.opts.KEY,
			version : conn.opts.VERSION
		});
	});
	this.socket.on('__client-verify-result', function(data) {
		console.log(data);
	});
}

module.exports =  serverpackets;