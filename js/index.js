var container, stats;
var camera, scene, renderer,projector;
var controls ;

var mouseX = 0, mouseY = 0;

var nbParticles = 5000;
// var nbParticles = 1030;


var transIsActive = 0;

var W = window.innerWidth;
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
var CamZ = 600;

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
       console.log(vertex);
        // appsVertices.push([x,y,z]);
      }
    }
  }
}


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
       console.log(vertex);

        // appsVertices.push([x,y,z]);
      }
    }
  }
}

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
       console.log(vertex);

        // appsVertices.push([x,y,z]);
      }
    }
  }
}

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
       console.log(vertex);

        // appsVertices.push([x,y,z]);
      }
    }
  }
}


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

var actualVertices = sphereVertices; // first shape displayed

init();
animate();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera( 45, W / H, 1, 5000 );
  scene.add(camera);
  camera.position.set( CamX, CamY, CamZ );
  camera.lookAt(scene.position);
// camera.position.z = -3000 ;


  // var texture = THREE.ImageUtils.loadTexture("apps.png", undefined, function() {

  // var texture = new THREE.ImageLoader().load("apps.png");

    // imagedata = getImageData(texture.image);

    // drawTheMap(imagedata);

  // });
  // drawTheMap();

  var texture, imagedata;

texture = THREE.ImageUtils.loadTexture( "handset.png", undefined, function ( event ) {

    imagedata = getImageData( texture.image );
    console.log(texture.image);


} );
setTimeout(function () {
  console.log(imagedata);
  drawTheMap(imagedata)
}, 1000);

texture1 = THREE.ImageUtils.loadTexture( "brain.png", undefined, function ( event ) {

    imagedata1 = getImageData( texture1.image );

} );
setTimeout(function () {

  drawTheMap1(imagedata1)
}, 1000);

texture2 = THREE.ImageUtils.loadTexture( "people_crowd-512.png", undefined, function ( event ) {

    imagedata2 = getImageData( texture2.image );

} );
setTimeout(function () {

  drawTheMap2(imagedata2)
}, 1000);

texture3 = THREE.ImageUtils.loadTexture( "untitled (1).png", undefined, function ( event ) {

    imagedata3 = getImageData( texture3.image );

} );
setTimeout(function () {

  drawTheMap3(imagedata3)
}, 1000);



  // scene element
  var program = function ( context ) {

    context.beginPath();
    context.arc( 0, 0, 0.5, 0, PI2, true );
    context.fill();

  }
  for ( var i = 0; i < nbParticles; i++ ) {

    var material = new THREE.SpriteCanvasMaterial({
      color: 0x1aaf5e,
      size:3,
      program: program
    });

    particle = particles[ i++ ] =new THREE.Sprite( material );
    particle.position.x = actualVertices[i].x - 400;
    particle.position.y = actualVertices[i].y - 97;
    particle.position.z = actualVertices[i].z;
    particle.scale.x = particle.scale.y =  1;
    scene.add( particle );

  }

  for ( var i = 0; i < nbParticles / 2; i++ ) {

    particle = particles[ i++ ];
    particle.position.x = actualVertices[i].x-50+Math.random()*400;
    particle.position.y = actualVertices[i].y-50+Math.random()*400;
    particle.position.z = actualVertices[i].z-50+Math.random()*400;

  }


  // projector
  projector = new THREE.Projector();

  // renderer (CANVAS)
  renderer = new THREE.CanvasRenderer({ alpha: true } );
  renderer.setSize( W , H );
  renderer.setClearColor( 0x121212, 0); // the default
  container.appendChild( renderer.domElement );

  // events listeners
  window.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'mousedown', onDocumentMouseDown, false );
  window.addEventListener( 'resize', onWindowResize, false );

}




// EVENTS

function onDocumentMouseDown( event ){

  var vector = new THREE.Vector3(mouseX, - mouseY, 0.1 );

  switch(switchShape){
    case 1:
      actualVertices = appsVertices;
      switchShape = 2;
      break;
    case 2:
      actualVertices = appsVertices1;
      switchShape = 3;
      break;
    case 3:
      // actualVertices = cubeVertices;
      actualVertices=appsVertices2;
      switchShape = 4;
      break;
    case 4:
       actualVertices=appsVertices3;
       switchShape=1;
       break;


  }

  transIsActive = 0;
  for ( var i = 0; i < nbParticles; i++ ) {

    particle = particles[ i++ ];
    new TWEEN.Tween( particle.position ).to( {
      x: actualVertices[i].x ,
      y: actualVertices[i].y ,
      z: actualVertices[i].z ,
    }, 2500 )
    .easing( TWEEN.Easing.Elastic.Out).start();
  }
}


function onWindowResize() {

  W = window.innerWidth;
  H = window.innerHeight;
  halfW = W / 2;
  halfH = H / 2;

  camera.aspect = W / H;
  camera.updateProjectionMatrix();

  renderer.setSize( W , H );

}

function onDocumentMouseMove( event ) {

  event.preventDefault();
  mouseX = event.clientX - halfW;
  mouseY = event.clientY - halfH;

  var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.1 );
  projector.unprojectVector( vector, camera );
  var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

  var intersects = raycaster.intersectObjects( scene.children );
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

function animate() {

  requestAnimationFrame( animate );


  render();

}

function render() {

  TWEEN.update();

  camera.position.x += ( mouseX - camera.position.x ) * .005;
  camera.position.y += ( - mouseY - camera.position.y ) * .005;
  camera.lookAt( scene.position );
  camera.lookAt( scene.position );

  for ( var i = 0; i < nbParticles; i++ ) {

    particle = particles[ i++ ];

    if(particle.material.opacity >= .2) particle.material.opacity -= .01;
    particle.scale.x = particle.scale.y = ( Math.sin( ( i+ count ) * 0.3 ) + 1 ) * 4 +( Math.sin( ( i + count ) * 0.5 ) + 1 ) ;

  }

  count += 0.1;

  renderer.render( scene, camera );

}
