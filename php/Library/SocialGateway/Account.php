<?php
/**
 * Account Model
 */
class SocialGateway_Account{
	public $displayName;
	public $email;
	public $id;
	public $service;
	public $unique;
	
	public function __construct($id,$displayName, $email,SocialGateway_Services_AbstractService $service){
		$this->displayName = $displayName;
		$this->id = $id;
		$this->email = $email;
		$this->service = $service->getIdentify();
		$this->unique = $id.'@'.$this->service;
	}
}