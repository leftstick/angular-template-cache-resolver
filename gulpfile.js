'use strict';

var gulp = require('gulp');

gulp.task('default', function() {
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var rename = require('gulp-rename');

    return gulp.src('./angular-template-cache-resolver.js')
        .pipe(sourcemaps.init())
        .pipe(rename({
            basename: 'angular-template-cache-resolver.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./', {
            sourceRoot: '.'
        }))
        .pipe(gulp.dest('./'));
});
