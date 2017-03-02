# Documentación de la API de Router

Un objeto router es una instancia aislada de middleware y rutas. Se comporta como una
middleware, por lo que puedes los puedes usar como argumento para app.use() o como
argumento para otro método .use() de otro router. 

El objeto express de más alto nivel tiene un método Router() para crear un nuevo objeto router.

Cuando el objeto se haya creado, se podrán añadir rutas middleware y de métodos HTTP
(como get, put, post, etc.) como si fuera una aplicación, por ejemplo:
```js
// Invocado para cualquier solicitud.
router.use(function(req, res, next) {
  // Aquí irá código... Como otra middleware por ejemplo.
  next();
});

// Se encargará de cuaquier solicitud al directorio /events
// depende de donde el router sea "usado"
router.get('/events', function(req, res, next) {
  // ..
});
```
Se podrá entonces usar un router para una URL en particular de esta forma, para asi 
separar las rutas en archivos o incluso en "mini-apps".
```js
// solo solicitudes a "/calendar" serán enviadas a nuestro "router".
app.use('/calendar', router);
```

## Métodos

### router.all(path, [callback, ...] callback)

Este método se encarga de todas las solicitudes HTTP. Es extremadamente útil 
para cargar código que tenga que ejecutarse de forma global. Por ejemplo,
si el siguiente código lo escribimos en lo más alto de la jerarquía de las
definiciones de rutas, significaría que cada vez que accedamos a cualquier
directorio, se requerirá de una autenticación.
```js
router.all('*', requireAuthentication, loadUser);
```
De esta forma, al acceder a cualquier directorio, ejecutaremos la callback
"requireAuthentication", seguido de "loadUser" y luego puede haber un "next()" 
para la siguiente middleware.


### router.METHOD(path, [callback, ...] callback)

Este método proporciona la funcionalidad de enrutamiento en Express para solicitudes
HTTP concretas (get, post, etc.)

Se pueden especificar varias callbacks, e incluso alguna puede incluir
"next('route')" para saltarse la invocación de una callback determinada en 
caso de que se cumpla (o no) una condición determinada.

El siguiente ejemplo ilustra la definición más simple de una ruta. 
```js 
router.get('/', function(req, res){
  res.send('hello world');
});
```
También podemos usar expresiones regulares:
```js
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

### router.param(name, callback)

Añade "disparadores" a los parámetros de la ruta, donde "name" es el nombre
del parámetro y callback es una función callback.

Los parámetros de la función callback son:
* req, el objecto solicitud.
* res, el objeto respuesta.
* next, indica la siguiente middleware.
* El valor del parámetro name.
* El nombre del parámetro. 

Por ejemplo, cuando ":user" está presente en el camino de una ruta, puedes
ejecutar código para que automáticamente se facilite "req.user" a la ruta.
```js
router.param('user', function(req, res, next, id) {

  // try to get the user details from the User model and attach it to the request object
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
```

Las funciones callback de param son locales al router en el que son definidas. 
No se heredan en apps o router subsiguientes. Por tanto, las callbakc de param
definidas en router serán ejecutadas solo por parámetros de ruta definidos
en las rutas de router. 

Una callback de param será llamada solo una vez en un ciclo solicitud-respuesta, 
incluso si el parámetro coincide en varias rutas, como se muestra a 
continuación:
```js
router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
});

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

router.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
```
Si ejecutamos GET /user/42, se muestra los siguiente en la consola:
```bash
CALLED ONLY ONCE
although this matches
and this matches too
```

### router.route(path)

Devuelve una instancia de una sola ruta la cual se puede usar para manejar 
peticiones HTTP con middleware opcionales. Usa router.route() para evitar nombres
de ruta duplicados y por tanto, errores de escritura.

Partiendo del ejemplo de router.param() de arriba, el siguiente código muestro como usar router.route() para especificar varios manejadores de métodos HTTP.
```js
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
});
```

### router.use([path], [function, ...] function)

Usa el middleware o middleware especificado, con un punto de montaje path opciones, que por defecto es "/".

Este método es similar al app.use(). 

```js
var express = require('express');
var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function(req, res, next) {
  // ... maybe some additional /bar logging ...
  next();
});

// always invoked
router.use(function(req, res, next) {
  res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
```

El orden de escritura de los middleware es muy importante, pues se ejecutan 
en orden secuencial, de arriba a abajo. Lo normal es poner como primer middleware
uno de autenticación.
```js
var logger = require('morgan');

router.use(logger());
router.use(express.static(__dirname + '/public'));
router.use(function(req, res){
  res.send('Hello');
});
```

Este ejemplo proporciona archivos desde el directorio "/public" y si no se encuentran ahí, 
busca en los demás y así sucesivamente:
```js
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```


