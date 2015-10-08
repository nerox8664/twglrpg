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
var gulpMarked = require('gulp-marked');
var marked = require('marked');
var renderer = new marked.Renderer();

renderer.blockquote = function(quote) {
  return '<blockquote class="ui testimonial">\n' + quote + '</blockquote>\n';
};

gulp.task('markdown', function() {
  return gulp.src('./client/views/md/**/*.md')
      .pipe(gulpMarked({ renderer: renderer }))
      .pipe(gulp.dest('./client/views/'));
});

gulp.task('overrideSemanticVariables', function() {
  return gulp.src('./client/styles/semantic/**/*')
    .pipe(gulp.dest('./components/semantic/src/'));
});

gulp.task('setSemanticTheme', ['overrideSemanticVariables'], function() {
  return gulp.src('./client/styles/semantic/**/*')
    .pipe(gulp.dest('./components/semantic/src/'));
});

gulp.task('less', ['setSemanticTheme'], function() {
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

gulp.task('angular-templates', ['markdown'], function() {
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
  gulp.watch('app/**/*.js', ['serverjs']);

  gulp.watch('client/views/**/*', ['angular-templates']);
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
