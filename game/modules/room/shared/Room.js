var Player = require('../../shared/Player');

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

Room.prototype.isAllReady = function(){
	if(this.noOfPlayer() == 1) return false;
	for ( var i in this.players) {
		if (this.players [ i].ready == false) return false;
	}

	return true;
}
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

Room.prototype.noOfPlayer = function() {
	return Object.keys(this.players).length;
}
Room.prototype.removePlayer = function(player) {
	if (!player instanceof Player) {
		player = new Player(player);
	}
	console.log(this.players);
	if (this.players[player.id] != undefined) {

		this.players[player.id].room = null;
		delete this.players[player.id];
		console.log("remove player");
		console.log(this.players);
		return true;
	}

	return false;
};


Room.prototype.start = function() {

};

Room.prototype.quit = function() {
};

Room.prototype.update = function() {

};

Room.prototype.dispose = function() {
	console.log("deleting room id :" + this.id);
};

Room.prototype.getChannelName = function(){
	return "room."+this.id;
}
module.exports = Room;