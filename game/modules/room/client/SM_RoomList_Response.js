var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');
var RoomModule = require('./module');

var SM_RoomList_Response = function (data) {
    this.name = 'SM_RoomList_Response';
    this.list = data.list;
    console.log("SM_RoomList_Response");
    console.log(data);
    World.instance.overlay.changeState(SM_RoomList_Response.RoomListState);
    
};

util.inherits(SM_RoomList_Response, ServerMessage);
SM_RoomList_Response.NAME = "SM_RoomList_Response";
SM_RoomList_Response.RoomListState = 'Room-Module-RoomList';
module.exports = SM_RoomList_Response;
