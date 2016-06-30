const THREE_JS_RENDER = `
  <script>
     
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0 ); // the default
    renderer.setSize( window.innerWidth / 2, window.innerHeight/2 );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color:0x00ff00});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function render() {
      requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    render();

  </script>
`;

export default THREE_JS_RENDER;
