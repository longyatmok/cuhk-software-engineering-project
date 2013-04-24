﻿var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');

/**
 * Client side request for room list info
 * @constructor
 * @this {CM_RoomList_Request}
 * @param mode 
 */
var CM_RoomList_Request = function (mode) {
    this.NAME = 'CM_RoomList_Request';
    //TODO
    this.data = {mode : mode == 'free' ? 'free' : 'speed'};
    this.connection = AbstractConnection.instance;
};

util.inherits(CM_RoomList_Request, ClientMessage);

module.exports = CM_RoomList_Request;
