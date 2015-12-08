'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

var directories = {
    less: {
        input: './less/flexbox-grid.less',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
        }
    },
    jade: {
        input: './resources/jade/index.jade',
        output: {
            folder: './docs',
            fileName: 'index.html'
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


gulp.task('docs-css', function () {
    return gulp
        .src(['./resources/less/stylesheet.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix())
        .pipe(minifyCss())
        .pipe(rename('stylesheet.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./docs/dist'));
});

gulp.task('docs-html', function () {
    return gulp
        .src(directories.jade.input)
        .pipe(jade({
            pretty: true
        }))
        .pipe(rename(directories.jade.output.fileName))
        .pipe(gulp.dest(directories.jade.output.folder));
});

gulp.task('default', ['less', 'minify-css', 'docs-css', 'docs-html']);