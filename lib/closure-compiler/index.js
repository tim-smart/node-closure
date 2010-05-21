var JAR_PATH, JAVA_PATH, OPTIONS, path, spawn, sys;
spawn = require('child_process').spawn;
path = require('path');
sys = require('sys');
JAVA_PATH = (exports.JAVA_PATH = 'java');
JAR_PATH = (exports.JAR_PATH = path.join(__dirname, 'vendor/compiler.jar'));
OPTIONS = (exports.OPTIONS = {});
exports.compile = function(input, options, callback) {
  var _a, _b, _c, _d, args, compiler, name, option, result;
  if (callback) {
    result = Object.create(OPTIONS);
    _a = options;
    for (option = 0, _b = _a.length; option < _b; option++) {
      name = _a[option];
      result[name] = option;
    }
    options = result;
  } else {
    callback = options;
    options = OPTIONS;
  }
  args = ['-jar', JAR_PATH];
  _c = options;
  for (option = 0, _d = _c.length; option < _d; option++) {
    name = _c[option];
    args.push(("--" + name));
    args.push(("" + option));
  }
  compiler = spawn(JAVA_PATH, args);
  result = '';
  compiler.stdout.addListener('data', function(data) {
    return result += data;
  });
  compiler.addListener('exit', function(code) {
    return callback(result.trim());
  });
  compiler.stdin.write(input);
  return compiler.stdin.end();
};