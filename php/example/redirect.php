<?php

/**
 * Redirection of web page
 */
include_once '../library/SocialGateway/Autoloader.php';
SocialGateway_AutoLoader::addDirectory( dirname(__FILE__) .'/../library');
SocialGateway_AutoLoader::getInstance()->registerAutoloader();

#configurate redirect URI
SocialGateway_Core::$redirectURI = 'http://168.70.88.243/tester/social/social-gateway-master/example/redirect.php?provider={service}';

$core = new SocialGateway_Core();
try{
$providerName = $_GET['provider'];
$provider = $core->exchangeAccessToken($_GET['code'], $core->getProvider($providerName));
}catch(Exception $e){
	
	exit( $e->getMessage() );
}
$core->storage->set(SocialGateway_Core::STORAGE_Token, $provider); //A simple SESSION Storage

header("Location: myinfo.php");
exit;
echo 'access token : '.$provider->access_token;
echo '<br>';

$profile =  $core->api(SocialGateway_Core::API_UserInfo, $provider); #example of fetching user's profile

echo 'Name: '.$profile->displayName .' Email: '.$profile->email .' Unique: '.$profile->unique;
