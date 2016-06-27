var fs = require('fs');
var path = require('path');

function getBabelRC() {
  var rcpath = path.join(__dirname, '..', '.babelrc');
  var source = fs.readFileSync(rcpath).toString();
  return JSON.parse(source);
}

var config = getBabelRC();

config.ignore = function(filename) {
  if (!(/\/node_modules\//).test(filename)) {
    return false; // if not in node_modules, we want to compile it
  } else if ((/\/node_modules\/react-native\//).test(filename)) {
    // its RN source code, so we want to compile it
    return false;
  } else {
    // it's in node modules and NOT RN source code
    return true;
  }
};

require("babel-register")(config);

global.__DEV__ = true;