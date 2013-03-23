var util = require('../../../framework/Util');
var NetworkGameplay = require('../../../framework/gameplay/NetworkGameplay');


var SpeedModeGameplay = function (data) {
    this.timer = data.timer;
};

util.inherits(SpeedModeGameplay, NetworkGameplay);
module.exports = SpeedModeGameplay;