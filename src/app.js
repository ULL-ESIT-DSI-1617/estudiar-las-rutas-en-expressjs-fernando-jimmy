'use strict'
var
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

//Direccionamiento básico
app.get('/', (req, res)=>{
    res.send('¡Hola mundo!');
});
app.post('/peticion', (req,res)=>{
    res.send('Petición POST');
})
app.listen(port,(err)=>{
    if (err){
        console.log('error:', err);
        return
    }
    console.log(`Servidor corriendo en el puerto ${port}`);
})
