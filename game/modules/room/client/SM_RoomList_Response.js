﻿var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');
var RoomModule = require('./module');
/**
 * Server side response to return room list to client
 * @constructor
 * @this {SM_RoomList_Response}
 * @param data 
 */
var SM_RoomList_Response = function (data) {
    this.name = 'SM_RoomList_Response';

    Game.roomlist = data;
    
    reloadRoomList();
    console.log(data);
    showRDiv('timeRoom');
    console.log("roomlist response");
 //   World.instance.overlay.changeState(RoomModule.RoomList);
    //World.instance.overlay.changeState(SM_RoomList_Response.RoomListState);
    
};

util.inherits(SM_RoomList_Response, ServerMessage);

SM_RoomList_Response.NAME = "SM_RoomList_Response";
SM_RoomList_Response.RoomListState = 'Room-Module-RoomList';

module.exports = SM_RoomList_Response;
