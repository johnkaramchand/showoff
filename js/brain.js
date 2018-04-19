		var vertices;
		var geometry;
    var brain;
    var wireframe;
    var brain_mesh;
    	var brain_addPosition = [];
      var time ;
      // var controls ;
      var renderer ;
      var scene ;
      var camera ;

		function john() {
				var sp = false;
				var ua = window.navigator.userAgent;
				if (ua.indexOf('Android') > 0 || ua.indexOf('iPhone') > 0 || ua.indexOf('Windows Phone') > 0) {
					sp = true;
				}
				//var wp_path = "/wp-content/themes/sence/assets/";
				scene = new THREE.Scene();
				scene.background = new THREE.Color(0x9ca1a8);
				scene.fog = new THREE.Fog(0xEEEDF3, 0, 40);
				/*////////////////
					camera
				////////////////*/
				var width = 1200;
				var height = 800;
				camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
				// controls = new THREE.OrbitControls(camera);
				// controls.enabled = false;
			    	// controls.enableDamping = true ;
				// controls.enableZoom = false;
			    	// controls.autoRotate = false;
				// controls.autoRotateSpeed = 5.0;
				// controls.minPolarAngle = 1;
				// controls.maxPolarAngle = 2;
				// controls.minAzimuthAngle = -.5 ;
				// controls.maxAzimuthAngle = 1 ;
      				// controls.target.y = 2;
      				camera.position.z = 125;
				// console.log(camera.position.z);
				if(sp){
					camera.position.z = 18 ;
					// console.log(camera.position.z);
				}


				/*////////////////
					renderer
				////////////////*/
				renderer = new THREE.WebGLRenderer({
					alpha: true,
					antialias: true,
					canvas: document.getElementById("brain-canvas1")
				});
				renderer.setSize(width, height);
				renderer.shadowMap.enabled = true;
				/*////////////////
					Light - PointLight
				////////////////*/
				var light = new THREE.PointLight(0xffffff, 1, 40);
				light.castShadow = true;
				light.position.set(0, 20, 0);
				scene.add(light);
				/*////////////////
					Light - AmbientLight
				////////////////*/
				var amblight = new THREE.AmbientLight(0x404040);
				scene.add(amblight);
				/*////////////////
					Light - DirectionalLight
				////////////////*/
				var color = 0x777777;
				directionalLight = new THREE.DirectionalLight(color, 1);
				directionalLight.position.set(0, 20, 0).normalize();
				directionalLight.castShadow = true;
				scene.add(directionalLight);
				/*////////////////
					Brain
				////////////////*/



				loader = new THREE.BufferGeometryLoader();
				loader.load('js/brain.json', function(e) {

					brain = new THREE.Object3D();
						brain.rotation.y = -2 ;
					var gui = new dat.GUI();
						gui.add(brain.rotation, 'y', 0, 10).name('y-rotation').listen();

					// brain.rotateY(0.720305) ; //47* - not able to find right angle
					/*////////////////
						Brain-Line
					////////////////*/
					var geo = new THREE.EdgesGeometry(e);
					console.log(geo);
					var mat = new THREE.ShaderMaterial({
						uniforms: {
							opacity: {
								type: "f",
								value: 1
							},
							width: {
								type: "f",
								value: width
							},
							time: {
								type: "f",
								value: 0
							}
						},
						fragmentShader: document.getElementById("fs_wire").textContent
					});
					wireframe = new THREE.LineSegments(geo, mat);
					wireframe.renderOrder = 1;
					// brain.add(wireframe);
					/*////////////////
						Brain-Point
					////////////////*/
					var PointMaterial = new THREE.PointsMaterial({
						transparent: true,
						opacity: 0.1,
						color: 0xffffff,
						size: 0.1
					});
					PointMaterial.blending = THREE.AdditiveBlending ;
					points = new THREE.Points(e, PointMaterial);
					// brain.add(points);
					/*////////////////
						Brain-Face
					////////////////*/

					brain_mesh = new THREE.Object3D();
					brain.add(brain_mesh);
					// var face_material = new THREE.ShaderMaterial( {
					// 	vertexShader: document.getElementById( 'vs_brain' ).textContent,
					// 	fragmentShader: document.getElementById( 'fs_brain' ).textContent,
					// 	transparent: true,
					// 	side: THREE.DoubleSide,
					// 	uniforms: {
					// 		time:{type: 'f',value:1}
					// 	}
					// });




					//texture start

					//texture end



					var max = 30;
					var min = -max;
					var scale = .99;
					var mat_ = new THREE.ShaderMaterial({
						uniforms: {
							opacity: {
								type: "f",
								value: 0.6
							},
							width: {
								type: "f",
								value: width
							},
							time: {
								type: "f",
								value: 0
							}
						},
						fragmentShader: document.getElementById("fs_wire").textContent
					});
					//e.attributes.position.count /
					for (var i = 0; i < e.attributes.position.count /3; i++) {

						// MATERIAL
						if(i%2==0){
						var texture = new THREE.TextureLoader().load('pics/api.png');
					}
					else{
							var texture = new THREE.TextureLoader().load('pics/apps.png');
					}
			      var pinkMat = new THREE.MeshBasicMaterial( {
			        map: texture,
			        side: THREE.BackSide
			      } );
						pinkMat.transparent = true ;
						pinkMat.blending = THREE.AdditiveBlending ;

						// var pinkMat = new THREE.MeshPhongMaterial({
						// 	//blending:1,
						// 	color: new THREE.Color("rgb(255,255,60)"),
						// 	emissive: new THREE.Color("rgb(150,168,254)"),
						// 	specular: new THREE.Color("rgb(255,255,0)"),
						// 	shininess: 10,
						// 	side: 1,
						// 	flatShading: true,
						// 	transparent: true,
						// 	opacity: .7,
						// 	// map: texture
						//
						// });

			      //end material

						geometry = new THREE.BufferGeometry();

						vertices = new Float32Array([
							e.attributes.position.array[i * 9 + 0], e.attributes.position.array[i * 9 + 1], e.attributes.position.array[i * 9 + 2],
							e.attributes.position.array[i * 9 + 3], e.attributes.position.array[i * 9 + 4], e.attributes.position.array[i * 9 + 5],
							e.attributes.position.array[i * 9 + 6], e.attributes.position.array[i * 9 + 7], e.attributes.position.array[i * 9 + 8]
						]);
						uvs = new Float32Array([
							0.0 , 0.0,
							0.0 , 2.0,
							2.0 , 0.0
						]) ;

						geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
						geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
						// console.log(geometry) ;
						var mesh = new THREE.Mesh(geometry, pinkMat);
						brain_addPosition[i] = {
							x: Math.floor(Math.random() * (max + 1 - min)) + min,
							y: Math.floor(Math.random() * (max + 1 - min)) + min,
							z: Math.floor(Math.random() * (max + 1 - min)) + min
						};


						mesh.scale.set(scale, scale, scale);


						mesh.index = i;

						mesh.isAnimation = false;
						mesh.time = 0;

						brain_mesh.add(mesh);

					}
					/*////////////////
						Brain-extra-burden
					////////////////*/

					for (var i = 0; i < e.attributes.position.count /3; i++) {

						// MATERIAL
					// 	if(i%2==0){
					// 	var texture = new THREE.TextureLoader().load('textures/api.png');
					// }
					// else{
					// 		var texture = new THREE.TextureLoader().load('textures/apps.png');
					// }
					//   var pinkMat1 = new THREE.MeshBasicMaterial( {
					//     map: texture,
					//     side: THREE.BackSide
					//   } );
					// 	pinkMat1.transparent = true ;
					// 	pinkMat1.blending = THREE.AdditiveBlending ;

						var pinkMat1 = new THREE.MeshPhongMaterial({
							//blending:1,
							color: new THREE.Color("rgb(255,255,60)"),
							emissive: new THREE.Color("rgb(150,168,254)"),
							specular: new THREE.Color("rgb(255,255,0)"),
							shininess: 10,
							side: 1,
							flatShading: true,
							transparent: true,
							opacity: .7,
							// map: texture

						});

						//end material

						geometry = new THREE.BufferGeometry();

						vertices = new Float32Array([
							e.attributes.position.array[i * 9 + 0], e.attributes.position.array[i * 9 + 1], e.attributes.position.array[i * 9 + 2],
							e.attributes.position.array[i * 9 + 3], e.attributes.position.array[i * 9 + 4], e.attributes.position.array[i * 9 + 5],
							e.attributes.position.array[i * 9 + 6], e.attributes.position.array[i * 9 + 7], e.attributes.position.array[i * 9 + 8]
						]);
						uvs = new Float32Array([
							0.0 , 0.0,
							0.0 , 2.0,
							2.0 , 0.0
						]) ;

						geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
						geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
						// console.log(geometry) ;
						var mesh1 = new THREE.Mesh(geometry, pinkMat1);
						brain_addPosition[i] = {
							x: Math.floor(Math.random() * (max + 1 - min)) + min,
							y: Math.floor(Math.random() * (max + 1 - min)) + min,
							z: Math.floor(Math.random() * (max + 1 - min)) + min
						};


						mesh.scale.set(scale, scale, scale);


						mesh.index = i;

						mesh.isAnimation = false;
						mesh.time = 0;

						// brain_mesh.add(mesh1);

					}


					/*////////////////
						Brain-Setting
					////////////////*/
					scene.add(brain);
					console.log(brain);
					brain.scale.set(0.01, 0.01, 0.01);
					// brain.rotation.y = 10;
				});



  			/*////////////////
					render
				////////////////*/
				time = 0;


			if (!sp) {
				var story = $("#story1");
				var brain_ = $("#brain-canvas1").get()[0];
				$(".story1").on({
					mouseenter: function(e) {
						// // console.log(e) ;
						// controls.enabled = true;
						//
						// // geometry.attributes.position.set(vertices*100) ;
						// //
						// // geometry.needsUpdate = true ;

					},
					mousemove: function(e) {
						var rect = brain_.getBoundingClientRect();
						var mouseX = e.clientX - rect.left;
						var mouseY = e.clientY - rect.top;
						var diff = story.width() * 0.3 - 600;
						mouseX = (e.clientX - 600 - diff) / 1200 * 2;
						var diff = (story.outerHeight() - 800) / 2;
						mouseY = -(mouseY / 800) * 2 + 1;
						var pos = new THREE.Vector3(mouseX, mouseY, 1);
						// console.log("before unproject = "+pos);
						pos.unproject(camera);
						// console.log("after unproject = "+pos);
						// console.log("with sub = "+pos.sub(camera.position));
						// console.log("withh normalize = "+pos.sub(camera.position).normalize());
						var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
						if (brain_mesh) {
							var objs = ray.intersectObjects(brain_mesh.children);
							console.log(objs[0]);
              objs[0].object.isAnimation = true;
							// if (objs.length > 0) {
							// 	for (var v = 0; v < objs.length; v++) {
							// 		// console.log(objs[v].object);
							// 		objs[v].object.isAnimation = true;
							// 	}
							// }
						}
					},
					mouseleave: function(e) {
						// controls.enabled = false;
					}
				})
			}

				// console.log(brain_mesh)

       return scene;

		}

    function render() {

      // requestAnimationFrame(render);
      // console.log(brain_mesh) ;
      if (brain) {
          // console.log(brain_mesh.children.length) ;

        var timeDiff = 0.03;

        for (var i = 0; i < brain_mesh.children.length; i++) {
          // console.log(brain_mesh.children.length) ;
          var f = (brain_mesh.children[i].time) * timeDiff * Math.PI;
          // console.log(brain_addPosition);
          if (brain_mesh.children[i].isAnimation) {
            brain_mesh.children[i].time++;

            // console.log("i = "+ i+ " f = " + f) ;

            brain_mesh.children[i].position.set(
              (brain_addPosition[i].x + brain_addPosition[i].x * Math.sin(f)),
              (brain_addPosition[i].y + brain_addPosition[i].y * Math.sin(f)),
              (brain_addPosition[i].z + brain_addPosition[i].z * Math.sin(f))


            );
            // console.log(brain_mesh.children[i].position.y) ;


            // console.log(Math.sin(f));
            if( -1 >= Math.sin(f)){
            brain_mesh.children[i].time = 0;
            brain_mesh.children[i].isAnimation = false;
          }
        }
      // 	var position = { x : brain_addPosition[i].x*100, y: brain_addPosition[i].y*100, z: brain_addPosition[i].z*100};
      // 	var target = { x : 0, y: 0, z: 0};
      // 	var tween = new TWEEN.Tween(position).to(target, 8000).onUpdate(function(){
      // 		console.log(this.x) ;
      //   	brain_mesh.children[i].position.set(position.x,position.y,position.z)  ;
      // });




        // console.log(Math.sin(f));
        // if( -1 >= Math.sin(f)){
        //   brain_mesh.children[i].time = 0;}

      }

    }
    if (wireframe) {
      wireframe.material.uniforms.time.value += 0.5;
    }
    time += 0.1;
    // controls.update();
    var winResize	= new THREEx.WindowResize(renderer, camera) ;
    renderer.render(scene, camera);



    // TWEEN.update() ;


}

