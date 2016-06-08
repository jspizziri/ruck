var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var GulpDocker = require('gulp-docker');
var conf = require('./conf');
var gutil = require('gulp-util');

gulp.task('docker:build', function(){

  var environmentTag;
  if(gutil.env.env === 'production') {
    gutil.env.env = 'production';
    environmentTag = 'stable';
  } else {
    gutil.env.env = 'staging';
    environmentTag = 'latest';
  }

  var release = require('../package.json').version;
  var tags = [environmentTag, release];
  var options = {
    repo: conf.docker.repo,
    tags: tags,
    dockerfile: path.resolve(__dirname, '../')
  }

  // Initialize gulp-docker
  new GulpDocker(gulp, { ruck: options });

  runSequence(
    'clean',
    'build',
    'docker:image',
    'clean'
  );
});
