# Manejadores de rutas
Se pueden establecer varias funciones manejadoras para un misma petición. Esto se realizar por la invocacion de un tercer parámetro `next()`.

#### Ejemplos

Función manejadora final. No hace uso del parámetro `next()`

```js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
```


Funciones manejadoras anidadas. La primera función deberá invocar a `next()` para pasar a la siguiente función.

```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```


Vector de funciones manjeadoras.

```js
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

```

Combinación de funciones independientes y vector de funciones manejadoras.

```js

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
```
