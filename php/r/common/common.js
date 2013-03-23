function showRDiv(id){
	hideRDiv();
	document.querySelector('#'+id+'.container').classList.add('show');
}
function hideRDiv(){
	var e=document.querySelectorAll('.container.show');
	for(var i=0;i<e.length;i++){
		e[i].classList.remove('show');
	}
}