var util = require('util');
var app = require('express')(), _server = require('http').createServer(app), io = require(
		'socket.io').listen(_server);
var mysql      = require('mysql');

var Player = require('../../../modules/shared/Player');
var Room = require('../../../modules/room/shared/Room');
var RoomList = require('../../../modules/room/shared/RoomList');
var counter = 1;

/**
 * the server behind this game framework
 * 
 * @constructor
 * @this {Server}
 * @param opts
 */
var Server = function(opts) {
	var server = this;
	this.server = _server;
	this.roomList = {
			'free' : [],
			'speed' : []
	};
	this.roomIdCounter = 0;
/*	var demoRoom = new Room({
				id: 0,
				region : 'test2',// 'demo-one',
				gameplay : 'network',// 'practice',//free' ,
				players : {}
	});
	
	this.roomList.free [ 0 ] = demoRoom;
	this.roomList.free [ 0 ] .channel = io.sockets.in(demoRoom.getChannelName());
*/	
	this.playerList = [];
	this.socketToplayerList = [];
	this.conn = mysql.createConnection({
		/*
		 * host : 'allenp.tk', user : 'csci3100', password : '0102030405',
		 * 
		 * the database config should be save to another file
		 */
host : '127.0.0.1',
user : 'csci3100',
password : '0102030405',
database : 'totheskies'
		});
	this.conn.connect(function(err) {
		  if( err != null) console.error("can't connect to the dataase");
	});
	/*
	 * var opts = { VERSION : '0.0.0', KEY : 'CSCI3100-GROUP6', port : 7777 };
	 */
	_server.listen(opts.port, function() {
		console.log("Express server listening on port" + opts.port);
	});
	io.set('log level', 1); // hide debug message

	io.sockets.on('connection', function(socket) {

		/*
		 * The MSG Where player disconnected from the server
		 */
		socket.on('disconnect',function(data){
			if(!socket.player) return;
			console.log("[DISCONNECTED] : " + '{' + socket.player.id+'} ' + socket.player.username);
			var room = socket.player.room;
			if(room != null){
				socket.leave( room.getChannelName());
				room.removePlayer( socket.player );			
				// notify other players in the room that this player is
				// disconnected
				socket.leave( room.getChannelName());		
				room.channel.emit('SM_Room_Status',room); 
			
			
				if(typeof room != "undefined" && room.noOfPlayer() < 2 && room.status == Room.STATUS_PLAYING){
					room.status = Room.STATUS_WAITING; 
				
					delete server.roomList.free[ room.id];
					delete room;
				}
			
			}
			
			socket.player.room = null;
			delete server.playerList[ socket.player.id ];
			delete socket.player;			
		});
		
		
	
		/**
		 * The MSG Where player send synchorization message
		 */
		socket.on('CM_Game_State',function(data){
			if(!socket.player) return;
			if(!socket.player.room) return;
			if(socket.player.room.status == Room.STATUS_PLAYING){
				socket.player.height = data.position[1];
				if (data.position[1] >= 400.0) { // reach the goal!
					var room = socket.player.room;
					console.log("reach the goal!");
					socket.player.room.status = Room.STATUS_RESULT;
					socket.player.room.endTime = Date.now();
					var resultList = [],j;
					for ( var i in room.players) {
						if (room.players[i] instanceof Player) {
							for(j=0;j<8;j++){
								if(resultList.length <= j){
									resultList[j]=room.players[i];
									break;
								}
								if(room.players[i].getHeight() > resultList[j].getHeight()){
									resultList.splice(j,0,room.players[i]);
									break;
								}
							}
				
						}
					}
					for(j=0;j<resultList.length;j++){
						server.conn.query("INSERT INTO `record` (`record_time`, `room_create_time`, `uid`, `roomid`, `scene_id`, `character_id`, `mode`, `player_num`, `height`, `time`, `score`, `rank`) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, '1', '1', 'free',?, ?, ?, '0', ?)", [resultList[j].id,room.id,room.noOfPlayer(),resultList[j].getHeight() , socket.player.room.endTime - socket.player.room.startTime, j+1], function(err, results) {
//						console.log(err);
//						console.log(results);
					});
					}
					
					io.sockets.in(room.getChannelName()).emit('SM_Game_State',{
						id:socket.player.id,
						username:socket.player.username,
						type : "end",
						room:socket.player.room
					});
				// io.sockets.in(room.getChannelName()).emit('SM_Room_Status',socket.player.room);
					console.log("REMOVE ALL PLAYERS");
					for ( var i in room.players) {
						room.removePlayer(room.players[i]);
					}
					
					delete server.roomList.free[ room.id];
					delete room;
					return;
				}
			socket.broadcast.to( socket.player.room.getChannelName() ).emit('SM_Game_State',{
				id:socket.player.id,
				position:data.position,
				rotation:data.rotation
			});
			}
		});
		
		
		
		/**
		 * THE MSG Where player hit the "Return/Exit" Button
		 */
		socket.on('CM_Room_GameQuit',function(){
			
		
			var room = socket.player.room;
			if(room != null){
				console.log(socket.manager.roomClients[socket.id]);
				
				console.log(socket.player.username + ' leave room '+ socket.player.room.id);
				socket.leave( room.getChannelName());
				room.removePlayer( socket.player );
				
// notify other players in the room that this player is disconnected
				io.sockets.in(room.getChannelName()).emit('SM_Room_Status',room); 
				
				console.log(socket.manager.roomClients[socket.id]);
				if(typeof room != "undefined" && room.noOfPlayer() < 2 && room.status == Room.STATUS_PLAYING){
					room.status = Room.STATUS_WAITING; 
				}
				if(room.noOfPlayer() < 1){
					delete server.roomList.free[room.id];
				}
			// io.sockets.in(room.getChannelName()).emit('SM_Room_Status',room);
			}			
		
			socket.player.ready = false;
		
			
		});
		/**
		 * THE MSG Where player want to create a new room
		 */
		socket.on('CM_Room_Create',function(data){
			if(!socket.player) return;
			// socket.emit('SM_Room_Status',{error:"error on creating a new
			// room"});
			// return ;
			try{
			server.roomIdCounter++;
			    var room = new Room({
			    	id: server.roomIdCounter,
			    	region : data.region_id,// 'demo-one',
			    	gameplay : 'network',// 'practice',//free' ,
			    	players : {}});
				
			    var newRoomID = server.roomIdCounter;
				
				server.roomList.free [ room.id ] = room;
				server.roomList.free [ room.id ].channel = io.sockets.in(room.getChannelName());
				
			}catch(e){
				socket.emit('SM_Room_Status',{error:"error on creating a new room"});
			}
			
			// try{
				// leave room and then join room
				var room = socket.player.room;
	
				if(room != null){
					console.log("removing from a room");
					socket.leave( room.getChannelName());
					room.removePlayer( socket.player );		
		
					// notify other players in the room that this player is
					// disconnected
					room.channel.emit('SM_Room_Status',room); 			
					if(typeof room != "undefined" && room.noOfPlayer() < 2 && room.status == Room.STATUS_PLAYING){
						room.status = Room.STATUS_WAITING; 
					}			
				}
				
	
				
				var result = server.roomList.free [ newRoomID ].addPlayer( socket.player );
				
				
				if(result == true){
					socket.join( server.roomList.free [ newRoomID ].getChannelName() );
					io.sockets.in(socket.player.room.getChannelName()).emit('SM_Room_Status',server.roomList.free [ newRoomID ]);
				}else{
					socket.emit('SM_Room_Status',{error:"The World you are attempting to join is full or playing."});
				}
			// }catch(e){
			// socket.emit('SM_Room_Status',{error:"error on joining a new
			// room"});
			// }
			
		});
		
		
		
		/**
		 * THE MSG Where player choose a room
		 */
		socket.on('CM_Room_Join',function(data){
			if(!socket.player) return;
			try{		
				// leave room and then join room
				var room = socket.player.room;
				if(room != null){
					socket.leave( room.getChannelName());
				
					room.removePlayer( socket.player );
					
					// notify other players in the room that this player is
					// disconnected
					room.channel.emit('SM_Room_Status',room); 
					socket.leave( room.getChannelName());
				
					if(typeof room != "undefined" && room.noOfPlayer() < 2 && room.status == Room.STATUS_PLAYING){
						room.status = Room.STATUS_WAITING; 
					}
				
				}	
				
			
				socket.player.ready = false;
			var result = server.roomList.free [ data.id ].addPlayer( socket.player );
			if(result == true){
				
				socket.join( server.roomList.free [ data.id ].getChannelName());
				io.sockets.in(socket.player.room.getChannelName()).emit('SM_Room_Status',server.roomList.free [ data.id ]);
			}else{
				// IF Failed to join the room , the room should reach its upper
				// limit of members or the room status is playing.
				socket.emit('SM_Room_Status',{error:"The World you are attempting to join is full or playing."});
			}
			}catch(e){
				// error handling
				socket.emit('SM_Room_Status',{error:"error on joining a new room"});
			}

		});
		
		/**
		 * THE MSG Where player hit "start"
		 */
		socket.on('CM_Room_GameStart',function(){
			if(!socket.player) return;
			if(!socket.player.room) return;
			server.socketToplayerList[socket.id].ready = true;
			
		
			// IF ALL hitted "start" , the game starts
			if(socket.player.room.isAllReady()){
				// start the game IF all players are ready.
				socket.player.room.status = Room.STATUS_PLAYING;
				socket.player.room.startTime = Date.now();
				// THE MSG to start the game
				io.sockets.in(socket.player.room.getChannelName()).emit('SM_Game_State',{type:'start',room:socket.player.room});
			}
			// aconsole.log(io.sockets.in(socket.player.room.getChannelName()));
			io.sockets.in(socket.player.room.getChannelName()).emit('SM_Room_Status',socket.player.room);
		});
		
		/**
		 * THE MSG to request room list
		 */
		socket.on('CM_RoomList_Request',function(data){
			if(!socket.player) return;
//			 console.log(server.roomList);
			socket.emit('SM_RoomList_Response',server.roomList);
			return;
			var result = server.roomList.free [ 0 ].addPlayer( socket.player );
			if(result == true){
				socket.join( server.roomList.free [ 0 ].getChannelName());
				io.sockets.in(socket.player.room.getChannelName()).emit('SM_Room_Status',server.roomList.free [ 0 ]);
			}else{
				socket.emit('SM_Room_Status',{error:"The World you are attempting to join is full or playing."});
			}
			// socket.emit('SM_Room_Status',server.roomList.free [ 0 ]);
			
			// socket.emit('SM_Room_GameStart',{time:new Date()});
		});
		
		
		socket.emit('SM_helloworld', {
			data : "ping"
		});
		socket.on('CM_helloworld', function(data) {

		});
		
		/**
		 * THE MSG to login to an player profile by user_id and login_token
		 */
		socket.on('CM_Login',
				function(data) {
					console.log(" >>> [CM_Login]");
					console.log(data);
					// uid token
					if (typeof data.user_id == "undefined"
							|| typeof data.user_token == "undefined") {
						socket.emit('SM_Login_Response', {
							message : "message_error"
						});
						socket.disconnect();
					}
					
					server.conn.query('SELECT a.* FROM `account` a LEFT JOIN  `logins` l ON a.uid = l.uid WHERE l.uid = ? AND l.token = ?', [data.user_id,data.user_token], function(err, results) {
					try{
						if(results.length > 0){
							 var result = results[0];
							 if(server.playerList[ result.uid ]){
								 	// kick the player offline IF it is already
									// exists on the game server
									 server.playerList[ result.uid ].socket_.disconnect();
									 
										socket.emit('SM_Login_Response', {
											message : "duplicated"
										});
										socket.disconnect();
										return;
								 
							 }
							 console.log(result);
							 if(result.nickname == ''){
								 console.log("<<< request-nickname");
							socket.emit('SM_Login_Response', {
								message : "request-nickname",
								user : result
							 });
								// socket.disconnect();
								 return;
							 }
							 server.playerList [ result.uid ] = new Player({username:result.nickname,user_id: result.uid,socket:socket});
							 socket.player = server.playerList [ result.uid ];	
							 server.socketToplayerList[socket.id] =  server.playerList [ result.uid ] ;
							 socket.emit('SM_Login_Response', {
								message : "success",
								user : server.socketToplayerList[socket.id]
							 });
							
						 }else{
							socket.emit('SM_Login_Response', {
								message : "forbidden"
							});
							socket.disconnect();
						 }
						 
					}catch(e){
							socket.emit('SM_Login_Response', {
								message : "error on loginning in to your account"
							});
							socket.disconnect();
					}
					
					});
					


				});
	});
	this.listeners = [];
};

/**
 * Server onconnection
 * 
 * @param socket
 */
Server.prototype.onconnection = function(socket) {

};

/**
 * Server disconnection
 * 
 * @param socket
 */
Server.prototype.ondisconnection = function(socket) {

};

/**
 * Server register
 * 
 * @param ServerMessageClass
 */
Server.prototype.register = function(ServerMessageClass) {
	// register the Server Message Class to the socket
};
/**
 * Server emit
 * 
 * @param MessageObject
 */
Server.prototype.emit = function(MessageObject) {
	// emit an event described in the Client Message Object
};

module.exports = Server;