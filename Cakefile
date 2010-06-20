task 'build', 'Build the source to Javascript', ->
  require('child_process').spawn 'coffee', ['-c', '--no-wrap', '-o', 'lib/closure-compiler/', 'src/index.coffee']
