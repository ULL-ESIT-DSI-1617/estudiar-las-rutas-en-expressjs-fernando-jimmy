'use strict'
var
    gulp = require('gulp'),
    shell = require('gulp-shell');

gulp.task('server', shell.task(
    'node app.js'
));
gulp.task('default', ['server']);

// Tareas para la parte de direccionamiento básico
//Añadir -v al comando curl para mas detalles de la peticion y respuesta

gulp.task('get/',shell.task(
    'curl localhost:3000/'
));
gulp.task('post/peticion', shell.task(
    'curl -X POST localhost:3000/peticion'
));
// ***********************************************
