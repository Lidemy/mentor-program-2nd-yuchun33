var gulp = require('gulp')
var compass = require('gulp-compass')
var minifyCSS = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var pump = require('pump')
var rename = require('gulp-rename')
var gulpSequence = require('gulp-sequence')

gulp.task('compass', function(){
    return gulp.src('./sass/*.sass')
    .pipe(compass({
        css:'./done',
        sass:'./sass/'
    }))
})

gulp.task('minify-css',function(){
    return gulp.src('./done/*.css')
    .pipe(minifyCSS({
        keepBreaks: true
    }))
    .pipe(rename(function(path){
        path.basename += '_compass'
    }))
    .pipe(gulp.dest('./build'))
})

gulp.task('babel',function(){
    return gulp.src("./main.js")
    .pipe(babel())
    .pipe(rename(function(path){
        path.basename += '_ES5'
    }))
    .pipe(gulp.dest('./build'))
})


gulp.task('uglify',function(cb){
    pump([
        gulp.src('./build/main_ES5.js'),
        uglify(),
        rename(function(path){
            path.basename += '_compass'
        }),
        gulp.dest('./build')
    ],cb)

})

gulp.task('default',gulpSequence('compass','minify-css','babel','uglify'))