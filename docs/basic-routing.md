# Direccionamiento básico

El direccionamiento hace referencia a la determinación de cómo responde una aplicación a una petición del cliente que éste realiza mediante una URI y un método de solicitud HTTP específico (GET, POST, DELETE, PUT, etc).

La definición de la ruta tiene la siguiente estructura:
```js
app.METODO(RUTA, MANEJADOR);
```
donde:
* **app** es una instancia de express.
* **METODO** es una método de solicitud HTTP.
* **RUTA** es una ruta de acceso en el servidor.
* **MANEJADOR** es la función que se ejecutará ante la petición con el método y ruta definida.

#### Ejemplos

El siguiente ejemplo responderá con `¡Hola mundo!` en la pagina inicial.
```js
app.get('/', function (req, res) {
    res.send('¡Hola mundo!');
});
```


El siguiente ejemplo responderá con `Petición POST` ante una petición **POST** en la ruta `/peticion`.
```js
app.post('/peticion', function (req, res) {
    res.send('Petición POST');
});
```


##### FUENTES
http://expressjs.com/en/starter/basic-routing.html
