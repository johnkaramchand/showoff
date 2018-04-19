var stats;
var camera_c, scene_c, renderer_c;
var remain ;
// var controls_s ;


var wed = 0 , about = 0 , ju = 0 , contact = 0 ;
var mouseX = 0, mouseY = 0;

var nbParticles = 10302;
// var nbParticles = 1000;
var transform = nbParticles ;
// var nbParticles = 1030;


var transIsActive = 0;

var canvas = document.getElementById("john");
var W = window.innerWidth / 2;
var H = window.innerHeight;

var halfW = W / 2;
var halfH = H / 2;

var particles = [];

var switchShape = 1;

// utils
var PI2 = Math.PI * 2;
var count = 0;
var CamX = 0;
var CamY = 0;
var CamZ = 800;

// SPHERE
var sphereVertices = []; // array of vertices
var radius = 100;
for ( var i = 0; i < nbParticles; i ++ ) {
  var phi = Math.acos( -1 + ( 2 * i ) / nbParticles );
  var theta = Math.sqrt( nbParticles * Math.PI ) * phi;
  var vertex_s = new THREE.Vector3();
  vertex_s.x = radius * Math.cos( theta ) * Math.sin( phi );
  vertex_s.y = radius * Math.sin( theta ) * Math.sin( phi );
  vertex_s.z = radius * Math.cos( phi );
  sphereVertices.push(vertex_s);
}

// big expfun

var getImageData = function(image) {

  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  return ctx.getImageData(0, 0, image.width, image.height);
}

var appsVertices = [];
var drawTheMap = function(imagedata) {
var h = imagedata.height ;
var w = imagedata.width ;
// console.log(h);
  for (var y = 0;y < h; y += 2) {

    for (var x = 0; x < w; x += 2) {

      if (imagedata.data[(x * 4 + y * 4 * w) + 3] > 128) {

        var vertex = new THREE.Vector3();
        vertex.x = x - w / 2;
        vertex.y = -y + h / 2;
        vertex.z = 0;


        // var x = x - imagedata.width / 2;
        // var y = -y + imagedata.height / 2;
        // var z = 0;
       appsVertices.push(vertex) ;
       wed++ ;
        // appsVertices.push([x,y,z]);
      }
    }
  }
}
console.log(appsVertices);

var appsVertices1 = [];
var drawTheMap1 = function(imagedata1) {
var h = imagedata1.height ;
var w = imagedata1.width ;
// console.log(h);
  for (var y = 0;y < h; y += 2) {

    for (var x = 0; x < w; x += 2) {

      if (imagedata1.data[(x * 4 + y * 4 * w) + 3] > 128) {

        var vertex = new THREE.Vector3();
        vertex.x = x - w / 2;
        vertex.y = -y + h / 2;
        vertex.z = 0;


        // var x = x - imagedata.width / 2;
        // var y = -y + imagedata.height / 2;
        // var z = 0;
       appsVertices1.push(vertex) ;
       // console.log(vertex);
        about++ ;
        // appsVertices.push([x,y,z]);
      }
    }
  }
}
console.log(appsVertices1);
var appsVertices2 = [];
var drawTheMap2 = function(imagedata2) {
var h = imagedata2.height ;
var w = imagedata2.width ;
// console.log(h);
  for (var y = 0;y < h; y += 2) {

    for (var x = 0; x < w; x += 2) {

      if (imagedata2.data[(x * 4 + y * 4 * w) + 3] > 128) {

        var vertex = new THREE.Vector3();
        vertex.x = x - w / 2;
        vertex.y = -y + h / 2;
        vertex.z = 0;


        // var x = x - imagedata.width / 2;
        // var y = -y + imagedata.height / 2;
        // var z = 0;
       appsVertices2.push(vertex) ;
       // console.log(vertex);
       ju++ ;
        // appsVertices.push([x,y,z]);
      }
    }
  }
}
console.log(appsVertices2);
var appsVertices3 = [];
var drawTheMap3 = function(imagedata3) {
var h = imagedata3.height ;
var w = imagedata3.width ;
// console.log(h);
  for (var y = 0;y < h; y += 2) {

    for (var x = 0; x < w; x += 2) {

      if (imagedata3.data[(x * 4 + y * 4 * w) + 3] > 128) {

        var vertex = new THREE.Vector3();
        vertex.x = x - w / 2;
        vertex.y = -y + h / 2;
        vertex.z = 0;


        // var x = x - imagedata.width / 2;
        // var y = -y + imagedata.height / 2;
        // var z = 0;
       appsVertices3.push(vertex) ;
       // console.log(vertex);
        contact++ ;
        // appsVertices.push([x,y,z]);
      }
    }
  }
}
console.log(appsVertices3);

