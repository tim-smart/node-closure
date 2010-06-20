var JAR_PATH, JAVA_PATH, OPTIONS, path, spawn;
spawn = require('child_process').spawn;
path = require('path');
JAVA_PATH = (exports.JAVA_PATH = 'java');
JAR_PATH = (exports.JAR_PATH = path.join(__dirname, 'vendor/compiler.jar'));
OPTIONS = (exports.OPTIONS = {});
exports.compile = function(input, options, callback) {
  var args, compiler, result;
  if (callback) {
    result = {};
    Object.keys(OPTIONS).forEach(function(key) {
      result[key] = OPTIONS[key];
      return result[key];
    });
    Object.keys(options).forEach(function(key) {
      result[key] = options[key];
      return result[key];
    });
    options = result;
  } else {
    callback = options;
    options = OPTIONS;
  }
  args = ['-jar', JAR_PATH];
  Object.keys(options).forEach(function(key) {
    args.push(("--" + key));
    return args.push(("" + (options[key])));
  });
  compiler = spawn(JAVA_PATH, args);
  result = '';
  compiler.stdout.addListener('data', function(data) {
    return result += data;
  });
  compiler.addListener('exit', function(code) {
    return callback(result);
  });
  compiler.stdin.write(input);
  return compiler.stdin.end();
};