<?php
/**
 * Google OAUTH2 Provider
 * @see https://developers.google.com/accounts/docs/OAuth2Login
 * @author NTF
 */
class SocialGateway_Services_Google extends SocialGateway_Services_AbstractService{

	public $ClientId = SOCI_GL_ID;
	protected $ClientSecret = SOCI_GL_SID;
	public $ServiceName = 'Google';
	const IDENTIFY = 'Google';

	public $apis = array(
		SocialGateway_Core::API_Auth => 'https://accounts.google.com/o/oauth2/auth',
		SocialGateway_Core::API_Code => 'https://accounts.google.com/o/oauth2/token',	
		SocialGateway_Core::API_UserInfo => 'https://www.googleapis.com/oauth2/v1/userinfo'
	);
	
	public $scopes = array(
		SocialGateway_Core::SCOPE_Profile => 'https://www.googleapis.com/auth/userinfo.profile',
		SocialGateway_Core::SCOPE_Email => 'https://www.googleapis.com/auth/userinfo.email'
	);

	
	public function parse($json , $api = null){
		switch($api){
			case SocialGateway_Core::API_UserInfo:		
				return new SocialGateway_Account($json->id,$json->name,$json->email ,$this);
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