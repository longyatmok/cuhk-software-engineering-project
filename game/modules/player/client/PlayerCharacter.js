var THREE = require('../../vendor/Three');
var util = require('../../../framework/Util');
var GameObject = require('../../../gameobject/GameObject');
var GameObjectManager = require('../../../framework/GameObjectManager');

var PlayerCharacter = function (data) {
    this.control = data.control;
};
util.inherits(PlayerCharacter, GameObject);
module.exports = PlayerCharacter;