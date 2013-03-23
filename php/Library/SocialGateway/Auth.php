<?php
interface SocialGateway_Auth{
	
	public function getUserId(SocialGateway_Account $account);	

	public function mapUserId($user_id ,SocialGateway_Account $account );
	
	public function unmapUserId($user_id ,SocialGateway_Account $account);
}