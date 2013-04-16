﻿var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var World = require('../../framework/World');
var io = require('../../vendor/socket.io-client');
var ClientMessage = require('../../framework/net/client/ClientMessage');
var ServerMessage = require('../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../framework/net/client/AbstractConnection');
var room = require('./room');

/**
 * room list class
 * @constructor
 * @this {room_list}
 * @param data 
 */
var room_list = function (data) {
    this.World = data.world;
    this.data = { list : room['room_id'] };
};

module.exports = room_list;