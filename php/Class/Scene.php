<?php

/**
 * Scene of game
 */

class Scene{

	/**
	 * Data of Scene
	 */
	const TABLE = 'scene_setting';
	private static $Info = false;
	private static $InfoID = false;


	/**
	 * Get info
	 * @return array() self::$Info
	 * @static
	 */
	public static function getInfo(){ // use in javascript
		$result = self::$Info ;
		if(!$result){
			$sql = 'SELECT * FROM `'.self::TABLE.'`';
			$pS = $GLOBALS['PDO']->prepare($sql);
			$pS->execute();
			self::$Info = array();
			while($row = $pS->fetch()){
				self::$Info[$row['scene_id']] = $row;
			}
		}
		return self::$Info;
	}

	/**
	 * @static
	 * Get all ID
	 * @return array() $result
	 */
	public static function getAllID(){ // use in php
		$result = self::$InfoID ;
		if(!$result){
			$result = array();
			$sql = 'SELECT `scene_id` FROM `'.self::TABLE.'`';
			$pS = $GLOBALS['PDO']->prepare($sql);
			$pS->execute();
			while($row = $pS->fetch()){
				$result[] = $row['scene_id'];
			}
			self::$InfoID = $result;
		}
		return $result;
	}
}