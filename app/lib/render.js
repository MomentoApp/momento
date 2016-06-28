const THREE_JS_RENDER = `
   <script>
    var camera, scene, renderer;
    var meshes = [];
    var mesh;
    var fovPortrait = 53;
    var fovLandscape = 37.5;


    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera( fovPortrait, window.innerWidth / window.innerHeight, 1, 5280 );
      scene = new THREE.Scene();

      var ambient = new THREE.AmbientLight( 0x555555 );
      scene.add(ambient);

      var light = new THREE.DirectionalLight( 0xffffff );
      light.position = camera.position;
      scene.add(light);

      var geometry = new THREE.SphereGeometry(10,32,32);
      var material = new THREE.MeshLambertMaterial({color:0x0066FF, wireframe: true, transparent: true, opacity: 0.9});

      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );
      mesh.position.z = -50;

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
      render();
    }

    function render() {
      meshes.forEach( function( mesh ) {
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.01;
      });

      renderer.render( scene, camera );
    }
  </script>
`;

export default THREE_JS_RENDER;



