'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var directories = {
    less: {
        input: './less/flexbox-grid.less',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
        }
    },
    minify: {
        input: './less/flexbox-grid.less',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.min.css'
        }
    }
};

gulp.task('less', function () {
    return gulp
        .src(directories.less.input)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix())
        .pipe(rename(directories.less.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.less.output.folder));
});

gulp.task('minify-css', function () {
    return gulp
        .src(directories.minify.input)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix())
        .pipe(minifyCss())
        .pipe(rename(directories.minify.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.minify.output.folder));
});

gulp.task('default', ['less', 'minify-css']);