
var THREE = require('../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('./GameObjectManager');

var TestRegion = function() {
    TestRegion .super_.call(this,{
	id : 'test-region'
    });
    
};
util.inherits(TestRegion, Region);



module.exports = TestRegion;