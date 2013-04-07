<?php
class SocialGateway_AutoLoader{
	protected static $loaded_classes = array();
	/**
	  * Singleton instance
	  */
	protected static $_instance = null;

    /**
     * Singleton pattern implementation makes "clone" unavailable
     *
     * @return void
     */
    protected function __clone()
    {}

    /**
     * Returns an instance of FrameWork Core
     *
     * Singleton pattern implementation
     *
     * @return SocialGateway_AutoLoader Object
     */
    public static function getInstance()
    {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }
    
    static function addDirectory($dir){	
    	set_include_path(get_include_path() . PATH_SEPARATOR .$dir);
    }
    
    function registerAutoloader($func = false){
    	if(!$func) $func = array($this,'_autoloadFunction');
    	spl_autoload_register($func);
    }
    
    function unregisterAutoloader($func = false){
    	if(!$func) $func = array($this,'_autoloadFunction');
    	spl_autoload_unregister($func);
    }
    
    
	function _autoloadFunction($class_name){
		include_once str_replace('_', '/', $class_name).'.php';
		return;
	}
}