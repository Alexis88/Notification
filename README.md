# Notification
CUADRO DE NOTIFICACIONES DE ESTILO MINIMALISTA

Este plugin genera cuadros de notificaciones que muestran el contenido que se haya establecido. No requieren de entornos de conexión segura (HTTPS), como sí sucede con la API Notification de JavaScript, por lo que son una alternativa para tales casos.

Ejemplos de uso:

- Pasando un texto simple:
 	Notification.msg("¡Hola!");
	
- Pasando un texto con contenido HTML:
 	Notification.msg("&lt;img src='icons/alert.ico' /&gt; Ha ocurrido un error");
	
- Pasando un objeto con opciones:
 	
	//Texto simple y llamadas de retorno al momento de mostrar y ocultar la notificación
 	
	Notification.msg({
 		text: "¡Hola!",
 		onShow: _ => console.log("La notificación se está mostrando")
 		onHide: _ => console.log("La notificación se ha ocultado");
 	});
	
	//Texto simple y fondo oscuro
	Notification.msg({
		text: "¡Hola!",
		background: true
	});
	
	//Texto simple, fondo oscuro y establecimiento de 5 segundos de visualización de la notificación
	Notification.msg({
		text: "¡Hola!",
		background: true,
		time: 5000 //Si se ha establecido la propiedad "keep" como "true", no se aplicará el tiempo establecido
	});
	
	//Texto simple y tiempo de visualización indefinido (la notificación no se ocultará hasta que se pulse sobre ella)
	Notification.msg({
		text: "¡Hola!",
		keep: true
	});
	
	//Notificaciones anidadas al momento de mostrar y ocultar la notificación inicial
	Notification.msg({
		text: "Este es un ejemplo de notificaciones anidadas",
		onShow: Notification.msg("Se está mostrando la notificación"),
		onHide: Notification.msg("Se ha ocultado la notificación")
	});
