'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var directories = {
    less: {
        input: './src/flexbox-grid.less',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
        }
    },
    minify: {
        input: './src/flexbox-grid.less',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.min.css'
        }
    }
};

// Dist
gulp.task('dist-css', function () {
    return gulp
        .src(directories.less.input)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix())
        .pipe(rename(directories.less.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.less.output.folder));
});

gulp.task('dist-minify', function () {
    return gulp
        .src(directories.minify.input)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix())
        .pipe(cleanCss())
        .pipe(rename(directories.minify.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.minify.output.folder));
});

gulp.task('build', ['dist-css', 'dist-minify']);

gulp.task('default', ['build']);