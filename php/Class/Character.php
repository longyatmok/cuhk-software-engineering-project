<?php
class Character{
	const TABLE = 'character_setting';
	private static $Info = false;
	private static $InfoID = false;
	public static function getInfo(){ // use in javascript
		$result = self::$Info ;
		if(!$result){
			$sql = 'SELECT * FROM `'.self::TABLE.'`';
			$pS = $GLOBALS['PDO']->prepare($sql);
			$pS->execute();
			self::$Info = array();
			while($row = $pS->fetch()){
				self::$Info['character_id'] = $row;
			}
			self::$Info = $pS->fetchAll();
			
		}
		return self::$Info;
	}
	public static function getAllID(){ // use in php
		$result = self::$InfoID;
		if(!$result){
			$result = array();
			$sql = 'SELECT `character_id` FROM `'.self::TABLE.'`';
			$pS = $GLOBALS['PDO']->prepare($sql);
			$pS->execute();
			while($row = $pS->fetch){
				$result[] = $row;
			}
			self::$InfoID = $result;
		}
		return $result;
	}
}