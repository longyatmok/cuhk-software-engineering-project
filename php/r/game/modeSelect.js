function transit(id, selector){
	reTransit(selector);
	document.querySelector(id).classList.add('ed');
}
function reTransit(selector){
	var e = document.querySelectorAll(selector);
	for(var i=0;i<e.length; i++){
		e[i].classList.remove('ed');
	}
}