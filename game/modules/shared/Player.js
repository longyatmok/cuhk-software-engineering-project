
var Player = function( data ){
	this.username = data.username;
	this.id = data.user_id;
	this.socket_ = data.socket;
	this.room = null;
	this.ready = data.ready ? data.ready : false;
};

Player.prototype.toJSON = function(){
	return { username:this.username , user_id: this.id , ready : this.ready};
};

Player.prototype.leaveRoom = function(){
	var room = this.room;
	if(room != null){
		room.removePlayer( this );
	}
	this.room = null;
	if(room.players.length == 0){
		room.dispose();
		delete room;
	}
};
Player.prototype.dispose = function(){
	
};
module.exports = Player;