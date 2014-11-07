var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');

/**
 * Client side request to server for game start
 * @constructor
 * @this {CM_Room_GameStart}
 * @param data 
 */
var CM_Room_GameStart = function (data) {
    this.NAME = 'CM_Room_GameStart';
    this.data = data;
    this.connection = AbstractConnection.instance;
};
util.inherits(CM_Room_GameStart, ClientMessage);


module.exports = CM_Room_GameStart;
