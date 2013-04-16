<?php

/**
 * Accounter of player
 */

class Account{
	const TOKEN_TABLE = 'logins';
	const ACCOUNT_TABLE = 'account';

	/**
	 * Data of player
	 */
	private $isLogin = false;
	private $uid = NULL;
	private $email = NULL;
	private $nickname = NULL;
	private $socialName = NULL;
	private $token = NULL;

	/**
	 * Login
	 * @return boolean result of login(true of false)
	 */
	public function login(){
		$result = false;
		$userInfo = NULL;
		/*		if(isset($_GET['token']) && $_GET['token'] != '' && $this->checkToken($_GET['uid'], $_GET['token'])){
			// if they haven't cookie (optional mode)
		$this->uid = $_GET['uid'];
		$this->token = $_GET['token'];
		$this->extendToken();
		$result = true;
		}else */
		if(isset($_SESSION['uid']) && $_SESSION['uid'] != '' && $this->checkToken($_SESSION['uid'], session_id())){
			// if they have cookie
			$this->uid = $_SESSION['uid'];
			$this->email = $_SESSION['email'];
			$this->nickname = $_SESSION['nickname'];
			$this->socialName = $_SESSION['socialName'];
			if($this->nickname == ''){
				$this->changeNickname();
			}
			$this->token = session_id();
			$this->extendToken();
			$this->isLogin = true;
			$result = true;
		}else if($userInfo = $this->getSocialToken()){
			if($info = $this->getAccount($userInfo['uid'])){
				$this->uid = $userInfo['uid'];
				$this->email = $info['email'];
				$this->socialName = $info['social_name'];
				$this->nickname = $info['nickname'];
				$this->setToken();
				$this->setSession();
				$this->isLogin = true;
				$result = true;
				$this->clearToken(); // clear expire token. for performance, only login via social service will clear token
			}else if($this->createAccount($userInfo['uid'], $userInfo['email'], $userInfo['socialName'])){
				$result = true;
				$this->uid = $userInfo['uid'];
				$this->email = $userInfo['email'];
				$this->socialName = $userInfo['socialName'];
				$this->setToken();
				$this->setSession();
				$this->isLogin = true;
				$result = true;
			}
		}
		return $result;
	}
	/**
	 * Logout
	 */
	public function logout(){
		$this->rmToken();
		$GLOBALS['Session']->delSession();
	}

	/**
	 * changeNickname
	 * @return boolean of success or not
	 */
	public function changeNickname($name){

		$result = false;
		if($name != ''){
			$sql = 'UPDATE `'.self::ACCOUNT_TABLE.'` SET `nickname`=? WHERE `uid`=?';
			$GLOBALS['PDO']->beginTransaction();
			$pS = $GLOBALS['PDO']->prepare($sql);
			$pS->execute(array($name, $this->uid));
			if($pS->rowCount()===1){
				$GLOBALS['PDO']->commit();
				$_SESSION['nickname'] = $name;
				$this->nickname=$name;
				$result = true;
			}
			$GLOBALS['PDO']->inTransaction() && $GLOBALS['PDO']->rollBack() && $result = false;
		}
		return $result;
	}
	/**
	 * Get login URL
	 * @return array $arr of URL
	 */
	public function getLoginWay(){
		// print Login to ? service link
		$arr = array();
		foreach($GLOBALS['SocialProviders'] as $p){
			$arr[] = array('link'=>SocialGateway_Core::authorizationURL($p), 'service'=>$p->getService());
		}
		return $arr;
	}
	/**
	 * Get account UID
	 * @return int UID of account
	 */
	public function getUid(){
		return $this->uid;
	}
	/**
	 * Get account email
	 * @return email of account
	 */
	public function getEmail(){
		return $this->email;
	}
	/**
	 * Get account social name
	 * @return socialName of account
	 */
	public function getSocialName(){
		return $this->socialName;
	}
	/**
	 * Get account nickname
	 * @return nickname of account
	 */
	public function getNickname(){
		return $this->nickname;
	}
	/**
	 * Get account Token
	 * @return int session_id() of account
	 */
	public function getToken(){
		return session_id();
	}
	/**
	 * Get account status(registered or not)
	 * @return nickname of account
	 */
	public function getStatus(){ // just register (false) or already register (true)
		return !!$this->nickname;
	}

