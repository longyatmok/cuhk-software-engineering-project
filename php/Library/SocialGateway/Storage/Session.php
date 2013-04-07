<?php
class SocialGateway_Storage_Session extends SocialGateway_Storage_AbstractStorage{
	function __construct(){
		session_start();
		$this->modes = array(  self::SESSIONSTORE_MODE, self::CACHE_MODE );
	}
	
	function get($name){
		if(!isset($_SESSION[$name])) return false;
		return unserialize($_SESSION[$name]['data']);
	}
	
	function set($name,$value,$expire = 600){
		$_SESSION[$name] =  array('data'=>serialize($value),'lifetime'=> time() + $expire);
		
	}
	
	function __isset($name){
		return isset($_SESSION[$name]) && (	$_SESSION[$name]['lifetime'] > time());	
	}
	
	function __unset($name){
		unset($_SESSION[$name]);
	}
}