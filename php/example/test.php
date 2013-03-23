<?php
include_once '../library/SocialGateway/Autoloader.php';
SocialGateway_AutoLoader::addDirectory( dirname(__FILE__) .'/../library');
SocialGateway_AutoLoader::getInstance()->registerAutoloader();

#configurate redirect URI
SocialGateway_Core::$redirectURI = 'http://168.70.88.243/tester/social/social-gateway-master/example/redirect.php?provider={service}';

$core = new SocialGateway_Core();
$access = $core->storage->get(SocialGateway_Core::STORAGE_Token);
if($access->getIdentify == 'Facebook'){
	#example of posting message to user's wall
	var_export($core->post(SocialGateway_Core::API_Publish, array('message'=>'Testing!'), $access));
}else{
	exit('Not Facebook');
}