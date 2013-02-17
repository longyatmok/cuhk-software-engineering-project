/**
 * Region (Abstract Class)
 */
var THREE = require('../vendor/Three');
var util = require('../Util');
var GameObjectManager = require('./GameObjectManager');
var Field = require('./Field');
var Region = function(opts) {
    opts = World.extend({
	id : '__region' + Region.counter++;
    }, opts);

    this.id = opts.id;
    this.objects = new GameObjectManager();
    
    this.terrain;
    this.scripts;
    this.lights;
};

Region.prototype.attachTo = function(scene) {

    //render items on scene;
    return this;
};

Region.prototype.render = function(dt) {
    this.objects.render( dt );
    
    return this;
};


Region.prototype.toField = function(){
    return new Field( this );
}
Region.counter = 0;


module.exports = Region;