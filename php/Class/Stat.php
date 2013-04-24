<?php

/**
 * Statistic of game
 */
class Stat{

	/**
	 * Data of stat
	 */
	const TABLE = 'record';

	/**
	 * Get stat history
	 * @return $pS->fetchAll(PDO::FETCH_COLUMN)
	 * @static
	 */
	public static function getHistory(){
		$sql = 'SELECT `rank`, `height`, `time` FROM `'.self::TABLE.'` WHERE `uid`=? ORDER BY `record_time` DESC LIMIT 0,20';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($GLOBALS['Account']->getUid()));
		return $pS->fetchAll(PDO::FETCH_COLUMN);
	}

	/**
	 * Get rank list
	 * @return array $result
	 * @static
	 */
	public static function getSelfRankList(){
		$result = array();
		$sql = 'SELECT `rank`, COUNT(`rank`) as `rankCount` FROM `'.self::TABLE.'` WHERE `uid`=? GROUP BY `rank` ORDER BY `rank` ASC LIMIT 0,8'; // only 8 rank
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($GLOBALS['Account']->getUid()));
		while(($row = $pS->fetch()) !== false){
			$result[$row['rank']] = $row['rankCount'];
		}
		return $result;
	}

	/**
	 * Get height
	 * @return $pS->fetchAll()
	 * @static
	 */
	public static function getSelfHeightList(){
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `uid`=? AND `mode`=\'free\' ORDER BY `height` DESC LIMIT 0,10';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($GLOBALS['Account']->getUid()));
		return $pS->fetchAll();
	}

	/**
	 * Get time list
	 * @return $pS->fetchAll()
	 * @static
	 */
	public static function getSelfTimeList(){
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `uid`=? AND `mode`=\'speed\' ORDER BY `time` DESC LIMIT 0,10';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($GLOBALS['Account']->getUid()));
		return $pS->fetchAll();
	}

	/**
	 * Get highest
	 * @return $pS->fetch()
	 * @static
	 */
	public static function getSelfHighest($needTop10 = false){
		$sql1 = (!!$needTop10) ? ', `'.self::TABLE.'` as `b`' : '';
		$sql2 = (!!$needTop10) ? ' AND `b`.`height` < `a`.`height` HAVING COUNT(`b`.`height`)>10' : '';
		$sql = 'SELECT `a`.* FROM `'.self::TABLE.'` as `a`'.$sql1.' WHERE `a`.`uid`=? AND `a`.`mode`=\'free\''.$sql2.' ORDER BY `a`.`height` DESC LIMIT 0,1';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($GLOBALS['Account']->getUid()));
		return $pS->fetch();
	}

	/**
	 * Get highest
	 * @return $pS->fetch()
	 * @static
	 */
	public static function getSelfFastest($needTop10 = false){
		$sql1 = (!!$needTop10) ? ', `'.self::TABLE.'` as `b`' : '';
		$sql2 = (!!$needTop10) ? ' AND `b`.`time` < `a`.`time` HAVING COUNT(`b`.`time`)>10' : '';
		$sql = 'SELECT `a`.* FROM `'.self::TABLE.'` as `a`'.$sql1.' WHERE `a`.`uid`=? AND `a`.`mode`=\'free\''.$sql2.' ORDER BY `a`.`time` DESC LIMIT 0,1';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($GLOBALS['Account']->getUid()));
		return $pS->fetch();
	}

	/**
	 * Get global highest
	 * @return $pS->fetch()
	 * @static
	 */
	public static function getGlobalHeight(){ // show top ten in the world
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `mode`=\'free\' ORDER BY `time` DESC LIMIT 0,10';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute();
		$result = $pS->fetchAll();
		if(($row = self::getSelfHighest(true)) !== false){
			$result[] = $row;
		}
		return $result;
	}

	/**
	 * Get global time
	 * @return $pS->fetchAll() $result
	 * @static
	 */
	public static function getGlobalTime(){ // show top ten in the world
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `mode`=\'speed\' ORDER BY `time` DESC LIMIT 0,10';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute();
		$result = $pS->fetchAll();
		if(($row = self::getSelfFastest(true)) !== false){
			$result[] = $row;
		}
		return $result;
	}
	
	
	/**
	 * Get scene rank list
	 * @return array $result
	 * @static
	 */
	
	public static function getSceneSelfRankList(){
		$result = array();
		$sql = 'SELECT `scene_id`, `rank`, COUNT(`rank`) as `rankCount` FROM `'.self::TABLE.'` WHERE `uid`=? GROUP BY `scene_id`, `rank` ORDER BY `rank` ASC LIMIT 0,8'; // only 8 rank
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($GLOBALS['Account']->getUid()));
		while(($row = $pS->fetch()) !== false){
			is_array($result[$row['scene_id']]) || $result[$row['scene_id']] = array();
			$result[$row['scene_id']][$row['rank']] = $row['rankCount'];
		}
		return $result;
	}


	/**
	 * Get scene history
	 * @return array $result
	 * @static
	 */
	public static function getSceneHistory(){
		$result = array();
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `uid`=? ORDER BY `record_time` DESC LIMIT 0,20';
		$pS = $GLOBALS['PDO']->prepare($sql);
		foreach(Scene::getAllID() as $sceneID){
			$pS->execute(array($GLOBALS['Account']->getUid(), $sceneID));
			$result[$sceneID] = $pS->fetchAll();
		}
		return $result;
	}

	/**
	 * Get scene height list
	 * @return array $result
	 * @static
	 */
	public static function getSceneSelfHeightList(){
		$result = array();
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `uid`=? AND `mode`=\'free\' AND `scene_id`=? ORDER BY `height` DESC LIMIT 0,10';
		$pS = $GLOBALS['PDO']->prepare($sql);
		foreach(Scene::getAllID() as $sceneID){
			$pS->execute(array($GLOBALS['Account']->getUid(), $sceneID));
			$result[$sceneID] = $pS->fetchAll();
		}
		return $result;
	}

	/**
	 * Get scene time list
	 * @return array $result
	 * @static
	 */
	public static function getSceneSelfTimeList(){
		$result = array();
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `uid`=? AND `mode`=\'speed\' AND `scene_id`=? ORDER BY `time` DESC LIMIT 0,10';
		$pS = $GLOBALS['PDO']->prepare($sql);
		foreach(Scene::getAllID() as $sceneID){
			$pS->execute(array($GLOBALS['Account']->getUid(), $sceneID));
			$result[$sceneID] = $pS->fetchAll();
		}
		return $result;
	}

	/**
	 * Get scene highest
	 * @return array $result
	 * @static
	 */
	public static function getSceneSelfHighest($needTop10 = false){
		$result = array();
		$sql1 = (!!$needTop10) ? ', `'.self::TABLE.'` as `b`' : '';
		$sql2 = (!!$needTop10) ? ' AND `b`.`height` < `a`.`height` HAVING COUNT(`b`.`height`)>10' : '';
		$sql = 'SELECT `a`.* FROM `'.self::TABLE.'` as `a`'.$sql1.' WHERE `a`.`uid`=? AND `a`.`mode`=\'free\' AND `scene_id`=?'.$sql2.' ORDER BY `a`.`height` DESC LIMIT 0,1';
		$pS = $GLOBALS['PDO']->prepare($sql);
		foreach(Scene::getAllID() as $sceneID){
			$pS->execute(array($GLOBALS['Account']->getUid(), $sceneID));
			$result[$sceneID] = $pS->fetch();
		}
		return $result;
	}

	/**
	 * Get scene fastest
	 * @return array $result
	 * @static
	 */
	public static function getSceneSelfFastest($needTop10 = false){
		$result = array();
		$sql1 = (!!$needTop10) ? ', `'.self::TABLE.'` as `b`' : '';
		$sql2 = (!!$needTop10) ? ' AND `b`.`time` < `a`.`time` HAVING COUNT(`b`.`time`)>10' : '';
		$sql = 'SELECT `a`.* FROM `'.self::TABLE.'` as `a`'.$sql1.' WHERE `a`.`uid`=? AND `a`.`mode`=\'free\' AND `scene_id`=?'.$sql2.' ORDER BY `a`.`time` DESC LIMIT 0,1';
		$pS = $GLOBALS['PDO']->prepare($sql);
		foreach(Scene::getAllID() as $sceneID){
			$pS->execute(array($GLOBALS['Account']->getUid(), $sceneID));
			$result[$sceneID] = $pS->fetch();
		}
		return $result;
	}

	/**
	 * Get scene global height
	 * @return array $result
	 * @static
	 */
	public static function getSceneGlobalHeight(){ // show top ten in the world
		$result = array();
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `mode`=\'free\' AND `scene_id`=? ORDER BY `time` DESC LIMIT 0,10';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$sceneR = self::getSceneSelfHighest(true);
		foreach(Scene::getAllID() as $sceneID){
			$pS->execute(array($sceneID));
			$result[$sceneID] = $pS->fetchAll();
			if($sceneR[$sceneID] !== false){
				$result[$sceneID][] = $sceneR[$sceneID];
			}
		}
		return $result;
	}

	/**
	 * Get scene global time
	 * @return array $result
	 * @static
	 */
	public static function getSceneGlobalTime(){ // show top ten in the world
		$result = array();
		$sql = 'SELECT * FROM `'.self::TABLE.'` WHERE `mode`=\'speed\' AND `scene_id`=? ORDER BY `time` DESC LIMIT 0,10';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$sceneR = self::getSceneSelfHighest(true);
		foreach(Scene::getAllID() as $sceneID){
			$pS->execute(array($sceneID));
			$result[$sceneID] = $pS->fetchAll();
			if($sceneR[$sceneID] !== false){
				$result[$sceneID][] = $sceneR[$sceneID];
			}
		}
		return $result;
	}
}