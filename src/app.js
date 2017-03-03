'use strict'
var
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    birds = require('./birds.js'),
    router = express.Router();

/* DIRECCIONAMIENTO */

// Express.router()

app.use('/birds', birds);

// Direccionamiento básico
app.get('/', (req, res)=>{
    res.send('¡Hola mundo!');
});
app.post('/peticion', (req,res)=>{
    res.send('Petición POST');
})

// Metodos de ruta
app.all('/all-methods', function (req, res, next) {
    res.send('Middleware para la ruta "/all-methods y todos los metodos soportados por ExpressJS"');
});

// Sintaxis de la ruta
app.get('/about', function (req, res) {
  res.send('about');
});
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
app.get(/a/, function(req, res,next) {
  console.log('/a/');
  next();
});
app.get(/.*fly$/, function(req, res,next) {
  console.log('/.*fly$/');
  next();
});

// Parámetros de ruta
app.get('/users/:userId/books/:bookId?', function (req, res) {
  res.send(req.params)
})

//Manejadores de Rutas
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

// app.route()
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
});

/* END DIRECCIONAMIENTO */

/* MIDDLEWARE */
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

//Middleware con router
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

/* END MIDDLEWARE*/

app.listen(port,(err)=>{
    if (err){
        console.log('error:', err);
        return
    }
    console.log(`Servidor corriendo en el puerto ${port}`);
})
