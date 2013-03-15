var THREE = require('../../../vendor/Three');
var $ = require('../../../vendor/jQuery');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var Overlay = require('../../../framework/Overlay');
var Module = require('../../../framework/Module');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');

var Room = require('./Room');
var RoomList = require('./RoomList');

var CM_RoomList_Request = require('./CM_RoomList_Request');
var SM_RoomList_Response = require('./SM_RoomList_Response');

var RoomModule = function(world) {
	this.roomList = new RoomList();
	world.connection.register(SM_RoomList_Response);
	world.overlay
			.add(
					RoomModule.ModeSelection,
					'<div class = "title"><img src="ui_im/title.png"></div>'
							+ '<div>'
							+ '<img style="position:absolute; top:400px;left:20%;" src="ui_im/modeselect.png">'
							+ '<div class="bg_box"><img width=80% height=300px src="ui_im/bgbox.png"></div>'
							+ '<img style="position:absolute;top:450px;z-index:2;position:absolute;left:20%;" id="' +RoomModule.ModeSelection+'_speed" src="ui_im/speed_watch.png">'
							+ '<img style="position:absolute;top:520px;z-index:2;position:absolute;left:20%;" id="' +RoomModule.ModeSelection+'_free" src="ui_im/free_jump.png">'
							+ '<img style="position:absolute;top:400px;z-index:2;position:absolute;left:55%;" id="' +RoomModule.ModeSelection+'_rank" src="ui_im/ranking_full.png">'
							+ '</div>'

			);
	
	world.overlay
	.add(
			RoomModule.RoomList,
			'<div class = "title"><img src="ui_im/title.png"></div>'
					+ '<div>'
					+ '<img style="position:absolute; top:400px;left:20%;" src="ui_im/modeselect.png">'
					+ '<div class="bg_box"><img width=80% height=300px src="ui_im/bgbox.png"></div>'
					+ '<img style="position:absolute;top:450px;z-index:2;position:absolute;left:20%;" id="' +RoomModule.ModeSelection+'_speed" src="ui_im/speed_watch.png">'
					+ '<img style="position:absolute;top:520px;z-index:2;position:absolute;left:20%;" id="' +RoomModule.ModeSelection+'_free" src="ui_im/free_jump.png">'
					
					+ '<img class="head" style="position:absolute;top:52%;z-index:2;position:absolute;left:43%;" src="ui_im/img_trans.png">'
					+ '<div id="'+RoomModule.RoomList+'_list" class="width:390px;height:260px;overflow:scroll"><table>'
					+ '<tr><td><img src="ui_im/world.png"> 1</td></tr>'
					+ '<tr><td><img src="ui_im/world.png"> 2</td></tr>'
					+ '<tr><td><img src="ui_im/world.png"> 3</td></tr>'
					+ '<tr><td><img src="ui_im/world.png"> 4</td></tr>'
					+ '<tr><td><img src="ui_im/world.png"> 5</td></tr>'
					+ '<tr><td><img src="ui_im/world.png"> 6</td></tr>'
					+ '<tr><td><img src="ui_im/world.png"> 7</td></tr>'
					+ '<tr><td><img src="ui_im/world.png"> 8</td></tr>'
					+ '<tr><td><img src="ui_im/world.png"> 9</td></tr>'
					
                    + '</table></div>'
                    + '<img style="position:absolute;top:78%;z-index:2;left:75%;" id="' +RoomModule.RoomList+'_back" src="ui_im/back.png">'
					+ '</div>'

	);
	$('#' +RoomModule.ModeSelection+'_free').click(function() {
		console.log("request free room list");
		var cm = new CM_RoomList_Request('free');
		cm.emit();
	});

	$('#' +RoomModule.RoomList+'_back').click(function(){
		  World.instance.overlay.changeState(RoomModule.ModeSelection);
		    
	});
	console.log("room module loaded");
};
util.inherits(RoomModule, Module);

RoomModule.prototype.setRoomList = function ( list ){
	this.roomList = list;
};

RoomModule.NAME = 'Room-Module';
RoomModule.ModeSelection = RoomModule.NAME + '-ModeSelection';
RoomModule.RoomList = RoomModule.NAME + '-RoomList';

RoomModule.prototype.requestRoomList = function(mode) {

	var cm = new CM_RoomList_Request(mode);
	cm.emit();
};

module.exports = RoomModule;