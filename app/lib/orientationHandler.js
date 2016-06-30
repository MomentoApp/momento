const HANDLE_ORIENTATION = `
  <script> 
    var output = document.querySelector('.output');

    var degreeToRad = function( degree ) {
      return Math.PI / 180 * degree;
    }

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

      //camera.rotation.y = -degreeToRad(z);
      camera.rotation.x = -degreeToRad(x) - degreeToRad(110);
      //camera.rotation.x = -degreeToRad(x + 90);


      // if ((x - beta) > 0.1 || (beta - x) > 0.1) {
      //   camera.rotation.x = -degreeToRad(x) + degreeToRad(90);
      // }

      if ((z - alpha) > 1 || (alpha - z) > 1) {
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
