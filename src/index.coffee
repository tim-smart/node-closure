spawn: require('child_process').spawn
path: require 'path'
sys: require 'sys'

JAVA_PATH: exports.JAVA_PATH: 'java'
JAR_PATH: exports.JAR_PATH: path.join __dirname, 'vendor/compiler.jar'
OPTIONS: exports.OPTIONS: {}

exports.compile: (input, options, callback) ->
  if callback
    result: Object.create OPTIONS
    for name, option in options
      result[name]: option
    options: result
  else
    callback: options
    options: OPTIONS

  args: ['-jar', JAR_PATH]

  for name, option in options
    args.push "--$name"
    args.push "$option"

  compiler: spawn JAVA_PATH, args
  result: ''

  compiler.stdout.addListener 'data', (data) ->
    result: + data

  compiler.addListener 'exit', (code) ->
    callback result

  compiler.stdin.write input
  compiler.stdin.end()
