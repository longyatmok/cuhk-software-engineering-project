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

var Room = require('../shared/Room');
var RoomList = require('../shared/RoomList');

var CM_Room_Create = require('./CM_Room_Create');
var CM_Room_Join = require('./CM_Room_Join');

var CM_RoomList_Request = require('./CM_RoomList_Request');
var SM_RoomList_Response = require('./SM_RoomList_Response');
var CM_Room_GameStart = require('./CM_Room_GameStart');
var CM_Room_GameQuit = require('./CM_Room_GameQuit');
var SM_Room_Status = require('./SM_Room_Status');

// room module
/**
 * module for room
 * @constructor
 * @this {RoomModule}
 * @param world 
 */
var RoomModule = function(world) {
	this.roomList = new RoomList();
	this.world = world;
	this.room = null;
	var self = this;
	world.connection.register(SM_RoomList_Response);
	world.connection.register(SM_Room_Status);

    // GUI for mode selection
	world.overlay
			.add(
					RoomModule.ModeSelection,
					'<div class = "title"><img src="ui_im/title.png"></div>'
							+ '<div>'
							+ '<img style="position:absolute; top:400px;left:20%;" src="ui_im/modeselect.png">'
							+ '<div class="bg_box"><img width=80% height=300px src="ui_im/bgbox.png"></div>'
							+ '<img style="position:absolute;top:450px;z-index:2;position:absolute;left:20%;" id="'
							+ RoomModule.ModeSelection
							+ '_speed" src="ui_im/speed_watch.png">'
							+ '<img style="position:absolute;top:520px;z-index:2;position:absolute;left:20%;" id="'
							+ RoomModule.ModeSelection
							+ '_free" src="ui_im/free_jump.png">'
							+ '<img style="position:absolute;top:400px;z-index:2;position:absolute;left:55%;" id="'
							+ RoomModule.ModeSelection
							+ '_rank" src="ui_im/ranking_full.png">' + '</div>'

			);

    // GUI for room
	world.overlay
			.add(
					RoomModule.Room,
					'<div class = "title"><img src="ui_im/speedMode.png"></div>'
							+ '<div>'
							+ '<img style="position:absolute; top:220px;left:18%;" src="ui_im/waitingroom.png">'
							+ '<div class="bg_box"><img width=80% height=400px src="ui_im/bgbox.png"></div>'
							+ '<table>' + '<tr>' + '<td><img id="'
							+ RoomModule.Room
							+ '-user1-img" width="50" height="50" src="ui_im/people.png" ><span id="'
							+ RoomModule.Room
							+ '-user1-name" class="user"></td>'
							+ '<td><img id="'
							+ RoomModule.Room
							+ '-user2-img" width="50" height="50" src="ui_im/people.png" ><span id="'
							+ RoomModule.Room
							+ '-user2-name" class="user"></td>'
							+ '</tr>'

							+ '<tr>'
							+ '<td><img id="'
							+ RoomModule.Room
							+ '-user3-img" width="50" height="50" src="ui_im/people.png" ><span id="'
							+ RoomModule.Room
							+ '-user3-name" class="user"></td>'
							+ '<td><img id="'
							+ RoomModule.Room
							+ '-user4-img" width="50" height="50" src="ui_im/people.png" ><span id="'
							+ RoomModule.Room
							+ '-user4-name" class="user"></td>'
							+ '</tr>'

							+ '<tr>'
							+ '<td><img id="'
							+ RoomModule.Room
							+ '-user5-img" width="50" height="50" src="ui_im/people.png" ><span id="'
							+ RoomModule.Room
							+ '-user5-name" class="user"></td>'
							+ '<td><img id="'
							+ RoomModule.Room
							+ '-user6-img" width="50" height="50" src="ui_im/people.png" ><span id="'
							+ RoomModule.Room
							+ '-user6-name" class="user"></td>'
							+ '</tr>'

							+ '<tr>'
							+ '<td><img id="'
							+ RoomModule.Room
							+ '-user7-img" width="50" height="50" src="ui_im/people.png" ><span id="'
							+ RoomModule.Room
							+ '-user7-name" class="user"></td>'
							+ '<td><img id="'
							+ RoomModule.Room
							+ '-user8-img" width="50" height="50" src="ui_im/people.png" ><span id="'
							+ RoomModule.Room
							+ '-user8-name" class="user"></td>'
							+ '</tr>'

							+ '</table>		'

							+ '<img style="position:absolute;top:450px;z-index:2;left:75%;" id="'
							+ RoomModule.Room
							+ '_start" src="ui_im/start.png">'
							+ '<img style="position:absolute;top:500px;z-index:2;left:75%;" id="'
							+ RoomModule.Room
							+ '_back" src="ui_im/back.png">'
							+ '</div>'

			);

    // GUI for room list
	world.overlay
			.add(
					RoomModule.RoomList,
					'<div class = "title"><img src="ui_im/title.png"></div>'
							+ '<div>'
							+ '<img style="position:absolute; top:400px;left:20%;" src="ui_im/modeselect.png">'
							+ '<div class="bg_box"><img width=80% height=300px src="ui_im/bgbox.png"></div>'
							+ '<img style="position:absolute;top:450px;z-index:2;position:absolute;left:20%;" id="'
							+ RoomModule.ModeSelection
							+ '_speed" src="ui_im/speed_watch.png">'
							+ '<img style="position:absolute;top:520px;z-index:2;position:absolute;left:20%;" id="'
							+ RoomModule.ModeSelection
							+ '_free" src="ui_im/free_jump.png">'

							+ '<img class="head" style="position:absolute;top:52%;z-index:2;position:absolute;left:43%;" src="ui_im/img_trans.png">'
							+ '<div id="'
							+ RoomModule.RoomList
							+ '_list" class="width:390px;height:260px;overflow:scroll"><table>'
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
							+ '<img style="position:absolute;top:78%;z-index:2;left:75%;" id="'
							+ RoomModule.RoomList
							+ '_back" src="ui_im/back.png">' + '</div>'

			);

	$('#' + RoomModule.ModeSelection + '_free').click(function() {
		console.log("request free room list");
		var cm = new CM_RoomList_Request('free');
		cm.emit();
	});
	$('#' + RoomModule.RoomList + '_back').click(function() {
		World.instance.overlay.changeState(RoomModule.ModeSelection);

	});

	$('#' + RoomModule.Room + '_back').click(function() {
		World.instance.overlay.changeState(RoomModule.ModeSelection);

	});
	
	$('#'+RoomModule.Room + '_start').click(function(){
		self.iAmReady();
	});
	
	console.log("room module loaded");
};
util.inherits(RoomModule, Module);

