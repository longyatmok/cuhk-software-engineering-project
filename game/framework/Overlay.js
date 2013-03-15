/**
 * Game Core
 */
var util = require('./Util');
var $ = require('../vendor/jQuery');

var Overlay = function() {
	this.states = [];
	
	this.add('blank', '<div id="blank" class="overlay"></div>');
	this.add('instruction','<div id="instructions" class="overlay-center"><span style="font-size:40px">Game Start</span></div>')

};

Overlay.prototype.add = function(state, html) {
	this.states[state] = html;
	$('<div id="' + state + '" class="overlay">' + html + '</div>').appendTo(
			Overlay.OVERLAY_SELECTOR);
};


Overlay.prototype.changeState = function(state, data) {
	console.log("change state to "+state);
	for ( var key in this.states) {
		$(Overlay.OVERLAY_SELECTOR).find('#' + key).fadeOut(1000);
	}
	for ( var key in data) {
		$(Overlay.OVERLAY_SELECTOR).find('#' + state + '_' + key).text(
				data[key]);
		// console.log('key:' + key + ' value:' + data[key]);
	}
	
	$(Overlay.OVERLAY_SELECTOR).find('#' + state).fadeIn(2000);
};

Overlay.prototype.visible = function(bool) {
	if (bool == true) {
		$(Overlay.OVERLAY_SELECTOR).show();
	} else {
		$(Overlay.OVERLAY_SELECTOR).hide();
	}
};

Overlay.OVERLAY_SELECTOR = "#overlay";

module.exports = Overlay;