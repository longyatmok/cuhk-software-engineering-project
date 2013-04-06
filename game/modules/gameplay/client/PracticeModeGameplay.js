var util = require('../../../framework/Util');
var FreeGameplay = require('../../../framework/gameplay/FreeGameplay');

/**
 * Practice Mode is a standalone free mode.
 * inherited from FreeGameplay
 * @constructor
 * @this {PracticeModeGameplay}
 * @param data 
 */
var PracticeModeGameplay = function (data) {
    this.timer = data.timer;
};

util.inherits(PracticeModeGameplay, FreeGameplay);
module.exports = PracticeModeGameplay;