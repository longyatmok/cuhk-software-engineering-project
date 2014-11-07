CSCI3100 (2012 Spring) Introduction to Software Engineering at The Chinese University of Hong Kong   
A WebGL and WebSocket 3D Web Game   
A proof-of-concept WebGL game using Three.js and node-browserify.
Due to time limitation, server-side (written in node.js) is not well written.

Requirements   
* Apache   
* PHP   
* MySQL   
* Node.js    
  
Update Node.js Dependences   
npm install  

Run Server     
node app -dev  

Run Game Server :  
cd game/server  
node server  

Build client-side Javascript :      
node build      
Build client-side Javascript (DEV):      
node build -dev