	<div class="title"></div>
  <div class="background">
  	<div class="login_title scaleBg"></div>
    <div class="login_service">
<?php
foreach($Account->getLoginWay() as $way){
?>
  <a href="<?php echo $way['link'];?>"><img src="img/account/<?php echo $way['service'];?>.png"></a>

<?php
}
?>
    </div>
	</div>
