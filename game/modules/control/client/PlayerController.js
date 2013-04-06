var util = require('../../../framework/Util');
var AdvancedController = require('../../../framework/controllers/AdvancedController');

/**
 * PlayerController handle user keyboard and mouse input and control the attached GameObject behavior. 
 * inherite from AdvancedController
 * @constructor
 * @this {PlayerController}
 * @param data 
 */

var PlayerController = function (data) {
    this.jumpable = data.jumpable;
};
util.inherits(PlayerController, AdvancedController);
module.exports = PlayerController;