/**
 * refresh room list
 * @this {RoomModule}
 * @param list 
 */
RoomModule.prototype.updateRoomList = function(list) {
	this.roomList = list;
	// TODO redraw UI
};
RoomModule.prototype.iAmReady = function(){
	var cm = new CM_Room_GameStart();
	cm.emit();
};


RoomModule.prototype.newRoom = function(data) {
	var cm = new CM_Room_Create(data);
	cm.emit();
};


RoomModule.prototype.joinRoom = function(data) {
	var cm = new CM_Room_Join(data);
	cm.emit();
};

RoomModule.prototype.leaveRoom = function() {
	var cm = new CM_Room_GameQuit();
	cm.emit();
};

/**
 * refresh room
 * @this {RoomModule}
 * @param data 
 */
RoomModule.prototype.updateRoom = function(data) {
	this.room = data;

	// swap gameplay
	this.world.setRegion(this.room.region,
			this.room.status == Room.STATUS_WAITING ? 'empty'
					: this.room.gameplay, {
				seed : this.room.seed,
				room : this.room
			});
	if (this.room.status != Room.STATUS_WAITING) {
		hideRDiv();
		World.instance.overlay.changeState('instruction');
		return;
	}
	// redraw UI
	renderRoom(this.room.id,this.room);
	return;
	var variables = [];
	var order = 1;
	for ( var i in this.room.players) {
		variables['user' + order + '-name'] = this.room.players[i].username;
		$('#'+RoomModule.Room + '-user'+order +'-img').attr('src','ui_im/' + ( this.room.players[i].ready ? 'ppl_o.png' : 'people.png'));
		order++;
	}
	for ( var j = order; j <= 8; j++) {
		variables['user' + order + '-name'] = '';
		$('#'+RoomModule.Room + '-user'+order +'-img').attr('src', 'ui_im/people.png');

		order++;
	}

	World.instance.overlay.changeState(SM_Room_Status.RoomState, variables);
};


RoomModule.NAME = 'Room-Module';
RoomModule.ModeSelection = RoomModule.NAME + '-ModeSelection';
RoomModule.RoomList = RoomModule.NAME + '-RoomList';
RoomModule.Room = RoomModule.NAME + '-Room';


/**
* return room list
* @this {RoomModule}
* @param mode 
*/
RoomModule.prototype.requestRoomList = function(mode) {

	var cm = new CM_RoomList_Request(mode);
	cm.emit();
};

module.exports = RoomModule;