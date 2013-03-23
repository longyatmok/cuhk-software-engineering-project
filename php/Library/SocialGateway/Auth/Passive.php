<?php
/** 
 * Abstract Class of Authentication for your own account system implementation
 *
 */
abstract class SocialGateway_Auth_Passive implements SocialGateway_Auth{
	
	/**
	 * 
	 * SELECT user_id FROM SocialGateway WHERE unique = "{$account->unique}"
	 * @param SocialGateway_Account $account
	 * @return int User ID of your own account system
	 */
	abstract public function getUserId(SocialGateway_Account $account);
		
	/**
	 * 
	 * REPLACE INTO SocialGateway SET unique = "{$account->unique}" , user_id = "{$user_id}"
	 * @param int $user_id
	 * @param SocialGateway_Account $account
	 * @return boolean
	 */
	abstract public function mapUserId($user_id ,SocialGateway_Account $account);
	
	
	/**
	 * DELETE FROM SocialGateway WHERE unique = "{$account->unique}" and user_id = "{$user_id}"
	 * @param int $user_id
	 * @param SocialGateway_Account $account
	 * @return boolean
	 */
	abstract public function unmapUserId($user_id ,SocialGateway_Account $account);
}