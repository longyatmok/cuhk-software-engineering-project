// testing file
var $ = require('./vendor/jquery');
var THREE = require('./vendor/Three');
var THREEx		= THREEx 		|| {};
THREEx.FullScreen = require('./vendor/THREEx/FullScreen');
THREE.TrackballControls = require('./vendor/THREE/TrackballControls');
THREEx.WindowResize = require('./vendor/THREEx/WindowResize');
$(document).ready(function(){

var $container = $('#canvas_container');
/*var scene, renderer,
geometry, material, mesh,controls;*/

exports.init = function() {

    scene = new THREE.Scene();
 // camera = new THREE.CombinedCamera( window.innerWidth / 2, window.innerHeight / 2, 70, 1, 1000,  0.01, 10000 );
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.x  = 270;
    camera.position.y = 330;
    camera.position.z = 396;
    
   
    scene.add( camera );
    // camera2 = new THREE.OrthographicCamera();
    camera2 = new THREE.PerspectiveCamera( 75,200 / 200, 0.1, 10000 );
    camera2.position.z = 300;
    
      
    scene.add( camera2 );
	controls = new THREE.TrackballControls( camera );

	controls.rotateSpeed = 4.0;
	controls.zoomSpeed = 3.6;
	controls.panSpeed = 2.0;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	controls.keys = [ 65, 83, 68 ];

	controls.addEventListener( 'change', render );
	
    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    
    material = new THREE.MeshBasicMaterial( { color: 0xff0000} );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

  //  renderer = new THREE.CanvasRenderer();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    $container.append(renderer.domElement);
    THREEx.FullScreen.bindKey({element:renderer.domElement});
    
    window.addEventListener( 'resize', onWindowResize, false );
    
    animate();
}
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();

	render();

}
function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );
    controls.update();
    render();

}

function render() {
/*
    mesh.rotation.x += 0.04;
    mesh.rotation.y += 0.04;
    mesh.rotation.z += 0.02;
    //renderer.render( scene, camera );
   */ 
 // on update
    renderer.clear();
    renderer.setViewport(0, 0,  window.innerWidth , window.innerHeight);
    renderer.render(scene, camera);
    renderer.setViewport( window.innerWidth -200, 0, 200 , 200);
    renderer.render(scene, camera2);

}


});