var THREE = require('../../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('../GameObjectManager');
var World = require('../World');
var io = require('../../vendor/socket.io-client');

var Connection = function(opts) {
	var conn = this;
	this.opts = util.extend({
		address : "ws://localhost:7777",
		VERSION : "VERSION",
		KEY : "KEY_HERE",
	}, opts);

	var socket = this.socket = io.connect(this.opts.address);
	socket.__verify = false;
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

module.exports = Connection;