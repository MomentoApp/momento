const HANDLE_ORIENTATION = `
  <script> 
    var output = document.querySelector('.output');

    var degreeToRad = function( degree ) {
      return Math.PI / 180 * degree;
    }
    var obj = {};
    var beta = null;
    var alpha = null;
    var gamma = null;


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

      output.innerHTML = "alpha: " + Number(z).toFixed(0) + ' ';
      output.innerHTML += "gamma: " + Number(y).toFixed(0) + ' ';
      output.innerHTML += "beta: " + Number(x).toFixed(0) + ' ';

  
      //camera.rotation.x = -degreeToRad(x + 90);
      //camera.rotation.x = -degreeToRad(x) - degreeToRad(110);
      //camera.rotation.x = -degreeToRad(x) - degreeToRad((x/100) + 110);
      //camera.rotation.x = -degreeToRad(x) - degreeToRad(x*1.5);
      

      for (var i = 0; i < meshes.length; i++) {
        if (!obj[meshes[i]]) {
          obj[meshes[i]] = meshes[i].position.y;
        }

        if (x >= 70 && x <= 75) {
          meshes[i].position.y = obj[meshes[i]];
        }

        if (Number(x) > Number(beta)) {
          meshes[i].position.y -= Math.abs(Math.tan(degreeToRad(beta) - degreeToRad(x)) * meshes[i].position.z);
        } else if (Number(x) < Number(beta)) {
          meshes[i].position.y += Math.abs(Math.tan(degreeToRad(beta) - degreeToRad(x)) * meshes[i].position.z);
        }
      }

      if (Number(z) !== Number(alpha)) {
        camera.rotation.y = -degreeToRad(z);
      }

      beta = x;
      alpha = z;
      //gamma = y;
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
