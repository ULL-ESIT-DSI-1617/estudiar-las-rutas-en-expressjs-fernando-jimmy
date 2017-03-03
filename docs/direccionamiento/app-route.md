# app.route()
Mediante `app.route()` se pueden crear manejadores de rutas encadenadas, especificando simplemente la ruta de acceso.

#### Ejemplo
```js
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
```
