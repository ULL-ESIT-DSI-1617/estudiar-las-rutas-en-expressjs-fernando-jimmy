# express.Router
Se utilizar la clase `express.Router` para crear manejadores de rutas de forma modular. En archivos independientes.

#### Ejemplo

Archivo **birds.js**:
```js
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
```
Archivo de la aplicacion:

```js
var birds = require('./birds');
...
app.use('/birds', birds);
```
La aplicación ahora podrá manejar solicitudes a `/birds` y `/birds/about`, así como invocar la función de middleware **timeLog** que es específica de la ruta.
