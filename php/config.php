<?php
error_reporting(E_ERROR);
// System
define('SYSTEM', 'totheskies'); // check valid get page

// system path
define('INTERFACE_PATH', 'interface/');
define('RESOURCES_PATH', 'r/');
// System End

// Database
	define('DB_NAME', 'totheskies');
if(gethostbyaddr('127.0.0.1') == 'alpha.ntflab.com'){
	define('DB_HOST', '127.0.0.1');
	//define('DB_HOST', 'allenp.tk');
	define('DB_USER', 'site');
	define('DB_PW', 'sitepassword');
}else{
	define('DB_HOST', '127.0.0.1');
	define('DB_USER', 'csci3100');
	define('DB_PW', '0102030405');
}

	


define('DB_DRIVE', 'mysql:dbname='.DB_NAME.';host='.DB_HOST);
// not yet use, modify it
// Database End

// Session
define('SESSION_NAME', 'csci3100');			// session name
define('SESSION_MAX_AGE', 1*24*60*60); // login maximun time limit
// Session End


// Social Plugin
// Core Setting
if(gethostbyaddr('127.0.0.1') == 'alpha.ntflab.com'){
define('SOCI_REDIRECT_URL', 'http://totheskies.dev/?provider={service}');

// facebook
define('SOCI_FB_ID', '635731566441344');
define('SOCI_FB_SID', 'e5b4b0116380f5e6c6aa318dc44620a0');

// google
define('SOCI_GL_ID', '');
define('SOCI_GL_SID', '');
// Social Plugin end
}else{
define('SOCI_REDIRECT_URL', 'http://www.allenp.tk/csci3100/php/?provider={service}');
// facebook
define('SOCI_FB_ID', '193856597405277');
define('SOCI_FB_SID', 'ae0f96acbea1250331760c0a482d488f');

// google
define('SOCI_GL_ID', '');
define('SOCI_GL_SID', '');
// Social Plugin end
}
