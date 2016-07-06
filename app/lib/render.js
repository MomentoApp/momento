const THREE_JS_RENDER = `
   <script>
    var camera, scene, renderer;
    var meshes = [];
    var mesh;
    var fovPortrait = 53;
    var fovLandscape = 37.5;
    var frustum;
    var sizeChange = 0.001;
    var expansionDirection = 1;
    var time = 0;
    var expansionSizeMax = 120;


    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera( fovPortrait, window.innerWidth / window.innerHeight, 1, 5280 );
      frustum = new THREE.Frustum();
      scene = new THREE.Scene();

      var ambient = new THREE.AmbientLight( 0x555555 );
      scene.add(ambient);

      var light = new THREE.DirectionalLight( 0xffffff );
      light.position = camera.position;
      scene.add(light);

     

     // var geometry = new THREE.SphereGeometry(30,32,32);
     //  var material = new THREE.MeshLambertMaterial({color:0x0066FF, wireframe: true, transparent: true, opacity: 0.9});
     // mesh = new THREE.Mesh( geometry, material );

      



      var thumbnail = 'https://momentotest.s3.amazonaws.com/uploads%2F11575832.jpg';

      var geometry = new THREE.SphereGeometry( 30, 32, 32 );

      var loader = new THREE.TextureLoader();
      var texture = loader.load(thumbnail);
      var material = new THREE.MeshBasicMaterial( { map: texture } );
      // var material = new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, refractionRatio: 0.95 } );
      
      mesh = new THREE.Mesh( geometry, material );
      //mesh.material.needsUpdate = true;

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
      window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = camera.aspect > 1 ? fovLandscape : fovPortrait;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {
      requestAnimationFrame( animate );

      time++;
      if(time % expansionSizeMax === 0) {
        expansionDirection = expansionDirection * -1;
      }
      meshes.forEach( function( mesh ) {
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.01;

        // mesh.scale.x += sizeChange*expansionDirection;
        // mesh.scale.y += sizeChange*expansionDirection;
        // mesh.scale.z += sizeChange*expansionDirection;
      });

      render();
    }

    //var step = 0;
    function render() {
      // meshes.forEach( function( mesh ) {
      //   step += 0.04;
      //   mesh.position.y = 2 + (10*Math.abs(Math.sin(step))); 
      // });

      renderer.render( scene, camera );
    }
  </script>
`;

export default THREE_JS_RENDER;



