// temp chatbox
var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');
var CM_Chat = require('./CM_Chat');
var SM_Chat = require('./SM_Chat');

/**
 * Chatbox
 * @constructor
 * @this {Chatbox}
 * @param data 
 */

var Chatbox = function (data) {
    this.world = data.world;
    this.connection = AbstractConnection.instance;
    this.data = { user_id: localStorage['user_id'], user_msg: localStorage['user_msg'] };
    this.channel = data.channel;

};

/**
 * Chatbox onmessage
 * @this {Chatbox}
 * @param data 
 */

Chatbox.prototype.onMessage = function (data) {
    io.sockets.on('connection', function (socket) {
        socket.on('CM_Chat', function (data) {
            this.data = data;
            console.log(data);
        });
    });

};

/**
 * Chatbox send
 * @this {Chatbox}
 * @param data 
 */

Chatbox.prototype.send = function (data) {
    io.sockets.on('connection', function (socket) {
        socket.emit('SM_Chat', { msg: this.data.msg });
        socket.broadcast.emit('SM_Chat', { msg: this.data.msg });
    });
};
/**
 * Chatbox update
 * @this {Chatbox}
 * @param data 
 */
Chatbox.prototype.update = function (data) {
    return this;
};
/**
 * Chatbox dispose
 * @this {Chatbox}
 * @param data 
 */

Chatbox.prototype.dispose = function () {
    delete this;
};

module.exports = Chatbox;