// CUBE
var cubeVertices = []; // array of vertices
var amount = 16;
var separation = 10;
var offset = ( ( amount - 1 ) * separation ) / 2;

for ( var i = 0; i < nbParticles; i ++ ) {
  var vertex_c = new THREE.Vector3() ;
  vertex_c.x = ( i % amount ) * separation;
  vertex_c.y = Math.floor( ( i / amount ) % amount ) * separation;
  vertex_c.z = Math.floor( i / ( amount * amount ) ) * separation;
  cubeVertices.push(vertex_c);
}

var actualVertices = cubeVertices; // first shape displayed

init();
animate_s();

function init() {



  // scene_c
  scene_c = new THREE.Scene();
	scene_c.background = new THREE.Color(0xced1c8);

  // camera_c
  camera_c = new THREE.PerspectiveCamera( 45, W / H, 1, 5000 );
  // controls_s = new THREE.OrbitControls(camera_c);
  scene_c.add(camera_c);
  camera_c.position.set( CamX, CamY, CamZ );
  camera_c.lookAt(scene_c.position);
// camera_c.position.z = -3000 ;


  // var texture = THREE.ImageUtils.loadTexture("apps.png", undefined, function() {

  // var texture = new THREE.ImageLoader().load("apps.png");

    // imagedata = getImageData(texture.image);

    // drawTheMap(imagedata);

  // });
  // drawTheMap();

  var texture, imagedata;

texture = THREE.ImageUtils.loadTexture( "pics/handset.png", undefined, function ( event ) {

    imagedata = getImageData( texture.image );
    console.log(texture.image);


} );
setTimeout(function () {
  console.log(imagedata);
  drawTheMap(imagedata)
}, 5000);

texture1 = THREE.ImageUtils.loadTexture( "pics/brain.png", undefined, function ( event ) {

    imagedata1 = getImageData( texture1.image );

} );
setTimeout(function () {

  drawTheMap1(imagedata1)
}, 5000);

texture2 = THREE.ImageUtils.loadTexture( "pics/people_crowd-512.png", undefined, function ( event ) {

    imagedata2 = getImageData( texture2.image );

} );
setTimeout(function () {

  drawTheMap2(imagedata2)
}, 5000);

texture3 = THREE.ImageUtils.loadTexture( "pics/untitled (1).png", undefined, function ( event ) {

    imagedata3 = getImageData( texture3.image );

} );
setTimeout(function () {

  drawTheMap3(imagedata3)
}, 5000);



  // scene_c element
  var program = function ( context ) {

    context.beginPath();
    context.arc( 0, 0, 0.5, 0, PI2, true );
    context.fill();

  }
  for ( var i = 0; i < nbParticles; i++ ) {

    var material = new THREE.SpriteCanvasMaterial({
      color: 0x1aaf5e,
      program: program
    });

    particle = particles[ i ] =new THREE.Sprite( material );
    particle.position.x = actualVertices[i].x;
    particle.position.y = actualVertices[i].y ;
    particle.position.z = actualVertices[i].z;
    particle.scale.x = particle.scale.y =  1;
    scene_c.add( particle );

  }

  // projector
  // projector = new THREE.Projector();

  // renderer_c (CANVAS)
  renderer_c = new THREE.CanvasRenderer({ alpha: true, canvas: canvas } );
  renderer_c.setSize( W , H );
  renderer_c.setClearColor( 0x90968e, 0); // the default


  // events listeners
  window.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'mousedown', onDocumentMouseDown, false );
  // window.addEventListener( 'resize', onWindowResize, false );

}




// EVENTS

