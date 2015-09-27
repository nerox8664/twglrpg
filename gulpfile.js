var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var less = require('gulp-less');
var jscs = require('gulp-jscs');
var babel = require('gulp-babel');
var gls = require('gulp-live-server');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var angularTemplates = require('gulp-angular-templates');

gulp.task('less', function() {
  return gulp
    .src('./client/styles/*.less')
    .pipe(wiredep())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('stylecheck', function() {
  return gulp
    .src(['./client/**/*.js', 'gulpfile.js', './app/**/*.js'])
    .pipe(jscs());
});

gulp.task('clientjs', ['stylecheck'], function() {
  return gulp.src('./client/js/**/*.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('serverjs', ['stylecheck'], function() {
  return gulp.src('./app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./build/'));
});

gulp.task('angular-templates', function() {
  return gulp
    .src('./client/views/**/*.html')
    .pipe(angularTemplates({
      module: 'twglrpg',
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('index', function() {
  return gulp
    .src('./client/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./public/'));
});

var server;

gulp.task('serve', ['clientjs', 'serverjs'], function() {
  server = gls('./build/app.js', {
    env: {
      NODE_ENV: 'development',
    },
  });
  server.start();
});

gulp.task('dev', ['serve'], function() {
  gulp.watch('bower.json', ['html', 'less']);
  gulp.watch('app/**/*.js', ['serverjs']);

  gulp.watch('client/views/**/*.html', ['angular-templates']);
  gulp.watch('client/styles/*.less', ['less']);
  gulp.watch('client/js/**/*.js', ['clientjs']);
  gulp.watch('client/index.html', ['index']);

  gulp.watch([
    './app/app.js',
    './app/**/*.js',
  ], function() {
    console.log('Back-end reloaded...');
    server.start();
  });
});

gulp.task('default', ['index', 'less', 'serverjs', 'clientjs', 'angular-templates', 'dev']);
