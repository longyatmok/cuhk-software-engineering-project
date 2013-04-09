<?php
class Scene{
	const TABLE = 'scene_setting';
	private static $Info = false;
	private static $InfoID = false;
	public static function getInfo(){ // use in javascript
		$result = $this->Info ;
		if(!$result){
			$sql = 'SELECT * FROM `'.self::TABLE.'`';
			$pS = $GLOBALS['PDO']->prepare($sql);
			$pS->execute();
		}
		return !$Info ? ($Info = $pS->fetchAll()) : $Info;
	}
	public static function getAllID(){ // use in php
		$result = $this->InfoID ;
		if(!$result){
			$result = array();
			$sql = 'SELECT `scene_id` FROM `'.self::TABLE.'`';
			$pS = $GLOBALS['PDO']->prepare($sql);
			$pS->execute();
			while($row = $pS->fetch){
				$result[] = $row['scene_id'];
			}
		}
		return $result;
	}
}