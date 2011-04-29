task 'build', 'Build the source to Javascript', ->
  require('child_process').spawn 'coffee', ['-cbo', 'lib/closure-compiler', 'src/index.coffee']
