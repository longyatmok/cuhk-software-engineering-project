var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');

/**
 * Client side token to server for game quit
 * @constructor
 * @this {CM_Room_GameQuit}
 * @param data 
 */
var CM_Room_GameQuit = function (data) {
    this.NAME = 'CM_Room_GameQuit';
    this.data = data;
    this.connection = AbstractConnection.instance;
};
util.inherits(CM_Room_GameQuit, ClientMessage);


module.exports = CM_Room_GameQuit;
