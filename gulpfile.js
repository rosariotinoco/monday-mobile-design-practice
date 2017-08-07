var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create(),
watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
      .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {

  browserSync.init({
        notify: false,
        server: {
          baseDir: 'app'
        }
      });

  watch('./app/index.html', function() {
    gulp.start('html');
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

});
