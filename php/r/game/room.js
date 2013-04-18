function reloadRoomList(){
document.querySelector('#timeRoom .roomList').innerHTML='';
  if(Game.roomlist instanceof Object && Game.roomlist.free instanceof Object){
		for( var i in Game.roomlist.free){
			if(Game.roomlist.free[i] instanceof Object){
				addRoom(Game.roomlist.free[i]);
			}
		}
	}
}
function addRoom(room){
  var newE = document.createElement('div');
  newE.classList.add('room');

  newE.onclick=function (){enterRoom(room.id)};

  newE.classList.add('link');

	//model_path change to hard code link
  newE.innerHTML = '<div class="sceneImg scaleBg" style="background-image:url(img/game/map01.png)"><img src="img/t1x1.png"></div>\
                    <div class="roomInfo">\
                      <div class="roomTitle">'+room.id+'</div>\
                      <div class="roomStatus"><span class="numOfPeople">'+Object.keys(room.players).length+'</span>/8</div>\
                      <span class="id">'+room.id+'</span>\
                    </div>';
  document.querySelector('#timeRoom .roomList').insertBefore(newE, document.querySelector('#timeRoom .roomList>div'));
  Game.roomlist.free[room.id].e = newE;
  return room.id;
}
function enterRoom(id){
	// ask server enter room
	console.log("enter room "+id);
	game.modules['Room-Module'].joinRoom({'id':id});
	
}
function renderRoom(id , room){
	
		var roomInfo = room;
		var e = document.getElementById('room');
		e.querySelector('.title').textContent = 'Room: '+id;
		var people = e.querySelectorAll('.people');
		var j=0
		console.log("[RENDER ROOM]");
		clearRoom();
		for(var i in roomInfo.players){
			console.log(i);
			
			if(roomInfo.players[i] instanceof Object){
				console.log(roomInfo.players[i]);
				people[j].querySelector('.name').textContent = roomInfo.players[i].username;
				console.log('url(img/game/'+(roomInfo.players[i].ready?'':'n')+'ready.png)');
				people[j].querySelector('.ready.scaleBg').style.backgroundImage = 'url(img/game/'+(roomInfo.players[i].ready?'':'n')+'ready.png)';
				people[j].querySelector('.preview.scaleBg').style.backgroundImage = 'url(img/game/ch1.png)';
				j++;
			}
		}
		e.querySelector('.info .id').textContent = id;
		e.querySelector('.info .mode').textContent = 'Online';//mode;
		showRDiv('room');
	
}
function clearRoom(){
  var e = document.getElementById('room');
  var people = e.querySelectorAll('.people');
  for(var i=0 ; i < 8; i++){
		
			people[i].querySelector('.name').textContent = '';
			people[i].querySelector('.ready.scaleBg').style.backgroundImage = 'url(img/game/nready.png)';
			
			people[i].querySelector('.preview.scaleBg').style.backgroundImage = 'url(img/game/null.png)'; // change it please
			// hardcode link
			
		
  }
}
function changeRoom(id, changeInfo){ // change Info = { 'title': 'str', 'people' : {user_id:{'user_id':int, 'username':String, 'ready':boolean}}}
  var room = Game.roomList.free[id];
	!!changeInfo.title && (room.title = changeInfo.title) && (room.e.querySelector('.roomTitle').textContent = changeInfo.title);
	if(changeInfo.people instanceof Object && (room.people = changeInfo.people)){
		var e = document.getElementById('room');
		var i=0;
		for(var j in changeInfo.people){
			i++;
		}
		room.e.querySelector('.numOfPeople').textContent = i;
		if(id == Number(e.querySelector('.id').textContent)){
			clearRoom();
			e.querySelector('.title').textContent = 'Room: '+id;
			var people = e.querySelectorAll('.people');
			for(var i in room.people){
				if(people[i] instanceof Object){
					people[i].querySelector('.name').textContent = room.people[i].username;
					people[i].querySelector('.ready.scaleBg').backgroundImage = 'url(img/game/'+(room.people[i].ready?'':'n')+'ready.png)';
					people[i].querySelector('.preview img').src = 'img/game/ch1.png';
				}
			}
			e.querySelector('.info .id').textContent = id;
			e.querySelector('.info .mode').textContent = mode;
		}
	}
}
function delAll(){
	var e = document.querySelector('#timeRoom .roomList').innerHTML='';
}
function delRoom(isSpeed, id){
  try{
    document.querySelector('#timeRoom .roomList').removeChild(Game.roomList.free[id].e);
    delete Game.roomList.free[id];
  }catch(e){}
}
function newRoom(mode){
	game.modules['Room-Module'].newRoom({region_id:'test2'});
//	if(room = askServerToCreateRoom()){
//		Game.roomlist.free[room.id] = room;
//		addRoom(room);
//	}
// showRDiv('room');
}
/*
Game.roomlist = {
	'speed':{},
	'free':{
		id(int) : {
			'id' : int,
			'region' : str,
			'people' : {
				user_id:{
					'ready' : boolean,
					'user_id': int,
					'username': str,
				
				}
			},
			'e' : HTMLDivElement
		}
	}
}
*/