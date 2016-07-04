const HANDLE_ORIENTATION = `
  <script> 
    var output = document.querySelector('.output');

    var degreeToRad = function( degree ) {
      return Math.PI / 180 * degree;
    }
    var obj = {};
    var beta = null;
    var alpha = null;

    function handleOrientation(event) {
      var x = event.beta;  // In degree in the range [-180,180]
      var y = event.gamma; // In degree in the range [-90,90]
      var z = event.alpha; // between 0 and 360

      if (event.webkitCompassHeading) {
        // Apple works only with this, alpha doesn't work
        z = event.webkitCompassHeading + window.orientation;
      } else {
        z = event.alpha;
      }

      //output.innerHTML = "alpha: " + z;
      //output.innerHTML = "gamma: " + y;
      //output.innerHTML = "beta: " + x;

  
      //camera.rotation.x = -degreeToRad(x + 90);
      //camera.rotation.x = -degreeToRad(x) - degreeToRad(110);
      //camera.rotation.x = -degreeToRad(x) - degreeToRad((x/100) + 110);
      //camera.rotation.x = -degreeToRad(x) - degreeToRad(x*1.5);
      

      for (var i = 0; i < meshes.length; i++) {
        if (!obj[meshes[i]]) {
          obj[meshes[i]] = meshes[i].position.y;
        }

        if (x >= 75 && x <= 80) {
          meshes[i].position.y = obj[meshes[i]];
        }

        if (Number(x).toFixed(0) > Number(beta).toFixed(0)) {
          meshes[i].position.y += -degreeToRad(x)*2;
        } else if (Number(x).toFixed(0) < Number(beta).toFixed(0)) {
          meshes[i].position.y += degreeToRad(x)*2;
        }
      }

      if (Number(z).toFixed(0) !== Number(alpha).toFixed(0)) {
        camera.rotation.y = -degreeToRad(z);
      }

      beta = x;
      alpha = z;
    }

    window.addEventListener('deviceorientation', handleOrientation);

  </script>
`;

/*
Observable.fromEvent(deviceOrientation)
  .filter(e => e.alpha)
  .scan((acc, alpha) => {
    if alpha > acc * .5
      return alpha
    else
      return acc
  })
  .subscribe(alpha => camera.rotation.y = )

*/

export default HANDLE_ORIENTATION;
