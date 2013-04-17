function addRoom(isSpeed, title, scene_id, id, people){
  var newE = document.createElement('div');
  newE.classList.add('room');
	newE.onclick=enterRoom;
  newE.innerHTML = '<div class="sceneImg"><img src="'+Game.scene[scene_id].model_path+'imgs.png"></div>\
										<div class="roomInfo">\
											<div class="roomTitle">'+title+'</div>\
											<div class="roomStatus"><span class="numOfPeople">1</span>/8</div>\
											<span class="id">'+id+'</span>\
										</div>';
  document.querySelector('#'+( isSpeed?'speedRoom':'timeRoom') +' .roomList').insertBefore(newE, document.querySelector('#'+( isSpeed?'speedRoom':'timeRoom') +' .roomList>div'));
  Game.roomlist[isSpeed?'speed':'time'][id] = { 'id': id, 'title': title, 'scene_id':scene_id, 'people':people, 'e':newE};
  return id;  
}
function delRoom(isSpeed, id){
  try{
    document.querySelector('#'+( isSpeed?'speedRoom':'timeRoom') +' .roomList').removeChild(Game.roomList[isSpeed?'speed':'time'][id].e);
    delete Game.roomList[isSpeed?'speed':'time'][id];
  }catch(e){}
}
function changeRoom(isSpeed, id, changeInfo){ // change Info = { 'title': 'str', 'scene_id': int, 'people' : [{'character_id':int, 'nickname':String}]}
  var room = Game.roomList[isSpeed?'speed':'time'][id];
    !!changeInfo.title && (room.title = changeInfo.title) && (room.e.querySelector('.roomTitle').textContent = changeInfo.title);
    !isNaN(Number(changeInfo.scene_id)) && (room.scene_id = changeInfo.scene_id) && (room.e.querySelector('.sceneImg').src = Game.scene[changeInfo.scene_id].model_path+'imgs.png');
    changeInfo.people instanceof Array && changeInfo.people.length <= 8 && (room.people = changeInfo.people);
}
function enterRoom(mode, id){
	var roomInfo = Game.roomList[isSpeed?'speed':'time'][id];
	var e = document.getElementById('room');
	e.querySelector('.title').textContent = 'Room: '+id;
	var people = e.querySelectorAll('.people');
	for(var i=0;i<roomInfo.people.length;i++){
		people[i].querySelector('.name').textContent = roomInfo.people[i].nickname
		people[i].querySelector('.preview').textContent = roomInfo.people[i].nickname
	}
	this.querySelector('.id').textContent;
	showRDiv('room');
}
function newRoom(mode){
	showRDiv('room');
}
/*
Game.roomlist = {
  'speed':{},
  'time':{
    id(int) : {
      'id' : int,
      'title' : str,
      'scene_id' : int,
      'people' : 	[
											{
												'character_id': int,
												'nickname': str,
												'model_id':int
											}
									],
      'e' : HTMLDivElement
    }
  }
}
*/