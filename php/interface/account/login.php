	<div class="title"></div>
  <div class="background">
  	<div class="login_title scaleBg"></div>
    <div class="login_service">
    	<table class="center">
      	<tr>
<?php
foreach($Account->getLoginWay() as $way){
?>
					<td>
            <img onclick="location='<?php echo $way['link'];?>'" src="img/t1x1.png" class="link scaleBg" style="background-image:url(img/account/<?php echo $way['service'];?>.png)">
					</td>
<?php
}
?>
				</tr>
			</table>
    </div>
	</div>
