'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var directories = {
    less: {
        input: './src/flexboxgrid.less',
        output: {
            folder: './dist',
            fileName: 'flexboxgrid.css'
        }
    },
    minify: {
        input: './src/flexboxgrid.less',
        output: {
            folder: './dist',
            fileName: 'flexboxgrid.min.css'
        }
    }
};

// Dist
function distCss() {
    return gulp
        .src(directories.less.input)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix())
        .pipe(rename(directories.less.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.less.output.folder));
}

function distMinify() {
    return gulp
        .src(directories.minify.input)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix())
        .pipe(cleanCss())
        .pipe(rename(directories.minify.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.minify.output.folder));
}

var build = gulp.series(gulp.parallel(distCss, distMinify));

gulp.task('build', build);

gulp.task('default', build);
