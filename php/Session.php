<?php
class Session{
	public function startSession(){
		loadConfig('Session');
		session_name(SESSION_NAME);
		session_cache_limiter('private');
		session_cache_expire(SESSION_MAX_AGE/60);
		session_set_cookie_params(SESSION_MAX_AGE, '/', '.'.$_SERVER['SERVER_NAME'], false, true);
		session_start();
		$this->extendSession();
	}
	public function extendSession(){
		setcookie(session_name(), session_id(), time() + SESSION_MAX_AGE, "/", $_SERVER['SERVER_NAME'],false,true);	
	}
	public function delSession(){
		session_unset();
		session_destroy();
		setcookie(session_name(), session_id(), time() - 1, "/", $_SERVER['SERVER_NAME'],false,true);
	}
	public function renewSession(){
		$this->delSession();
		$this->startSession();
	}
}