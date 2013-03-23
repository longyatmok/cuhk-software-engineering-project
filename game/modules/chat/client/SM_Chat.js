var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');

var SM_Chat = function (data) {
    console.log(" SM_Chat");
    console.log(data);
};

util.inherits(SM_Chat, ServerMessage);
SM_Chat.NAME = "SM_Login_Response";

module.exports = SM_Chat;
