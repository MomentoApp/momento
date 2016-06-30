const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const origJs = require.extensions['.js'];
const mockery = require('mockery');

require.extensions['.js'] = function (module, fileName) {

  let newFileName = fileName;
  if (fileName.indexOf('node_modules/react-native/Libraries/react-native/react-native.js') >= 0) {
    newFileName = path.resolve('./test/mocks/react-native.js');
  }
  if (fileName.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, fileName);
  }
  const src = fs.readFileSync(fileName, 'utf8');
  const output = babel.transform(src, {
    filename: newFileName,
  }).code;

  // MOCKS
  mockery.enable({ warnOnUnregistered: false });

  const Camera = {
    constants: {
      Aspect: {
        fill: 0,
      },
      CaptureTarget: {
        disk: 1,
      },
      Type: {
        back: 1,
      },
      Orientation: {
        auto: 0,
      },
      FlashMode: {
        auto: 2,
      },
    },
  };
  mockery.registerMock('react-native-camera', Camera);
  mockery.registerMock('react-native-router-flux', {});

  return module._compile(output, fileName);
};