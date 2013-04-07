<?php
class SocialGateway_Auth_Active implements SocialGateway_Auth{
	
	/**
	 * 
	 * Use unique id as user_id
	 * @param SocialGateway_Account $account
	 * @return int User ID of your own account system
	 */
	public function getUserId(SocialGateway_Account $account){
		return $account->unique;
	}
		
	/**
	 * 
	 * REPLACE INTO SocialGateway SET unique = "{$account->unique}" , user_id = "{$user_id}"
	 * @param int $user_id
	 * @param SocialGateway_Account $account
	 * @return boolean
	 */
	public function mapUserId($user_id ,SocialGateway_Account $account ){
		return false;
	}
	
	
	/**
	 * DELETE FROM SocialGateway WHERE unique = "{$account->unique}" and user_id = "{$user_id}"
	 * @param int $user_id
	 * @param SocialGateway_Account $account
	 * @return boolean
	 */
	abstract public function unmapUserId($user_id ,SocialGateway_Account $account ){
		return false;
	}
	
}