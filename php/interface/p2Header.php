
<style type="text/css">
html,body {
	width: 100%;
	height: 100%;
}

body {
	background-color: #ffffff;
	margin: 0;
	overflow: hidden;
	font-family: arial;
}

#overlay {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	z-index: 10;
	/*display:none;*/
}

.overlay {
	width: 100%;
	height: 100%;
	display: none;
	opacity :1;
}

.overlay-center {
	width: 100%;
	height: 100%;
	display: -webkit-box;
	display: -moz-box;
	display: box;
	-webkit-box-orient: horizontal;
	-moz-box-orient: horizontal;
	box-orient: horizontal;
	-webkit-box-pack: center;
	-moz-box-pack: center;
	box-pack: center;
	-webkit-box-align: center;
	-moz-box-align: center;
	box-align: center;
	color: #ffffff;
	text-align: center;
	cursor: pointer;
}

#loginimg {
	position: absolute;
	top: 500px;
	z-index: 2;
	position: absolute;
	left: 40%;
}

.title img {
	position: absolute;
	top: 10%;
	left: 15%
}

.bg_box img {
	position: absolute;
	top: 350px;
	left: 10%;
	z-index: -1;
	opacity: 0.7;
}

#Room-Module-RoomList #Room-Module-RoomList_list {
	position: absolute;
	top: 53%;
	left: 47%;
	height: 240px;
	overflow-y: auto
}

#Room-Module-RoomList table {
	border: 5px;
}

#Room-Module-RoomList td {
	text-align: left;
	width: 350px;
	height: 40px;
	border: 5px;
	background-color: #E2E7E7;
	padding: 10px;
	font-size: 30px
}

#Room-Module-RoomList img.head {
	width: 55px;
	height: 270px;
	background: url("ui_im/selectionbox.png") 0 -30px;
}

#Room-Module-Room .title img {
	position: absolute;
	top: 10%;
	left: 15%;
}

#Room-Module-Room .bg_box img {
	position: absolute;
	top: 200px;
	left: 10%;
	z-index: -1;
	opacity: 0.7;
}

#Room-Module-Room table {
	position: absolute;
	top: 270px;
	left: 18%;
	border: 5px;
}

#Room-Module-Room table img {
	float: left;
}

#Room-Module-Room table span.user {
	font-size: 30px;
	padding-left: 10px;
	line-height: 50px;
	float: left;
}

#Room-Module-Room td {
	text-align: left;
	width: 350px;
	height: 70px;
	border: 5px;
	background-color: #E2E7E7;
	padding: 5px;
}
/* Header */
.header.nav {
	background-color:#2D2D2D;
	border-bottom:1px solid #CCC;
	height:30px;
}
.header.navback {
	display:none; /* for fixed header bar */
	height: 30px;
}
.header.nav, .header.nav a{
	color:#CCC;
	text-decoration:none !important
}
.header.nav .brand {
	font-weight:bold;
	font-size:25px;
}

.header .menu {
	float:left;
	height:30px;	
}
.header .menu.right {
	padding:0;
	float:right;
	/*overflow: hidden;*/
}
.header .menu ul {
	display:inline-block;
	list-style:none;
	padding:0;
	margin:0;
	font-size:13px;
}
.header .menu li {
	float:left;
	line-height:28px;
	position:relative;
	white-space:nowrap;
}
.header .menu li span {
	display:inline-block;
	position:relative;
	z-index:10;
	padding:0px 5px 0;
	white-space:nowrap;
	border-top:2px solid transparent;
	border-left:1px solid transparent;
	border-right:1px solid transparent;
}

.header .menu li span.current {
	border-top:2px solid #1CBBC9 !important;
	padding-top:0;
}
/* onmouseover */
.header .menu li.info:hover {
	background-color:transparent!important;
}
.header .menu li:hover {
	background-color:#4C4C4C;
}
.header .menu .ui-dropdown-active span {
	border-left: 1px solid #CCC;
	border-right: 1px solid #CCC;
	/*border-top: 2px solid transparent;*/
	/*padding-top:2px;*/
	position: relative;
	z-index: 10;
	background: white;
}

.header .menu li .ui-dropdown {
	top: 29px !important;
}
/* FIX AT 23-12-2011 */
.header .menu ul ul a{
	color:#3366CC;
}
.header .menu .ui-dropdown-active ,.header .menu .ui-dropdown-active a{
	color:#3366CC;
}

.header .menu li ul li , .ui-dropdown ul li{
	float:none;
	padding:0;
	margin:0;
	line-height: 28px;
	position:relative;
}

.header .menu li ul li span , .ui-dropdown ul li span{
	display:inline-block;
	position:relative;
	padding:0;
	background-color:white;
	border:0;
}

/* End of Menu */
</style>

</head>
<body>

	<div id="overlay">
		<!-- 	<div class="overlay-center">
		<span style="font-size: 46px;">Start the game</span>
	</div>-->
	</div>
	
	<div id="canvas_container" style="position:absolute;"></div>

	<div class="header nav">
	<div class="">

		<div class="menu">
	<ul>
		<li><span>TO THE SKIES</span></li>	

				
			</ul>
</div>

<div class="menu right">
	<ul>
<?php if($Account->login()){ ?>
	<li><span><?=$Account->getNickname()?> ( <?=$Account->getSocialName()?> )</span></li>
	<li><a href="?logout=true" style="text-decoration: none; color: rgb(14, 93, 136);"><span>Logout</span></a></li>
<?php }else{ ?>
	<li><span>Not Logined In</span></li>

<?php }?>
	<li><a href="https://www.facebook.com/dialog/apprequests?app_id=635731566441344&message=Let's%20play%20To%20The%20Skies!&redirect_uri=http://totheskies.dev/"><span>Invite Friends on Facebook</span></a></li></ul>
</div>

		<span class="status" style="color: rgb(255, 255, 255); font-weight: bold; float: right; font-size: 12px; margin: 2px 15pt 0pt;"></span>
		<div class="clear">
		</div>
	</div>
</div>
	
	
<!-- 	<div class="canvas"></div>
	<div class="background"></div> -->
