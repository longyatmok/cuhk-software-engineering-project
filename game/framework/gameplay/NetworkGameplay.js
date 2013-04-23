/**
 * NetworkGameplay (Abstract Class) inherited from NetworkGameplay
 * 
 * @constructor
 * @this {NetworkGameplay}
 * @param {region,
 *            opts}
 */
var THREE = require('../../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('../GameObjectManager');
var World = require('../World');

var DefaultCamera = require('../cameras/DefaultCamera');
var FreeGameplay = require('./FreeGameplay');
var ColladaLoader = require('../../vendor/loaders/ColladaLoader');
var CharacterController = require('../controllers/CharacterController');
var GameModule = require('../../modules/game/client/module');
var CM_Game_State = require('../../modules/game/client/CM_Game_State');
var SM_Game_State = require('../../modules/game/client/SM_Game_State');
var RoomModule = require('../../modules/room/client/module');
var AuthModule = require('../../modules/auth/client/module');
/**
 * 
 * 
 * @constructor
 * @this {NetworkGameplay}
 * @param region
 *            Region
 * @param opts
 *            Options Object
 */
var NetworkGameplay = function(region, opts) {
	this.opts = World.extend({
		name : 'network',
		yLevel : 10,
		debugLine : false
	}, opts);
	this.ready = false;
	NetworkGameplay.super_.call(this, region, this.opts);
	// network start
	this.roomModule = World.instance.modules[RoomModule.NAME];
	this.gameModule = World.instance.modules[GameModule.NAME];
	if (typeof this.roomModule == 'undefined'
			|| typeof this.gameModule == 'undefined') {
		throw new Error('Room Module and Game Module not Found.');
	}

	this.gameModule.gameplay = this;

	this.positionClone_ = null
	this.rotationClone_ = null;

};
util.inherits(NetworkGameplay, FreeGameplay);
/**
 * Character respawn
 */
NetworkGameplay.prototype.respawn = function(position) {
	if (!this.ready)
		return false;

	if (typeof this.controls == "undefined") {
		var me = World.instance.modules[AuthModule.NAME].user;
		// spawn networked players
		for ( var i in this.gameModule.room.players) {
			if (this.gameModule.room.players[i].id == me.user_id) {
				continue;
			}
			var character = this.gameobjects.get('character.template').clone();
			console.log("[SPAWN] spawning character id "
					+ this.gameModule.room.players[i].id);
			this.gameobjects.add('game.net.objects.'
					+ this.gameModule.room.players[i].id, character);
			this.scene.add(character);

		}
	}
	NetworkGameplay.super_.prototype.respawn.call(this,position);

};

NetworkGameplay.prototype.initialize = function() {
	NetworkGameplay.super_.prototype.initialize.call(this);

	this.miniCamera = new DefaultCamera(75, 200 / 200, 0.1, 2000); /*
																	 * mini
																	 * camera
																	 * ratio
																	 */
	this.scene.add(this.miniCamera);
	this.miniCamera.rotation.set(-Math.PI / 2, 0, 0);
	this.miniCamera.position.y = 400;
};
/**
 * update networked Object position and rotation
 */
NetworkGameplay.prototype.updateNeworkedObject = function(data) {
	if (typeof data.id != "undefined") {
		try {

			var object = this.gameobjects.get('game.net.objects.' + data.id);
			object.position.set.apply(object.position, data.position);
			object.rotation.set.apply(object.rotation, data.rotation);

		} catch (e) {
		}
	}
};


NetworkGameplay.prototype.render = function(dt) {
	if (!this.ready || !this.gameobjects.get('controls').enabled)
		return;

	NetworkGameplay.super_.prototype.render.call(this, dt);

	var msg = new CM_Game_State(this.gameobjects.get('game.player')); //send my data to the server via CM_Game_State MSG
	msg.emit();
	return;
};

/**
 * A hook which run after render
 */
NetworkGameplay.prototype.renderAfter = function(renderer, dt) {
	/*if (this.ready && typeof this.gameobjects.get('controls') != "undefined") {

		this.miniCamera.position.x = this.gameobjects.get('game.player').position.x;
		this.miniCamera.position.y = 400 + this.gameobjects.get('game.player').position.y;
		this.miniCamera.position.z = this.gameobjects.get('game.player').position.z;
		renderer.setViewport(0, 0, 200, 200);
		renderer.render(this.scene, this.miniCamera);
	}*/
};
module.exports = NetworkGameplay;