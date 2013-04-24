/**
 * player info and data
 * shared on both client and server
 * @constructor
 * @this {Player}
 * @param data 
 */
var Player = function( data ){
	this.username = data.username;
	this.id = data.user_id;
	this.socket_ = data.socket;
	this.room = null;
	this.ready = data.ready ? data.ready : false;
};


/**
 * return player information
 * @this {Player}
 * @return {info} player info
 */
Player.prototype.toJSON = function(){
	return { username:this.username , user_id: this.id , ready : this.ready};
};


/**
 * remove player from room
 * @this {Player}
 */
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


/**
 * delete player
 */
Player.prototype.dispose = function(){
	
};
module.exports = Player;