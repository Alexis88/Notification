# Notification.js
**CUADRO DE NOTIFICACIONES DE ESTILO MINIMALISTA**

Este *plugin* genera cuadros de notificaciones personalizadas con un estilo minimalista. Algunas de sus características principales:

- No requiere de entornos de conexión segura (HTTPS), como sí sucede con la API Notification de JavaScript, por lo que es una buena alternativa para tales casos.
- Se pueden mostrar varias notificaciones al mismo tiempo sin que se solapen unas con otras.
- Se cierran con tan solo pulsar sobre ellas.
- Se adaptan a las dimensiones del dispositivo (*full responsive*).

# Datos permitidos:

```javascript
Notification.msg("Cadena de caracteres (puede incluir etiquetas HTML)");

Notification.msg({
	text: Cualquier cadena de caracteres (puede incluir etiquetas HTML),
	background: Valor lógico (true o false) que establece si se mostrará un cuadro oscuro de fondo,
	time: Valor numérico entero que establece el tiempo en milésimas de segundo durante el cual se mostrará la notificación (por defecto es 3000),
	keep: Valor lógico (true o false) que establece si la notificación se mostrará permanentemente o no (por defecto es false),
	onShow: Función que se ejecutará luego de que se muestre la notificación,
	onHide: Función que se ejecutará luego de que se oculte la notificación
});
```

# Ejemplos de uso:

- Pasando un texto simple:

	```javascript
	Notification.msg("¡Hola!");
	```

- Pasando una etiqueta HTML como texto:

	```javascript
	Notification.msg("<img src='icons/caution.ico' />");
	```
	
- Pasando un texto con contenido HTML:

	```javascript
	Notification.msg("<img src='icons/alert.ico' /> Ha ocurrido un error");
	```
	
- Texto simple y llamadas de retorno al momento de mostrar y ocultar la notificación:

	```javascript
	Notification.msg({
		text: "¡Hola!",
		onShow: _ => console.log("La notificación se está mostrando"),
		onHide: _ => console.log("La notificación se ha ocultado")
	});
	```
	
	
- Texto simple y fondo oscuro:

	```javascript
	Notification.msg({
		text: "¡Hola!",
		background: true
	});
	```

- Texto simple, fondo oscuro y establecimiento de 5 segundos de visualización de la notificación:

	```javascript
	Notification.msg({
		text: "¡Hola!",
		background: true,
		time: 5000 //Si se ha establecido la propiedad "keep" como "true", no se aplicará el tiempo establecido
	});
	```

- Texto simple y tiempo de visualización indefinido (la notificación no se ocultará hasta que se pulse sobre ella):
	
	```javascript
	Notification.msg({
		text: "¡Hola!",
		keep: true
	});
	```

- Notificaciones anidadas al momento de mostrar y ocultar la notificación inicial:

	```javascript
	Notification.msg({
		text: "Este es un ejemplo de notificaciones anidadas",
		onShow: Notification.msg("Se está mostrando la notificación"),
		onHide: Notification.msg("Se ha ocultado la notificación")
	});
	```
