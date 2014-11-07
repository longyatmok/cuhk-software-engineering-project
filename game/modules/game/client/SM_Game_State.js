// server side game state msg for sync
var THREE = require('../../../vendor/Three');
var util = require('../../../framework/Util');
var GameObjectManager = require('../../../framework/GameObjectManager');
var World = require('../../../framework/World');
var io = require('../../../vendor/socket.io-client');
var ClientMessage = require('../../../framework/net/client/ClientMessage');
var ServerMessage = require('../../../framework/net/client/ServerMessage');
var AbstractConnection = require('../../../framework/net/client/AbstractConnection');

var RoomModule = require('../../room/client/module');
/**
 * SM_Game_State response to client for sync
 * @constructor
 * @this {SM_Game_State}
 * @param data 
 */

var SM_Game_State = function(data) {
	this.name = 'SM_Game_State';
	switch (data.type) {
	case 'start':
		World.instance.modules[SM_Game_State.GameModuleName].room = World.instance.modules[RoomModule.NAME].room;
		hideRDiv();
		break;
	case 'end':
		//the game end and display the result
		//console.log("GAME END");
		World.instance.gameplay.dispose();
		
		World.instance.setRegion('title-screen','empty');

		World.instance.overlay.visible(false);
		showRDiv('mark');
		$('#game_result_time').text((data.room.endTime - data.room.startTime)/1000);
		$('#game_result_scene').text(data.room.region);
		$('#game_result_winner').text(data.username);
		showRDiv('mark');
		break;
	case 'sync':
	default:
		//access the gameplay and update gameobject position and rotation
		World.instance.modules[SM_Game_State.GameModuleName].gameplay.updateNeworkedObject(data);
		
		break;

	break;
}
};

util.inherits(SM_Game_State, ServerMessage);
SM_Game_State.GameModuleName ='Game-Module';
SM_Game_State.NAME = "SM_Game_State";
module.exports = SM_Game_State;
