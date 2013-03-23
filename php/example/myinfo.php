<?php
include_once '../library/SocialGateway/Autoloader.php';
SocialGateway_AutoLoader::addDirectory( dirname(__FILE__) .'/../library');
SocialGateway_AutoLoader::getInstance()->registerAutoloader();
#configurate redirect URI
SocialGateway_Core::$redirectURI = 'http://168.70.88.243/tester/social/social-gateway-master/example/redirect.php?provider={service}';

$core = new SocialGateway_Core();

$token = $core->storage->get(SocialGateway_Core::STORAGE_Token);


if($token){
	$profile = $core->api(SocialGateway_Core::API_UserInfo, $token); #example of fetching user's profile
	var_dump($profile);
	echo '<p>Name: '.$profile->displayName .' Email: '.$profile->email .' Unique: '.$profile->unique.'</p>';
}