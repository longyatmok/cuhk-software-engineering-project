﻿var THREE = require('../../vendor/Three');
var util = require('../../../framework/Util');
var GameObject = require('../../../gameobject/GameObject');
var GameObjectManager = require('../../../framework/GameObjectManager');
var PlayerCharacter = require('./PlayerCharacter');
/**
 * non-player character for NPC use in gameplay
 * inherited from PlayerCharacter
 * @constructor
 * @this {NonPlayerCharacter}
 * @param data 
 */
var NonPlayerCharacter = function (data) {
    this.ai = data.ai;
};
util.inherits(NonPlayerCharacter, PlayerCharacter);
module.exports = NonPlayerCharacter;