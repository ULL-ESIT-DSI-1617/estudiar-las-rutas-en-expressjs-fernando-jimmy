'use strict'
var
    exec = require('child_process').execSync,
    gitbook_repo = require('../package.json').repository.gitbook;

console.log('Desplegando libro en Gitbook...');
exec(`git push --force ${gitbook_repo} master`, {stdio: 'inherit'});
