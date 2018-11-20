const gulp = require('gulp')
const compass = require('gulp-compass')
const gulpSequence = require('gulp-sequence')
const babel = require('gulp-babel')
const rename = require('gulp-rename')

gulp.task('compass', function(){
    return gulp.src('./public/sass/*.sass')
    .pipe(compass({
        css: './public/css',
        sass: './public/sass'
    }))
})


gulp.task('watch', function(){
    gulp.watch('./public/sass/*.sass',['compass'])
})

gulp.task('default', gulpSequence('compass','watch'))