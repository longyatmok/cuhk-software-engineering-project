// room class
var Player = require('../../shared/Player');

/**
 * room class
 * @constructor
 * @this {Room}
 * @param data 
 */
var Room = function(data) {
	this.id = data.id;
	this.seed = data.seed ? data.seed : (new Date()).getTime();
	this.players = {};
	for ( var i in data.players) {
		if (!(data.players[i] instanceof Player)) {
			data.players[i] = new Player(data.players[i]);

		}
		data.players[i].room = this;
		this.players[data.players[i].id] = data.players[i];
	}
	this.region = data.region;
	this.gameplay = data.gameplay;
	
	this.channel = null;
	this.status = data.status ? data.status: Room.STATUS_WAITING;
};

/**
 * room status
 */
Room.STATUS_WAITING = 'waiting';
Room.STATUS_PLAYING = 'playing';
Room.STATUS_RESULT = 'result';
Room.prototype.toJSON = function() {
	return {
		id : this.id,
		players : this.players,
		region : this.region,
		gameplay : this.gameplay,
		seed : this.seed,
		status: this.status
	};
};
/**
 * return if room is ready for join
 * @this {Room}
 * @return {boolean} room available or not
 */
Room.prototype.isAllReady = function(){
	if(this.noOfPlayer() == 1) return false;
	for ( var i in this.players) {
		if (this.players [ i].ready == false) return false;
	}

	return true;
}

/**
 * add player to room
 * @this {Room}
 * @param player
 * @return {boolean} can player be added or not
 */
Room.prototype.addPlayer = function(player) {
	if(this.noOfPlayer() >= 8 || this.status == Room.STATUS_PLAYING){
		return false;
	}
	if (!(player instanceof Player)) {
		player = new Player(player);
	}
	player.room = this;
	player.ready = false;
	this.players[player.id] = player;
	return true;
};

/**
 * return no. of player in room
 * @this {Room}
 * @return {number} length
 */
Room.prototype.noOfPlayer = function() {
	return Object.keys(this.players).length;
}

/**
 * remove selected player in room
 * @this {Room}
 * @param player
 * @return {boolean} player removed or not
 */
Room.prototype.removePlayer = function(player) {
	if (!player instanceof Player) {
		player = new Player(player);
	}
    console.log(this.players);

    // remove player success
	if (this.players[player.id] != undefined) {

		this.players[player.id].room = null;
		delete this.players[player.id];
		console.log("remove player");
		console.log(this.players);
		return true;
	}

    // remove player fail
	return false;
};

/**
 * game start for the room
 */
Room.prototype.start = function() {

};

/**
 * game quit for the room
 */
Room.prototype.quit = function() {
};


/**
 * game refresh for room status
 */
Room.prototype.update = function() {

};


/**
 * delete room
 */
Room.prototype.dispose = function() {
	console.log("deleting room id :" + this.id);
};


/**
 * return room id
 * @return {number} room id
 */
Room.prototype.getChannelName = function(){
	return "room."+this.id;
}
module.exports = Room;