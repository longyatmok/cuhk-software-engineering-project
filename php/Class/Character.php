<?php

/**
 * Character
 */

class Character{

	/**
	 * Data of Character
	 */
	const TABLE = 'character_setting';
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
				self::$Info[$row['character_id']] = $row;
			}
		}
		return self::$Info;
	}

	/**
	 * Get all ID
	 * @return array() $result
	 * @static
	 */
	public static function getAllID(){ // use in php
		$result = self::$InfoID;
		if(!$result){
			$result = array();
			$sql = 'SELECT `character_id` FROM `'.self::TABLE.'`';
			$pS = $GLOBALS['PDO']->prepare($sql);
			$pS->execute();
			while($row = $pS->fetch()){
				$result[] = $row;
			}
			self::$InfoID = $result;
		}
		return $result;
	}
}