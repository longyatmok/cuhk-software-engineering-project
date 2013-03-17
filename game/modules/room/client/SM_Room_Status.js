var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');
var Room = require('../shared/Room');

var SM_Room_Status = function(data) {
	this.name = 'SM_Room_Status';
	if(data.error != undefined){
		alert(data.error);
		return;
	}
	
	var module = World.instance.modules[SM_Room_Status.RoomModuleNAME];
	this.room = module.room;

	/*if (module.room != null && module.room.id == data.id) {
		module.room.update(data);
	} else {*/
		this.room = new Room(data);
//	}

	if(this.room.noOfPlayer() == 1 && this.room.status == Room.STATUS_PLAYING){
		World.instance.setRegion('title','empty');
		World.instance.overlay.changeState(RoomModule.ModeSelection);
		delete module.room;
		return;
	}
	module.updateRoom(this.room);
	
};
util.inherits(SM_Room_Status, ServerMessage);

SM_Room_Status.NAME = "SM_Room_Status";
SM_Room_Status.RoomModuleNAME = 'Room-Module';
SM_Room_Statis.ModeSelection = 'Room-Module-ModeSelection';
SM_Room_Status.RoomListState = 'Room-Module-RoomList';
SM_Room_Status.RoomState = 'Room-Module-Room';
SM_Room_Status.GameState = 'Room-Module-Game';
module.exports = SM_Room_Status;
