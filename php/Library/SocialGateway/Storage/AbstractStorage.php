<?php

class SocialGateway_Storage_AbstractStorage implements SocialGateway_Storage_StorageInterface{
	
	const CACHE_MODE = 'CacheMode';
	const DATASTORE_MODE = 'DatastoreMode';
	const SESSIONSTORE_MODE = 'SessionStoreMode';
	protected $modes;
	protected $data;
	
	function __construct(){
		$this->modes = array( /*self::CACHE_MODE*/ );
	}
	
	function hasMode($mode){
		return array_search($mode,$this->modes) !== FALSE;
	}
	
	function __get($name){
		return $this->get($name);
	}
	
	function __set($name,$value){
		return $this->set($name, $value);
	}
	
	//Copy below to your code
	function get($name){
		return $this->__isset($name) ? $this->data[$name]['data'] : null;	
	}
	
	function set($name,$value,$expire = 600){
		$this->data[$name] = array('data'=> $value,'lifetime'=> time() + $expire);
	}
	
	function __isset($name){
		return isset($this->data[$name]) && ($this->data[$name]['lifetime'] > time());	
	}
	
	function __unset($name){
		unset($this->data[$name]);
	}
}

interface SocialGateway_Storage_StorageInterface{
	
	function __construct();
	
	function hasMode($mode);
	
	function get($name);
	
	function set($name,$value,$expire = 600);
	
	function __get($name);
	
	function __set($name,$value);
	
	function __isset($name);
	
	function __unset($name);
}