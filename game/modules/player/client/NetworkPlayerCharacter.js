var THREE = require('../../vendor/Three');
var util = require('../../../framework/Util');
var GameObject = require('../../../gameobject/GameObject');
var GameObjectManager = require('../../../framework/GameObjectManager');
var PlayerCharacter = require('./PlayerCharacter');


/**
 * NetworkPlayerCharacter is a PlayerCharacter for player uses in gameplay
 * inherited from PlayerCharacter
 * @constructor
 * @this {NetworkPlayerCharacter}
 * @param data 
 */
var NetworkPlayerCharacter = function (data) {
    this.id = data.id;
    this.name = data.name;
};
util.inherits(NonPlayerCharacter, PlayerCharacter);

NetworkPlayerCharacter.prototype.getName = function () {
};

NetworkPlayerCharacter.prototype.update = function () {
};

module.exports = NetworkPlayerCharacter;