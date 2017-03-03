# Métodos de respuesta
Los métodos del objeto respuesta (res) de la tabla siguiente, pueden enviar una respuesta a la petición del cliente y terminar el ciclo de solicitud/respuestas.

| Método | Descripción |
| ---------- | ---------- |
|res.download() |	Solicita un archivo para descargarlo.|
|res.end() | 	Finaliza el proceso de respuesta.|
|res.json() | 	Envía una respuesta JSON.|
|res.jsonp() | 	Envía una respuesta JSON con soporte JSONP.|
|res.redirect() |	Redirecciona una solicitud.|
|res.render()| 	Representa una plantilla de vista.|
|res.send() 	|Envía una respuesta de varios tipos.|
|res.sendFile() |	Envía un archivo como una secuencia de octetos.|
|res.sendStatus() | 	Establece el código de estado de la respuesta y envía su representación de serie como el cuerpo de respuesta.|
