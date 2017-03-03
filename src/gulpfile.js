'use strict'
var
    gulp = require('gulp'),
    argv = require('yargs')
                    .alias('m','method')
                    .alias('r','route')
                    .default({m:'get', r: '/'})
                    .argv,
    shell = require('gulp-shell');

var method = argv.method;
var url = 'localhost:3000';

method = method.toUpperCase();
url += argv.route[0]=='/'? argv.route: '/'+argv.route;

console.log("Metodo:", method);
console.log("URL:", url);
gulp.task('server', shell.task(
    'node app.js'
));
gulp.task('default', ['request']);
//Añadir -v al comando curl para mas detalles de la peticion y respuesta

gulp.task('request', shell.task(
    `curl -X ${method} ${url}`
));
