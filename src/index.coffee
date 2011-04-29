spawn = require('child_process').spawn
path  = require 'path'

JAVA_PATH = exports.JAVA_PATH = 'java'
JAR_PATH  = exports.JAR_PATH  = path.join __dirname, 'vendor/compiler.jar'
OPTIONS   = exports.OPTIONS   = {}

exports.compile = (input, options, callback) ->
  if callback
    result = {}
    Object.keys(OPTIONS).forEach (key) ->
      result[key] = OPTIONS[key]
    Object.keys(options).forEach (key) ->
      result[key] = options[key]
    options = result
  else
    callback = options
    options  = OPTIONS

  args = ['-jar', JAR_PATH]

  Object.keys(options).forEach (key) ->
    args.push "--#{key}"
    args.push "#{options[key]}"

  compiler = spawn JAVA_PATH, args
  stdout   = ''
  stderr   = ''

  compiler.stdout.setEncoding 'utf8'
  compiler.stderr.setEncoding 'utf8'

  compiler.stdout.on 'data', (data) ->
    stdout += data

  compiler.stderr.on 'data', (data) ->
    stderr += data

  compiler.on 'exit', (code) ->
    return callback new Error stderr if stderr.length > 0
    callback null, stdout

  compiler.stdin.end input
