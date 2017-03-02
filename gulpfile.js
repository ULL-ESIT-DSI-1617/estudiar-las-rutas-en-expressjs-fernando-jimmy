'use strict'
var
    gulp = require('gulp'),
    shell = require('gulp-shell');

gulp.task('build', shell.task('node ./scripts/gitbook-build.js', {
    verbose: true
}));
gulp.task('deploy',['build'], shell.task([
    'node ./scripts/gh-pages-deploy.js',
    'node ./scripts/gitbook-deploy.js'],
    { verbose: true}
));
