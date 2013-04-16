var THREE = require('../../vendor/Three');
var util = require('../../../framework/Util');
var GameObject = require('../../../gameobject/GameObject');
var GameObjectManager = require('../../../framework/GameObjectManager');


/**
 * An GameObject to represent a character for gameplay
 * inherited from GameObject
 * @constructor
 * @this {PlayerCharacter}
 * @param data 
 */
var PlayerCharacter = function (data) {
    this.control = data.control;
};
util.inherits(PlayerCharacter, GameObject);
module.exports = PlayerCharacter;