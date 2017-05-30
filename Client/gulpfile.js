var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
var less          = require('gulp-less');
var cleanCSS      = require('gulp-clean-css');
var header        = require('gulp-header');
var pkg           = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
' */\n',
''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
  return gulp.src('less/clean-blog.less')
  .pipe(less())
  .pipe(header(banner, { pkg: pkg }))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
  return gulp.src('css/clean-blog.css')
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('image', function() {
  return gulp.src('img/*.jpg')
  .pipe(gulp.dest('./build/image'))
  .pipe(browserSync.reload({
    stream: true
  }))
});


// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('./build/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('./build/vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('./build/vendor/font-awesome'))
})


// Where our files are located
var jsFiles   = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('browserify', ['views'], function() {
  return browserify('./src/js/app.js')
  .transform(babelify, {presets: ["es2015"]})
  .transform(ngAnnotate)
  .bundle()
  .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/'));
    });

gulp.task('html', function() {
  return gulp.src("src/index.html")
  .on('error', interceptErrors)
  .pipe(gulp.dest('./build/'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
  .pipe(templateCache({
    standalone: true
  }))
  .on('error', interceptErrors)
  .pipe(rename("app.templates.js"))
  .pipe(gulp.dest('./src/js/config/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify'], function() {
  var html = gulp.src("build/index.html")
  .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));

  return merge(html,js);
});

gulp.task('default', ['less', 'minify-css', 'html', 'browserify', 'copy' ,'image'], function() {

  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });


  gulp.watch('less/*.less', ['less']);
  gulp.watch('css/*.css', ['minify-css']);
  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
});
