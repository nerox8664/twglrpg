var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var jscs = require('gulp-jscs');

// Client-side libraries
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var angularTemplates = require('gulp-angular-templates');
var gulpMarked = require('gulp-marked');
var marked = require('marked');
var renderer = new marked.Renderer();

// Server-side libraries
var gls = require('gulp-live-server');

gulp.task('markdown', () => {
  return gulp.src('./client/views/md/**/*.md')
    .pipe(gulpMarked())
    .pipe(gulp.dest('./client/views/'));
});

gulp.task('overrideSemanticVariables', () => {
  return gulp.src('./client/styles/semantic/**/*')
    .pipe(gulp.dest('./components/semantic/src/'));
});

gulp.task('setSemanticTheme', ['overrideSemanticVariables'], () => {
  return gulp.src('./client/styles/semantic/**/*')
    .pipe(gulp.dest('./components/semantic/src/'));
});

gulp.task('less', ['setSemanticTheme'], () => {
  return gulp
    .src('./client/styles/*.less')
    .pipe(wiredep())
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(minifyCSS({
      keepSpecialComments: false,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/stylesheets/'));
});

// Check JS style for server and client
gulp.task('stylecheck', () => {
  return gulp
    .src(['./client/**/*.js', 'gulpfile.js', './app/**/*.js'])
    .pipe(jscs());
});

// Translate client JS to ES5 with babel, concat to single file and minify
gulp.task('prepare-client-JS', ['stylecheck'], () => {
  return gulp.src('./client/js/**/*.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

// For old versions node.js
gulp.task('prepare-server-JS', ['stylecheck'], () => {
  return gulp.src('./app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./build/'));
});

gulp.task('angular-templates', ['markdown'], () => {
  return gulp
    .src('./client/views/**/*.html')
    .pipe(angularTemplates({
      module: 'twglrpg',
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('index', () => {
  return gulp
    .src('./client/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./public/'));
});

var server;

function restartServer() {
  if (server) {
    server.stop();
  }
  server = gls('./app/app.js', {
    env: {
      NODE_ENV: 'development',
    },
  });
  server.start();
};

gulp.task('dev', ['prepare-client-JS'], () => {

  gulp.watch('client/views/**/*', ['angular-templates']);
  gulp.watch('client/styles/*.less', ['less']);
  gulp.watch('client/js/**/*.js', ['prepare-client-JS']);
  gulp.watch('client/index.html', ['index']);

  gulp.watch([
    './app/app.js',
    './app/**/*.js',
  ], () => {
    console.log('Back-end reloaded...');
    restartServer();
  });

  restartServer();
});

gulp.task('default', ['dev']);
