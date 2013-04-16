<script src="/r/game/bundle.js" type="text/javascript"></script>

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
	display:none;
}

.overlay {
	width: 100%;
	height: 100%;
	display: none;
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
</style>
</head>
<body>

	<div id="overlay">
		<!-- 	<div class="overlay-center">
		<span style="font-size: 46px;">Start the game</span>
	</div>-->
	</div>
	
	<div id="canvas_container" style="position:absolute;"></div>
<!-- 	<div class="canvas"></div>
	<div class="background"></div> -->