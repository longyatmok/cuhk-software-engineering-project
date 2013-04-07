﻿var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');


var CM_Chat = function (data) {
    this.name = "CM_Chat";
    this.connection = AbstractConnection.instance;
    this.data = { user_id: localStorage['user_id'], user_msg: localStorage['user_msg'] };

};
util.inherits(CM_Chat, ClientMessage);

module.exports = CM_Chat;
