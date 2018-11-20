'use strict';

var gulp = require('gulp');
var compass = require('gulp-compass');
var gulpSequence = require('gulp-sequence');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

gulp.task('compass', function () {
    return gulp.src('./public/sass/*.sass').pipe(compass({
        css: './build/public/css',
        sass: './public/sass/'
    }));
});

gulp.task('babel', function () {
    return gulp.src("./**/*.js").pipe(babel()).pipe(rename(function (path) {
        path.basename += '_ES5';
    })).pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('./public/sass/*.sass', ['compass']);
    gulp.watch('./**/*.js', ['babel']);
});

gulp.task('default', gulpSequence('compass', 'babel', 'watch'));