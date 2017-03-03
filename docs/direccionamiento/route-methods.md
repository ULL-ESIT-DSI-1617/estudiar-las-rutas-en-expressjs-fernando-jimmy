# Métodos de ruta
Un método de ruta se deriva de unos de los métodos HTTP, de los cuales Express da soporte a
`get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search y connect.`

Hay un método de direccionamiento especial `app.all()`, que no se deriva de ningún método HTTP. Este método se utiliza para cargar funciones [middleware](../Middlewares/using-middlewares.md) para una determinada ruta y todos los métodos de solicitud.

#### Ejemplos

En el siguiente ejemplo, el manejador se ejecutará para las solicitudes a `/all-methods`, y para todos los metodos HTTP soportados por Express.

```js
app.all('/all-methods', function (req, res, next) {
  res.send('Middleware para la ruta "/all-methods y todos los metodos soportados por ExpressJS"');
});
```
