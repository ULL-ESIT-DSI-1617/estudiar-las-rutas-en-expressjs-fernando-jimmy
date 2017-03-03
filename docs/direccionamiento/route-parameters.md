# Parámetros de ruta
Los parámetros de ruta son segmentos de esta que son usadas para capturar un valor especifico. Se podrán acceder a estos valores a través del objeto `req.params`
> Route path: /users/:userId/books/:bookId

> Request URL: http://localhost:3000/users/34/books/8989

> req.params: { "userId": "34", "bookId": "8989" }

#### Parámetros opciones
Se pueden establecer parámetros opcionales de la siguiente forma:

```js
app.get('/users/:userId/books/:bookId?', function (req, res) {
  res.send(req.params)
})
```
De esta forma, no será obligatorio pasar un valor para el parámetro `bookId` en la ruta.

#### Carácter permitidos
El nombre de los parámetros de ruta debe esta formado por caracteres `([A-Za-z0-9_])`
