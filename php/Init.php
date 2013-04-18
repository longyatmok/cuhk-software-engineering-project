<?php

// browser cache control
header( 'Expires: Sat, 26 Jul 1997 05:00:00 GMT' ); 
header( 'Last-Modified: ' . gmdate( 'D, d M Y H:i:s' ) . ' GMT' ); 
header( 'Cache-Control: no-store, no-cache, must-revalidate' ); 
header( 'Cache-Control: post-check=0, pre-check=0', false ); 
header( 'Pragma: no-cache' );

// browser cache control end

// load config file
require_once('CONFIG.php');
// load config file end

// load function
	$files = glob('functions/*');
	foreach( $files as $file){
		require_once($file);
	}
// load function end

// load class
	$files = glob('Class/*');
	foreach( $files as $file){
		require_once($file);
	}
// load class end

// session control
$Session = new Session();
// session control end


// Database control
$PDO = new PDO(DB_DRIVE, DB_USER, DB_PW);
$PDO->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
$PDO->exec("SET CHARACTER SET utf8");
// Database control end


// social networking service connection setting

include_once 'Library/SocialGateway/Autoloader.php';
SocialGateway_AutoLoader::addDirectory( dirname(__FILE__) .'/library');
SocialGateway_AutoLoader::getInstance()->registerAutoloader();
#configurate redirect URI
// SocialGateway_Core::$redirectURI = SOCI_REDIRECT_URL; // hard code in SocialGateway_Core // config in config file
$SocialCore = new SocialGateway_Core();
$SocialProviders = $SocialCore->getProviders();

// social networking service connection setting end



// social networking service get access token
if(isset($_GET['provider']) && !!$_GET['provider']){
	try{
		$SocialProvider = $SocialCore->exchangeAccessToken($_GET['code'], $SocialCore->getProvider($_GET['provider']));
	}catch(Exception $e){
		exit( $e->getMessage() );
	}
	$SocialCore->storage->set(SocialGateway_Core::STORAGE_Token, $SocialProvider); //A simple SESSION Storage
	
	die('<script>location="?";</script>');
}

// social networking service get access token end

$Account = new Account();