	/**
	 * Set account
	 * this {
	 */
	private function setSession(){
		$_SESSION['uid'] = $this->uid;
		$_SESSION['email'] = $this->email;
		$_SESSION['nickname'] = $this->nickname;
		$_SESSION['socialName'] = $this->socialName;
	}
	/**
	 * @throws
	 * Get account social token
	 * @return array() $result of token
	 */
	private function getSocialToken(){
		$token = $GLOBALS['SocialCore']->storage->get(SocialGateway_Core::STORAGE_Token);
		$result = array();
		try{
			if($token){
				$profile =  $GLOBALS['SocialCore']->api(SocialGateway_Core::API_UserInfo, $token);
				$result['socialName'] = $profile->displayName;
				$result['email'] = $profile->email;
				$result['uid'] = $profile->unique;
			}
		}catch(Exception $e){
			//			echo $e->getMessage();
			// error message
		}
		return $result;
	}
	/**
	 * Extend token
	 * @return boolean $result
	 */
	private function extendToken(){
		$sql = 'UPDATE `'.self::TOKEN_TABLE.'` SET `expire`=DATE_ADD(NOW(), INTERVAL ? second) WHERE `uid`=? AND `token`=?';
		$GLOBALS['PDO']->beginTransaction();
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array(SESSION_MAX_AGE, $this->uid, session_id()));
		if($pS->rowCount()===1){
			$GLOBALS['PDO']->commit();
			$result = true;
		}
		$GLOBALS['PDO']->inTransaction() && $GLOBALS['PDO']->rollBack() && $result = false;
		return $result;
	}
	/**
	 * Remove token
	 * @return boolean $result
	 */
	private function rmToken(){
		$sql = 'DELETE FROM `'.self::TOKEN_TABLE.'` WHERE `uid`=? AND `token`=?';
		$GLOBALS['PDO']->beginTransaction();
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($this->uid, session_id()));
		if($pS->rowCount()<=1){
			$GLOBALS['PDO']->commit();
			$result = true;
		}
		$GLOBALS['PDO']->inTransaction() && $GLOBALS['PDO']->rollBack() && $result = false;
		return $result;
	}

	private function clearToken(){
		$sql = 'DELETE FROM `'.self::TOKEN_TABLE.'` WHERE `uid`=? AND NOW() > `expire`';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($this->uid));
		return true;
	}

	/**
	 * Set token
	 * @return boolean $result
	 */
	private function setToken(){
		$result = false;
		$sql = 'INSERT INTO `'.self::TOKEN_TABLE.'` (`uid`, `token`, `expire`, `ip`) VALUE (?, ?, DATE_ADD(NOW(), INTERVAL ? second), ?)';
		$GLOBALS['PDO']->beginTransaction();
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($this->uid, session_id(), SESSION_MAX_AGE,  $_SERVER['REMOTE_ADDR']));
		if($pS->rowCount()===1){
			$GLOBALS['PDO']->commit();
			$result = true;
		}
		$GLOBALS['PDO']->inTransaction() && $GLOBALS['PDO']->rollBack() && $result = false;
		return $result;
	}
	/**
	 * Check token
	 * @param $uid
	 * @param $token
	 * @return boolean $result
	 */
	private function checkToken($uid, $token){
		$isExist = false;
		$result = false;
		$sql = 'SELECT * FROM `'.self::TOKEN_TABLE.'` WHERE `uid`=? AND `token`=?';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($uid, $token));
		while($row = $pS->fetch()){
			if(!$isExist){
				$result = $isExist = true;
			}else{
				// There exists more than one result
				$result = false;
				break;
			}
		}
		return $result;
	}
	/**
	 * Get account
	 * @param $uid
	 * @return $result array
	 */
	private function getAccount($uid){
		$isExist = false;
		$result = false;
		$sql = 'SELECT * FROM `'.self::ACCOUNT_TABLE.'` WHERE `uid`=?';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($uid));
		while($row = $pS->fetch()){
			if(!$isExist){
				$result = $row;
				$isExist = true;
			}else{
				// There exists more than one result
				$result = false;
			}
		}
		return $result;
	}
	/**
	 * Create account
	 * @param $uid
	 * @param $email
	 * @param socialName
	 * @return boolean $result
	 */
	private function createAccount($uid, $email, $socialName){
		$result = false;
		$GLOBALS['PDO']->beginTransaction();
		$sql = 'INSERT INTO `'.self::ACCOUNT_TABLE.'` (`uid`, `email`, `social_name`, `nickname`) VALUE (?, ?, ?, "")';
		$pS = $GLOBALS['PDO']->prepare($sql);
		$pS->execute(array($uid, $email, $socialName));
		if($pS->rowCount()===1){
			$GLOBALS['PDO']->commit();
			$result = true;
		}
		$GLOBALS['PDO']->inTransaction() && $GLOBALS['PDO']->rollBack() && $result = false;
		return $result;
	}
}