function onDocumentMouseDown( event ){
  console.log("hollala!!!!!");
  var vector = new THREE.Vector3(mouseX, - mouseY, 0.1 );

  switch(switchShape){
    case 1:
      actualVertices = appsVertices;
      switchShape = 2;
      option = 1 ;
      break;
    case 2:
      actualVertices = appsVertices1;
      switchShape = 3;
      option = 2 ;
      break;
    case 3:
      // actualVertices = cubeVertices;
      actualVertices=appsVertices2;
      switchShape = 4;
      option = 3 ;
      break;
    case 4:
       actualVertices=appsVertices3;
       switchShape=1;
       option = 4 ;
       break;


  }

  transIsActive = 0;
switch (option) {
  case 1:
    transform = wed  ;
    break;
  case 2:
    transform = about  ;
    break;
  case 3:
    transform = ju ;
    break;
  case 4:
    transform = contact ;
    break;
  default:

}


  for ( var i = 0; i < transform-1; i++ ) {

    particle = particles[ i ];

    new TWEEN.Tween( particle.position ).to( {
      x: actualVertices[i].x ,
      y: actualVertices[i].y ,
      z: actualVertices[i].z
    }, 5000 )

    .easing( TWEEN.Easing.Elastic.Out).start();
    // console.log(particle.position.x + " to " + actualVertices[i].x);
  }
   // remain = transform + 1 ;
   // if(remain < nbParticles){
   //   console.log("remain = "+remain);
   //   console.log("nbParticles = "+nbParticles);
   //   console.log("what the ???????");
   //
   // }
   for ( remain = transform + 1 ; remain < nbParticles - 1; remain++ ) {

     particle = particles[ remain ];
     // console.log(particle);
     if(particle){
     new TWEEN.Tween( particle.position ).to( {
       x: -250 + Math.random() * 800 ,
       y: -250 + Math.random() * 800 ,
       z: -250 + Math.random() * 800
     }, 5000 )
     .easing( TWEEN.Easing.Elastic.Out).start();
     }

   }
}


// function onWindowResize() {
//
//   W = window.innerWidth;
//   H = window.innerHeight;
//   halfW = W / 2;
//   halfH = H / 2;
//
//   camera_c.aspect = W / H;
//   camera_c.updateProjectionMatrix();
//
//   renderer_c.setSize( W , H );
//
// }

function onDocumentMouseMove( event ) {

  event.preventDefault();
  mouseX = event.clientX - halfW;
  mouseY = event.clientY - halfH;

  var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.1 );
  // projector.unprojectVector( vector, camera_c );
  vector.unproject(camera_c) ;
  var raycaster = new THREE.Raycaster( camera_c.position, vector.sub( camera_c.position ).normalize() );

  var intersects = raycaster.intersectObjects( scene_c.children );
  // if ( intersects.length > 0 ) {
  //
  //   for($in = 0; $in < intersects.length; $in ++){
  //
  //     new TWEEN.Tween( intersects[ $in ].object.position ).to( {
  //       x: intersects[ $in ].object.position.x-50+Math.random()*400,
  //       y: intersects[ $in ].object.position.y-50+Math.random()*400,
  //       z: intersects[ $in ].object.position.z-50+Math.random()*400,
  //     }, 2000 )
  //     .easing( TWEEN.Easing.Elastic.Out).start();
  //
  //     new TWEEN.Tween( intersects[ $in ].object.material ).to( {
  //       opacity: .9 }, 2000 )
  //     .easing( TWEEN.Easing.Elastic.Out).start();
  //
  //
  //   }
  //
  // }

}

function animate_s() {

  requestAnimationFrame( animate_s );


  render_s();

}

function render_s() {

  TWEEN.update();

  camera_c.position.x += ( mouseX - camera_c.position.x ) * .005;
  camera_c.position.y += ( - mouseY - camera_c.position.y ) * .005;
  camera_c.lookAt( scene_c.position );
  camera_c.lookAt( scene_c.position );

  for ( var i = 0; i < nbParticles; i++ ) {

    particle = particles[ i ];

    if(particle.material.opacity >= .2) particle.material.opacity -= .01;
    particle.scale.x = particle.scale.y = particle.scale.y = ( Math.sin( ( i+ count ) * 0.3 ) + 1 ) * 4 +( Math.sin( ( i + count ) * 0.5 ) + 1 ) ;

  }

  count += 0.1;
 // controls_s.update();
  renderer_c.render( scene_c, camera_c );


}
