var THREE = require('../../vendor/Three');
var util = require('../../framework/Util');
var GameObjectManager = require('../../framework/GameObjectManager');
var World = require('../../framework/World');
var io = require('../../vendor/socket.io-client');
var ClientMessage = require('../../framework/net/client/ClientMessage');
var ServerMessage = require('../../framework/net/client/ServerMessage');

var SM_Room_Status = function (data) {
    this.name = 'SM_Room_Status';
    console.log("SM_Room_Status");
    console.log(data);
};

util.inherits(SM_Room_Status, ServerMessage);
SM_RoomList_Response.NAME = "SM_Room_Status";

module.exports = SM_Room_Status;
