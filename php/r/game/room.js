function reloadRoomList(){
  if(Game.roomlist instanceof Object && Game.roomlist.free instanceof Object){
		for( var i in Game.roomlist.free){
			if(Game.roomlist.free[i] instanceof Object){
				add(Game.roomlist.free[i]);
			}
		}
	}
}
function addRoom(room){
  var newE = document.createElement('div');
  newE.classList.add('room');
  newE.onclick=enterRoom;
	var i=0;
	for(var j in room.people){
		i++;
	}
	//model_path change to hard code link
  newE.innerHTML = '<div class="sceneImg"><img src="gameobjects/test2/preview.png"></div>\
                    <div class="roomInfo">\
                      <div class="roomTitle">'+room.id+'</div>\
                      <div class="roomStatus"><span class="numOfPeople">'+i+'</span>/8</div>\
                      <span class="id">'+room.id+'</span>\
                    </div>';
  document.querySelector('#timeRoom .roomList').insertBefore(newE, document.querySelector('#timeRoom .roomList>div'));
  Game.roomlist.free[id].e = newE;
  return id;
}
function enterRoom(id){
	// ask server enter room
	if(askServerEnterRoom){
		var roomInfo = Game.roomList.free[id];
		var e = document.getElementById('room');
		e.querySelector('.title').textContent = 'Room: '+id;
		var people = e.querySelectorAll('.people');
		for(var i in roomInfo.people){
			if(people[i] instanceof Object){
				people[i].querySelector('.name').textContent = roomInfo.people[i].username;
				people[i].querySelector('.ready.scaleBg').backgroundImage = 'url(img/game/'+(roomInfo.people[i].ready?'':'n')+'ready.png)';
				people[i].querySelector('.preview.scaleBg').backgroundImage = 'url(gameobjects/test2/preview.png)';
			}
		}
		e.querySelector('.info .id').textContent = id;
		e.querySelector('.info .mode').textContent = mode;
		showRDiv('room');
	}
}
function clearRoom(){
  var e = document.getElementById('room');
  var people = e.querySelectorAll('.people');
	var j=0;
  for(var i in people){
		if(roomInfo.people[i] instanceof Object){
			people[j].querySelector('.name').textContent = '';
			people[j].querySelector('.ready.scaleBg').backgroundImage = 'url(img/game/nready.png)';
			
			people[j].querySelector('.preview img').src = 'no one pic'; // change it please
			// hardcode link
			j++;
		}
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
					people[i].querySelector('.preview img').src = 'gameobjects/test2/preview.png';
				}
			}
			e.querySelector('.info .id').textContent = id;
			e.querySelector('.info .mode').textContent = mode;
		}
	}
}
function delRoom(isSpeed, id){
  try{
    document.querySelector('#timeRoom .roomList').removeChild(Game.roomList.free[id].e);
    delete Game.roomList.free[id];
  }catch(e){}
}
function newRoom(mode){
//	if(room = askServerToCreateRoom()){
//		Game.roomlist.free[room.id] = room;
//		addRoom(room);
//	}
  showRDiv('room');
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