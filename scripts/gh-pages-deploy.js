'use strict'
var
    ghpages = require('gh-pages'),
    git_repo = require('../package.json').repository.url;

console.log('Desplegando libro en Github...');
ghpages.publish('./_book',{repo: git_repo}, (error)=>{
    if(error) {
        console.error('Algo salió mal :(');
        console.error(error);
        return;
    }
    console.log('gh-pages actualizado');

});
