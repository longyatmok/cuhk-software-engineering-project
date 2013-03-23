var util = require('../../../framework/Util');
var FreeGameplay = require('../../../framework/gameplay/FreeGameplay');


var PracticeModeGameplay = function (data) {
    this.timer = data.timer;
};

util.inherits(PracticeModeGameplay, FreeGameplay);
module.exports = PracticeModeGameplay;