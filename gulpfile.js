'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

var directories = {
    less: {
        input: './src/flexbox-grid.less',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
        }
    },
    jade: {
        input: './assets/jade/index.jade',
        output: {
            folder: './docs',
            fileName: 'index.html'
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

// Docs
gulp.task('docs-fonts', function() {
    return gulp
        .src(['./assets/fonts/**'])
        .pipe(gulp.dest('./docs/dist/fonts/'));
});

gulp.task('docs-css', function () {
    return gulp
        .src(['./assets/less/stylesheet.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix())
        .pipe(cleanCss())
        .pipe(rename('stylesheet.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./docs/dist/css'));
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
gulp.task('docs', ['docs-fonts', 'docs-css', 'docs-html']);

gulp.task('default', ['build', 'docs']);