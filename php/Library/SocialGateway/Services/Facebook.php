<?php
/**
 * Facebook OAUTH2 Provider
 * @see https://developers.facebook.com/docs/authentication/server-side/
 * @author NTF
 */
class SocialGateway_Services_Facebook extends SocialGateway_Services_AbstractService{
	
	public $ClientId = SOCI_FB_ID;
	protected $ClientSecret = SOCI_FB_SID;
	public $ServiceName = 'Facebook';
	
	const IDENTIFY = 'Facebook';
	
	public $apis = array(
		SocialGateway_Core::API_Auth => 'https://www.facebook.com/dialog/oauth',
		SocialGateway_Core::API_Code => 'https://graph.facebook.com/oauth/access_token',	
		SocialGateway_Core::API_UserInfo => 'https://graph.facebook.com/me',
		SocialGateway_Core::API_Publish => 'https://graph.facebook.com/me/feed'
	);
	
	public $scopes = array(
		SocialGateway_Core::SCOPE_Profile => '',
		SocialGateway_Core::SCOPE_Email => 'email',
		SocialGateway_Core::SCOPE_Publish =>'publish_actions'
	);

	public function parse($json , $api = null){
		switch($api){
			case SocialGateway_Core::API_UserInfo:	
				return new SocialGateway_Account($json->id,$json->name,$json->email ,$this);
			break;
			case SocialGateway_Core::API_Code:
				parse_str($json, $json);
				$this->access_token = $json['access_token'];
				return $this->access_token;
			break;
		}
	}
	public function prepare($data , $api = null){	
		return $data;
	}
}