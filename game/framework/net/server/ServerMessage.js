var THREE = require('../../../vendor/Three');
var util = require('../../Util');
var GameObjectManager = require('../../GameObjectManager');
var World = require('../../../World');
var io = require('../../../vendor/socket.io-client');

var ServerMessage = function(data) {
    this.__defineGetter__("connection", function(){
        return Connection.instance;
    });
};
ServerMessage.name = "ABSTRACT_MESSENGE";
