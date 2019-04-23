var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cssClean = require('gulp-clean-css');

gulp.task('less', function () {
    return gulp.src('./src/app/components/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('components/'))
        .pipe(concat('index.css'))
        .pipe(cssClean())
        .pipe(gulp.dest('css/'))
});