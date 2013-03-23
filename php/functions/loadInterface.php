<?php 
function loadInterface($folderName){
	
	// for include use
	foreach($GLOBALS as $key=>$value){
		$$key = $value;
	}
	
	
	$files = glob(INTERFACE_PATH . $folderName . '/*');
	foreach( $files as $file){
?>
	<div id="<?php echo basename($file,'.php');?>" class="container">
<?php
		include($file);
?>
  </div>
<?php
	}
}