<?php 

function loadRes($folderName){
	$files = glob( RESOURCES_PATH . $folderName . '/*');
	foreach( $files as $file){
		$fileInfo = pathinfo($file);
		if($fileInfo['extension']=='js'){
?>
		<script src="<?php echo $file; ?>" type="text/javascript"></script>

<?php
		}else if($fileInfo['extension'] == 'css'){
?>
		<link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" type="text/javascript">

<?php
		}
	}
}