<?php
/**
 * Example OAUTH2 Provider
 * @author NTF
 */
class SocialGateway_Services_NTFLAB extends SocialGateway_Services_AbstractService{

	public $ClientId = 'YOUR CLIENT ID';
	protected $ClientSecret = 'YOUR CLIENT SECRET';
	public $ServiceName = 'NTF LAB';
	const IDENTIFY = 'ntflab';
	
	public $apis = array(
		SocialGateway_Core::API_Auth => 'http://www.alpha.ntflab.com/api/oauth/authorize',
		SocialGateway_Core::API_Code => 'http://www.alpha.ntflab.com/api/oauth/token',	
		SocialGateway_Core::API_UserInfo => 'http://alpha.ntflab.com/api/me'
	);
	
	public $scopes = array(
		SocialGateway_Core::SCOPE_Profile => '',
		SocialGateway_Core::SCOPE_Email => 'email'
	);
	
	public function parse($json , $api = null){
		switch($api){
			case SocialGateway_Core::API_UserInfo:	
	
				return new SocialGateway_Account($json->id,$json->displayName,$json->email ,$this);
			break;
			case SocialGateway_Core::API_Code:
				$json = json_decode($json);
				$this->access_token = $json->access_token;
				return $this->access_token;
			break;
		}
	}
	
	public function prepare($data , $api = null){	
		return $data;
	}
}