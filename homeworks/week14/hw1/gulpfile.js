const gulp = require('gulp')
const compass = require('gulp-compass')
const gulpSequence = require('gulp-sequence')

gulp.task('compass', function(){
    return gulp.src('./src/sass/*.sass')
    .pipe(compass({
        css: './dist/css',
        sass: './src/sass'
    }))
})


gulp.task('watch', function(){
    gulp.watch('./src/sass/*.sass',['compass'])
})

gulp.task('default', gulpSequence('compass','watch'))