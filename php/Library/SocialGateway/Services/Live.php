<?php
/**
 * Windows Live OAUTH2 Provider
 * @see http://msdn.microsoft.com/en-us/library/live/hh243647.aspx
 * @author NTF
 */
class SocialGateway_Services_Live extends SocialGateway_Services_AbstractService{

	public $ClientId = 'YOUR CLIENT ID';
	protected $ClientSecret = 'YOUR CLIENT SECRET';
	public $ServiceName = 'Windows Live';
	const IDENTIFY = 'WL';
	
	public $apis = array(
		SocialGateway_Core::API_Auth => 'https://login.live.com/oauth20_authorize.srf',
		SocialGateway_Core::API_Code => 'https://login.live.com/oauth20_token.srf',	
		SocialGateway_Core::API_UserInfo => 'https://apis.live.net/v5.0/me'
	);
	
	public $scopes = array(
		SocialGateway_Core::SCOPE_Profile => 'wl.basic',
		SocialGateway_Core::SCOPE_Email => 'wl.emails'
	);

	
	public function parse($json , $api = null){
		switch($api){
			case SocialGateway_Core::API_UserInfo:	
		
				return new SocialGateway_Account($json->id,$json->name,$json->emails->preferred ,$this);
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