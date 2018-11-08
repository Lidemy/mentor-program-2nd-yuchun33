var gulp = require('gulp')
var compass = require('gulp-compass')
var minifyCSS = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var rename = require('gulp-rename')
var gulpSequence = require('gulp-sequence')

// return 是非同步，才可以確保用的檔案是轉換好的

//轉成 css
gulp.task('compass', function(){

    return gulp.src('./sass/*.sass')
    .pipe(compass({
        css:'./done',
        sass:'./sass/'
    }))
})

//壓縮 css
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

//轉 ES5
gulp.task('babel',function(){
    return gulp.src("./main.js")
    .pipe(babel())
    .pipe(rename(function(path){
        path.basename += '_ES5'
    }))
    .pipe(gulp.dest('./build'))
})

//壓縮 js
gulp.task('uglify',function(){
    return gulp.src('./build/main_ES5.js')
    .pipe(uglify())
    .pipe(rename(function(path){
        path.basename += '_compass'
    }))
    .pipe(gulp.dest('./build'))
})

//監聽：一有變化就可以自動轉換
gulp.task('watch', function(){
    watch('./sass/*.sass',['compass'])
    watch('./done/*.css',['minify-css'])
    watch('./main.js',['babel'])
    watch('./build/main_ES5.js',['uglify'])
})

gulp.task('default',gulpSequence('compass','minify-css','babel','uglify','watch'))