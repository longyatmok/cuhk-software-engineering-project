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
	this.height = null;
};


/**
 * return player information
 * @this {Player}
 * @return {info} player info
 */
Player.prototype.toJSON = function(){
	return { username:this.username , user_id: this.id , ready : this.ready, height: this.height};
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
 * remove player from room
 * @this {Player}
 */
Player.prototype.getHeight = function(){
	return this.height == null ? 0 : this.height;
};


/**
 * delete player
 */
Player.prototype.dispose = function(){
	
};
module.exports = Player;