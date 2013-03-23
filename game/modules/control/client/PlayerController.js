var util = require('../../../framework/Util');
var AdvancedController = require('../../../framework/controllers/AdvancedController');

var PlayerController = function (data) {
    this.jumpable = data.jumpable;
};
util.inherits(PlayerController, AdvancedController);
module.exports = PlayerController;