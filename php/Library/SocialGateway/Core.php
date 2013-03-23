<?php
class SocialGateway_Core{

	#Constants
	#Api
	const API_Auth = 'API.AUTH';
	const API_Code = 'API.CODE';
	const API_UserInfo = 'API.USERINFO';
	const API_Publish = 'API.PUBLISH';
	#Scopes
	const SCOPE_Profile = 'SCOPE.PROFILE';
	const SCOPE_Email = 'SCOPE.EMAIL';
	const SCOPE_Publish = 'SCOPE.PUBLISH';
	#Storages
	const STORAGE_Token = 'STORAGE.TOKEN';
	
	protected $providers = array();
	
	/**
	 * 
	 * Redirect URI
	 * set YOUR REDIRECT URI HERE
	 * @var string
	 */
	static public $redirectURI = SOCI_REDIRECT_URL;
	
	/**
	 * Array of DefaultScopes
	 * 
	 * @var array
	 */
	static public $defaultScopes = array(
		SocialGateway_Core::SCOPE_Profile,
		SocialGateway_Core::SCOPE_Email,
		SocialGateway_Core::SCOPE_Publish
	);
	/**
	 * @var SocialGateway_Storage_AbstractStorage
	 */
	public $storage;
	public function __construct(){
		$this->initProviders();
		//$this->setStorage(new SocialGateway_Storage_AbstractStorage());
		//Comment it if you want to use other storage adapter
		$this->setStorage( new SocialGateway_Storage_Session());
	}

	public function getProviders(){
		return $this->providers;
	}
	
	public function getProvider($name){
		return $this->providers[$name];
	}
	
	public function setStorage(SocialGateway_Storage_AbstractStorage $s){
		$this->storage = $s;
	}
	/**
	 * 
	 * To call remote Api and return a standardized data
	 * @param unknown_type $api
	 * @param unknown_type $s
	 */
	public function api( $api ,SocialGateway_Services_AbstractService $s){
		if(!$s->access_token){
			throw new Exception("Access Token is not set");
		}
		return $s->parse(json_decode( file_get_contents($s->getApi($api) .'?access_token='.$s->access_token) ), $api);
	}
	
	public function get( $api ,SocialGateway_Services_AbstractService $s){
		return $this->api($api,$s);
	}
	
	/**
	 * 
	 * Make a 'POST' to the api
	 * @param string $api
	 * @param array $data
	 * @param SocialGateway_Services_AbstractService $s
	 * @throws Exception
	 */
	public function post( $api ,array $data, SocialGateway_Services_AbstractService $s){
		if(!$s->access_token){
			throw new Exception("Access Token is not set");
		}
		
		$client = new Zend_Http_Client( $s->getApi($api) , array('maxredirects' => 1,  'timeout' => 30));
		$client->setMethod(Zend_Http_Client::POST);
		$client->setParameterPost($s->prepare($data,$api));
		$client->setParameterGet(array("access_token"=> $s->access_token));
		$response =  $client->request();
		
		return $s->parse(json_decode($response->getBody()) , $api);
	}
	
	
	protected function initProviders(){
		//Add your providers here
		//comment out if you want to disable it
		$this->providers = array(
			SocialGateway_Services_Google::IDENTIFY => new SocialGateway_Services_Google(),
			SocialGateway_Services_Facebook::IDENTIFY => new SocialGateway_Services_Facebook(),
		//	SocialGateway_Services_Live::IDENTIFY =>new SocialGateway_Services_Live(),
		//	SocialGateway_Services_NTFLAB::IDENTIFY => new SocialGateway_Services_NTFLAB()
		);
	}

	public function registerProvider(SocialGateway_Services_AbstractService $s){
		$this->providers[ $s->getIdentify()] = $s;
	}
	
	public function exchangeAccessToken($code ,SocialGateway_Services_AbstractService $s){
		$client = new Zend_Http_Client( $s->getApi(self::API_Code) , array('maxredirects' => 1,  'timeout' => 30));
		$client->setMethod(Zend_Http_Client::POST);
		$client->setParameterPost(array(
       		"code" => $code,
			"client_id"=>$s->ClientId,
			"client_secret"=>$s->getClientSecret(),
       		"grant_type"=> "authorization_code",
			"redirect_uri"=>self::redirectURL($s)
		));
		$client->setParameterGet(array(
       		"code" => $code,
			"client_id"=>$s->ClientId,
			"client_secret"=>$s->getClientSecret(),
       		"grant_type"=> "authorization_code",
			"redirect_uri"=>self::redirectURL($s)
		));
		$response = $client->request();
		$s->parse($response->getBody() , self::API_Code);
		return $s;
	}

	static public function authorizationURL(SocialGateway_Services_AbstractService $s , $state=null){
		$scopes = array();
		foreach(self::$defaultScopes as $define){
			if(isset($s->scopes[$define])) $scopes[] = $s->scopes[$define];
		}
		
		return $s->getApi(self::API_Auth).'?'.
		http_build_query( array(
			"scope"=>implode(" ",$scopes),
			"state"=>$state,
			"response_type"=>$s->ServiceResponseType,
			"client_id"=>$s->ClientId,
			"redirect_uri"=>self::redirectURL($s)
		));
	}

	static public function redirectURL(SocialGateway_Services_AbstractService $s){
		return str_replace('{service}',$s->getIdentify(), self::$redirectURI);
	}
}

