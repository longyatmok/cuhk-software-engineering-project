var THREE = require('../../../vendor/Three');
var util = require('../../Util');
var GameObjectManager = require('../../GameObjectManager');
var World = require('../../World');
var io = require('../../../vendor/socket.io-client');
var AbstractConnection = require('./AbstractConnection');
/**
 * Client Message on the client
 */
var ClientMessage = function(data) {
    this.name = "ABSTRACT_MESSENGE";
    this.data = {};
	//this.connection = AbstractConnection.instance;
};
ClientMessage.prototype.getSocket = function(){
    return this.connection.socket;
};
//emit this client message
ClientMessage.prototype.emit = function(){
    return this.connection.emit( this );
};



module.exports = ClientMessage;