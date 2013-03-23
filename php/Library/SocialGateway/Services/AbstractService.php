<?php
/**
 * Abstract Class of OAUTH2 Providers
 * @author NTF
 *
 */
abstract class SocialGateway_Services_AbstractService{

	public $ClientId = NULL;
	protected $ClientSecret = NULL;
	const IDENTIFY = 'Social-Gateway';
	public $ServiceName = NULL;
	public $ServiceResponseType = 'code';
	
	public $apis = array();
	public $scopes = array();
	
	public $access_token = NULL;
	
	/**
	 * Parse the json response from the service provider according to the api
	 * @param mixed $json
	 * @param string $api API defined in SocialGateway_Core's Constants
	 */
	public function parse($json , $api = null){	
		$this->access_token = $json->access_token;
		return $this;
	}
	/**
	 * Prepare the data post to the service provider according to the api
	 * @param mixed $json
	 * @param string $api API defined in SocialGateway_Core's Constants
	 */
	public function prepare($data , $api = null){	
		return $data;
	}
	
	public function getService(){
		return $this->ServiceName;
	}
	
	public function getApi($name){
		if(isset($this->apis[$name])){
			return $this->apis[$name];
		}
		//it is a unknown api 
		return $name;
	}
	
	final public function getIdentify(){
		$ref = new ReflectionClass( $this);
		return $ref->getConstant('IDENTIFY');
	}
	
	public function getClientSecret(){
		return $this->ClientSecret;
	}
	
	//used in serialization
    public function __sleep()
    {
        return array('access_token'); 
    }
    
    public function __wakeup()
    {
        
    }
}