// console.log(Date.now);
// var counter = 0 ;
// var inc = +.001 ;
function animate() {
  requestAnimationFrame(animate);
	if ( brain ) {
					   // console.log(brain.rotation.y);
						 // if(counter == 3)inc = -.000001 ;
						 // if(counter == 1)inc = +.000001 ;   //not working
						 // counter += inc ;
						 // brain.rotation.y += counter ;
			 // brain.rotation.y = Math.sin(Date.now() *  0.0001)* (Math.PI/2)  * 0.5;

	 }



  render();
  TWEEN.update();
}
john() ;
animate() ;

function tweeeen(i){
  setTimeout(function () {
  // console.log(brain_mesh.children.length);



  // var coords = {
  //   x:  brain_addPosition[i].x*100,
  //   y:  brain_addPosition[i].y*100,
  //   z:  brain_addPosition[i].z*100
  // };
  // var tween = new TWEEN.Tween(coords)
  //   .to({
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   }, 5000)
  //   .onUpdate(function() {
	//
  //     brain_mesh.children[i].position.set(coords.x,coords.y,coords.z)  ;
  //   })
  //   .start();
// imp comment
	// var coords = {
	// 	  x:  brain_addPosition[i].x*100,
	//     y:  brain_addPosition[i].y*100,
	//     z:  brain_addPosition[i].z*100
	// };
	// var tween = new TWEEN.Tween(coords)
	// 	.to({
	// 		x: 0,
	// 		y: 0,
	// 		z: 0
	// 	}, 15000)
	// 	.onUpdate(function() {
	// 		// console.log(this.x, this.y, this.z);
	// 		brain_mesh.children[i].position.set(coords.x ,coords.y , coords.z) ;
	// 	})
	// 	// .delay(1000)
	// 	.easing(TWEEN.Easing.Back.InOut)
	// 	.repeat(Infinity)
//imp comment close

var coords = {
		  x:  brain_addPosition[i].x*10,
	    y:  brain_addPosition[i].y*10,
	    z:  brain_addPosition[i].z*10
};
var tween = new TWEEN.Tween(coords)
	.to({
		x: 0,
		y: 0,
		z: 0
	}, 2000)
	.onUpdate(function() {
		// console.log(this.x, this.y, this.z);
		brain_mesh.children[i].position.set(coords.x ,coords.y , coords.z) ;
	})
	// .delay(1000)
	.easing(TWEEN.Easing.Back.InOut)
	// .repeat(Infinity)
	.start();
	// .chain(tween_reverse);

	// var coords_back = {
	// 		  x:  0,
	// 	    y:  0,
	// 	    z:  0
	// };
	// var tween_reverse = new TWEEN.Tween(coords_back)
	// 	.to({
	// 		x:  brain_addPosition[i].x*10,
	// 		y:  brain_addPosition[i].y*10,
	// 		z:  brain_addPosition[i].z*10
	// 	}, 2000)
	// 	.onUpdate(function() {
	// 		// console.log(this.x, this.y, this.z);
	// 		brain_mesh.children[i].position.set(coords.x ,coords.y , coords.z) ;
	// 	})
	// 	// .delay(1000)
	// 	.easing(TWEEN.Easing.Back.InOut)
	// 	// .repeat(Infinity)
	// 	.start()
	// 	.chain(tween);

  	// .start();
		/* for rotation */

		var coords_rotate = {
        x:  -1,
				y:  0

		};
		var tween_rotate = new TWEEN.Tween(coords_rotate)
			.to({
        x:  0,
				y: -2

			}, 8000)
			.onUpdate(function() {
				// console.log(this.x, this.y, this.z);
				brain.rotation.y = coords_rotate.y ;
				brain.rotation.x = coords_rotate.x ;

			})
			// .start();

		/* rotation */
		var coords1 = {
			x: 8,
			y: 8,
			z: 8
		};
		var tween1 = new TWEEN.Tween(coords1)
			.to({
				x: 6,
				y: 6,
				z: 6
			}, 10000)
			.easing(TWEEN.Easing.Back.InOut)
			.onUpdate(function() {
				// console.log(this.x, this.y, this.z);
				brain_mesh.children[i].scale.set(coords1.x ,coords1.y , coords1.z) ;
			})
			// .delay(1000)
			// .repeat(Infinity)
			.start();
}, 1000);
  // console.log("I am HERE!!") ;
}
for(var i =0 ; i < 508 ; i++){
		tweeeen(i) ;
		// console.log("hi"+i);
}
