var util = require('../../../framework/Util');
var NetworkGameplay = require('../../../framework/gameplay/NetworkGameplay');


var FreeModeGameplay = function (data) {
    this.height = data.height;
    this.timer = data.timer;
};

util.inherits(FreeModeGameplay, NetworkGameplay);
module.exports = FreeModeGameplay;