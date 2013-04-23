<?php
/**
 * index of web
 */
include_once '../library/SocialGateway/Autoloader.php';
SocialGateway_AutoLoader::addDirectory( dirname(__FILE__) .'/../library');
SocialGateway_AutoLoader::getInstance()->registerAutoloader();
#configurate redirect URI
SocialGateway_Core::$redirectURI = 'http://168.70.88.243/tester/social/social-gateway-master/example/redirect.php?provider={service}';

$core = new SocialGateway_Core();


$providers = $core->getProviders();

// print Login to ? service link
foreach($providers as $key => $p){
	echo '<a href="'.SocialGateway_Core::authorizationURL($p) .'">'.$p->getService().'</a> ';			
}
// end 
$token = $core->storage->get(SocialGateway_Core::STORAGE_Token);
try{
	if($token){
		$profile =  $core->api(SocialGateway_Core::API_UserInfo, $token); #example of fetching user's profile
		echo '<p>Name: '.$profile->displayName .' Email: '.$profile->email .' Unique: '.$profile->unique.'</p>';
	}
}catch(Exception $e){
	echo $e->getMessage();
}
?>
<script>
window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '193856597405277', // App ID from the App Dashboard
      channelUrl : '//168.70.88.243/tester/social/social-gateway-master/example/', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

    // Additional initialization code such as adding Event Listeners goes here

  };
</script>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_HK/all.js#xfbml=1&appId=193856597405277";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div class="fb-like" data-href="http://168.70.88.243/tester/social/social-gateway-master/example/" data-send="false" data-width="450" data-show-faces="true" data-font="arial"></div>
<div class="fb-shared-activity" data-width="300" data-height="300"></div>
<script>
function postToFeed() {

	// calling the API ...
	var obj = {
	  method: 'feed',
	  redirect_uri: 'http://168.70.88.243/tester/social/social-gateway-master/example/redirect.php?provider=Facebook',
	  link: 'https://developers.facebook.com/docs/reference/dialogs/',
	  picture: 'http://www.farhanadhalla.com/wp-content/uploads/2010/06/jump-for-joy.jpg',
	  name: 'Jump!!',
	  caption: 'Come on!!',
	  description: 'I can reach 1m.'
	};

	function callback(response) {
	  document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
	}

	FB.ui(obj, callback);
  }

</script>