# Sintaxis de la ruta
La ruta de acceso se pueden definir a partir de series, patrones de serie o expresiones regulares.

#### Ejemplos

**Rutas de acceso basadas en series.**

La ruta de acceso coincidirá con `/about`
```js
app.get('/about', function (req, res) {
  res.send('about');
});
```

La ruta de acceso coincidirá con `/random.tex`
```js
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
```

**Rutas de acceso basadas en patrones de serie.**

La ruta de acceso coincidirá con `/acd` y `/abcd`
```js
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
```
La ruta de acceso coincidirá con `/abcd`, `/abbbcd`, etc.
```js
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
```
La ruta de acceso coincidirá con `/abcd`, `/ab123cd`, etc.
```js
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
```
La ruta de acceso coincidirá con `/abe` y `/abcde`
```js
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
```

**Rutas de acceso basadas en expresiones regulares.**

La ruta de acceso coincidirá con cualquier valor con una “a” en el nombre de la ruta.
```js
app.get(/a/, function(req, res) {
  res.send('/a/');
});
```
La ruta de acceso coincidirá con butterfly y dragonfly, pero no con butterflyman, dragonfly man, etc.
```js
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```
