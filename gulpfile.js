var gulp = require('gulp'); 
var del = require('del'); 
var fontAwesomeStylus = require("fa-stylus");
var stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
 
gulp.task('clean:build', function() {
    del('./css/*')
})

gulp.task("build", function(){
  return gulp.src('./stylus/index.styl')
    .pipe(stylus({
      use: [ 
        fontAwesomeStylus(),
      ], 
    }))
    .pipe(gulp.dest('./css/'));

})
 
gulp.task('watch', function() {

  gulp.watch('./stylus/*.*', gulp.series('build'));
 
});

gulp.task('serve', function() {
  browserSync.init({
    startPath:'/index.html',
    proxy: 'http://newportfolio.dev/'
  });

  browserSync.watch('./**/*.*').on('change', browserSync.reload);
});
gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);
