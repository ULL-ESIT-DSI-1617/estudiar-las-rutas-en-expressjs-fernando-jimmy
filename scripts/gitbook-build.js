'use strict'
var exec = require('child_process').execSync;

console.log('Ejecutando gitbook build...');
exec('./node_modules/.bin/gitbook build ./docs ./_book', {stdio: 'inherit'});
