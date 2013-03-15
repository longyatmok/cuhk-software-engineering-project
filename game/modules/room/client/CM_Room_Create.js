var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var World = require('../../framework/World');
var io = require('../../vendor/socket.io-client');
var ClientMessage = require('../../framework/net/client/ClientMessage');
var ServerMessage = require('../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../framework/net/client/AbstractConnection');


var CM_Room_Create = function (data) {
    this.name = 'CM_Room_Create';
    this.data = data;
    this.connection = AbstractConnection.instance;
};
util.inherits(CM_Room_Create, ClientMessage);


module.exports = CM_Room_Create;
