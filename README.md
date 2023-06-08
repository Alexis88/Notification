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



<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Test</title>
	<link rel="icon" type="image/ico" href="test.ico" />
	<style type="text/css">
		#formulario{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 55vw;
			max-height: 70vh;
		}

		#formulario > div{
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
			justify-content: center;
		}

		#formulario > div > label{
			color: #FFFFEF;
		}

		#container{
			display: block;
			margin: 0 auto;
		}

		.carousel{
			width: 100px;
			height: 100px;
			position: absolute;
			display: none;
		}

		.button{
			display: inline-block;
			vertical-align: middle;
			background-color: #A2AAC1;
			border: .1rem gray solid;
			user-select: none;
			padding: .5rem;
		}

		@media (hover: hover){
			.button:hover{
				cursor: pointer;
				filter: brightness(1.1);
			}
		}

		[class*='show']{
			display: block;
			margin: 0 auto;
		}

		.showOne{
			background-color: #CD5C5C;
			border: .1rem #F0FFF0 dotted;
		}

		.showTwo{
			background-color: #FFFACD;
			border: .1rem #556B2F dotted;
		}

		.showThree{
			background-color: #6495ED;
			border: .1rem #B8860B dotted;
		}		
	</style>
</head>
<body>
	<button id="modal">Modal</button>
	<button id="notification">Notification</button>	
	<button id="prompt">Prompt</button>
	<button id="confirm">Confirm</button>	
	<script type="text/javascript" src="modal.js"></script>
	<script type="text/javascript" src="notification.js"></script>
	<script type="text/javascript" src="prompt.js"></script>
	<script type="text/javascript" src="confirm.js"></script>
	<script type="text/javascript">
		document.addEventListener("click", e => {
			let out = document.body;

			switch (e.target.id){
				case "modal":
					Modal.show(`<h1>LOREM IPSUM</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac magna sagittis, pellentesque purus eget, rutrum diam. Phasellus a magna quis augue vehicula dictum sit amet sed mauris. Nullam luctus et dolor sit amet laoreet. Aliquam quis erat elit. Curabitur consequat volutpat turpis nec blandit. Vestibulum ut nisl eget ex dictum blandit. Pellentesque ullamcorper ultricies odio, eget rhoncus quam viverra et. Phasellus at neque quam. Cras varius augue ut diam vestibulum bibendum. Vivamus dapibus, magna in iaculis pharetra, mi diam cursus ex, vitae rutrum est arcu vitae magna. Vestibulum ultrices pharetra odio, ac lacinia eros convallis eget. Integer aliquet sodales felis, sed eleifend ante. Donec condimentum massa sed metus viverra pharetra.

Nunc vitae nisi a arcu sollicitudin pellentesque. Proin at ornare ligula. Fusce ullamcorper odio eros, ac tempor mi fermentum sed. Phasellus consequat congue efficitur. Mauris tincidunt elit id nibh ultricies finibus. Nunc varius vitae felis ac pharetra. Aenean sit amet libero ut nibh egestas scelerisque ac eu odio. In quam justo, efficitur non rutrum a, ullamcorper ac libero. Nam tincidunt lobortis fringilla. Etiam ut elit vitae mauris viverra tempus at at ipsum. Ut in commodo magna, ac euismod nulla. Vivamus sit amet risus congue, bibendum tellus et, sagittis elit. Ut eget dui et purus imperdiet rhoncus hendrerit at ipsum. Aliquam pellentesque imperdiet semper.

Morbi quis mauris in velit posuere cursus ut condimentum neque. Curabitur porta consectetur ex vitae aliquam. Maecenas laoreet ultricies ultrices. Pellentesque luctus porta viverra. Nulla fermentum sapien sit amet egestas lobortis. Duis in cursus erat, vitae rhoncus ipsum. Suspendisse potenti. Quisque cursus eros mi, at gravida est euismod et. Morbi vel feugiat turpis, a laoreet massa. Mauris interdum elementum semper. Cras lorem enim, imperdiet sed ex ut, dictum viverra nisl.

Etiam accumsan commodo sapien et interdum. Ut non scelerisque felis. Cras luctus suscipit velit. Vivamus scelerisque consectetur leo vel laoreet. Nulla venenatis laoreet consequat. In facilisis posuere feugiat. Nam egestas, ex eu varius maximus, nulla dolor viverra augue, eget tincidunt enim risus ut purus. Nunc rhoncus tempor massa at commodo. Nulla id velit ligula. Aenean accumsan ornare mi, et faucibus tortor iaculis iaculis. Duis iaculis nisi eget arcu rutrum accumsan. Duis feugiat quam quis ipsum luctus finibus. Donec vestibulum tortor mauris, ut eleifend arcu pulvinar non. Ut id rutrum leo. Phasellus condimentum, arcu at vestibulum porttitor, ante leo tempus metus, eget venenatis dolor nibh ut quam. Maecenas lectus sem, mollis eget lectus sed, facilisis tincidunt lacus.

Ut gravida tincidunt nibh, a pharetra tellus scelerisque nec. Quisque ultrices ex vel sagittis faucibus. Sed lobortis venenatis augue, a ultrices leo tempus vitae. Mauris non sodales enim. Nullam condimentum diam at leo fermentum, non placerat nisl venenatis. Duis pretium, dui et varius dignissim, dui nisl tristique neque, eu sagittis odio neque id neque. Cras arcu odio, laoreet nec elit vitae, lobortis gravida ante. Suspendisse eros risus, tincidunt et arcu et, fringilla mollis mauris. Nam pulvinar, ipsum placerat semper ultrices, lorem massa pulvinar libero, in pulvinar urna neque et diam. In consequat sagittis cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec pharetra ex in lacinia suscipit. Proin et congue magna. Pellentesque nec ullamcorper lacus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac magna sagittis, pellentesque purus eget, rutrum diam. Phasellus a magna quis augue vehicula dictum sit amet sed mauris. Nullam luctus et dolor sit amet laoreet. Aliquam quis erat elit. Curabitur consequat volutpat turpis nec blandit. Vestibulum ut nisl eget ex dictum blandit. Pellentesque ullamcorper ultricies odio, eget rhoncus quam viverra et. Phasellus at neque quam. Cras varius augue ut diam vestibulum bibendum. Vivamus dapibus, magna in iaculis pharetra, mi diam cursus ex, vitae rutrum est arcu vitae magna. Vestibulum ultrices pharetra odio, ac lacinia eros convallis eget. Integer aliquet sodales felis, sed eleifend ante. Donec condimentum massa sed metus viverra pharetra.

Nunc vitae nisi a arcu sollicitudin pellentesque. Proin at ornare ligula. Fusce ullamcorper odio eros, ac tempor mi fermentum sed. Phasellus consequat congue efficitur. Mauris tincidunt elit id nibh ultricies finibus. Nunc varius vitae felis ac pharetra. Aenean sit amet libero ut nibh egestas scelerisque ac eu odio. In quam justo, efficitur non rutrum a, ullamcorper ac libero. Nam tincidunt lobortis fringilla. Etiam ut elit vitae mauris viverra tempus at at ipsum. Ut in commodo magna, ac euismod nulla. Vivamus sit amet risus congue, bibendum tellus et, sagittis elit. Ut eget dui et purus imperdiet rhoncus hendrerit at ipsum. Aliquam pellentesque imperdiet semper.

Morbi quis mauris in velit posuere cursus ut condimentum neque. Curabitur porta consectetur ex vitae aliquam. Maecenas laoreet ultricies ultrices. Pellentesque luctus porta viverra. Nulla fermentum sapien sit amet egestas lobortis. Duis in cursus erat, vitae rhoncus ipsum. Suspendisse potenti. Quisque cursus eros mi, at gravida est euismod et. Morbi vel feugiat turpis, a laoreet massa. Mauris interdum elementum semper. Cras lorem enim, imperdiet sed ex ut, dictum viverra nisl.

Etiam accumsan commodo sapien et interdum. Ut non scelerisque felis. Cras luctus suscipit velit. Vivamus scelerisque consectetur leo vel laoreet. Nulla venenatis laoreet consequat. In facilisis posuere feugiat. Nam egestas, ex eu varius maximus, nulla dolor viverra augue, eget tincidunt enim risus ut purus. Nunc rhoncus tempor massa at commodo. Nulla id velit ligula. Aenean accumsan ornare mi, et faucibus tortor iaculis iaculis. Duis iaculis nisi eget arcu rutrum accumsan. Duis feugiat quam quis ipsum luctus finibus. Donec vestibulum tortor mauris, ut eleifend arcu pulvinar non. Ut id rutrum leo. Phasellus condimentum, arcu at vestibulum porttitor, ante leo tempus metus, eget venenatis dolor nibh ut quam. Maecenas lectus sem, mollis eget lectus sed, facilisis tincidunt lacus.

Ut gravida tincidunt nibh, a pharetra tellus scelerisque nec. Quisque ultrices ex vel sagittis faucibus. Sed lobortis venenatis augue, a ultrices leo tempus vitae. Mauris non sodales enim. Nullam condimentum diam at leo fermentum, non placerat nisl venenatis. Duis pretium, dui et varius dignissim, dui nisl tristique neque, eu sagittis odio neque id neque. Cras arcu odio, laoreet nec elit vitae, lobortis gravida ante. Suspendisse eros risus, tincidunt et arcu et, fringilla mollis mauris. Nam pulvinar, ipsum placerat semper ultrices, lorem massa pulvinar libero, in pulvinar urna neque et diam. In consequat sagittis cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec pharetra ex in lacinia suscipit. Proin et congue magna. Pellentesque nec ullamcorper lacus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac magna sagittis, pellentesque purus eget, rutrum diam. Phasellus a magna quis augue vehicula dictum sit amet sed mauris. Nullam luctus et dolor sit amet laoreet. Aliquam quis erat elit. Curabitur consequat volutpat turpis nec blandit. Vestibulum ut nisl eget ex dictum blandit. Pellentesque ullamcorper ultricies odio, eget rhoncus quam viverra et. Phasellus at neque quam. Cras varius augue ut diam vestibulum bibendum. Vivamus dapibus, magna in iaculis pharetra, mi diam cursus ex, vitae rutrum est arcu vitae magna. Vestibulum ultrices pharetra odio, ac lacinia eros convallis eget. Integer aliquet sodales felis, sed eleifend ante. Donec condimentum massa sed metus viverra pharetra.

Nunc vitae nisi a arcu sollicitudin pellentesque. Proin at ornare ligula. Fusce ullamcorper odio eros, ac tempor mi fermentum sed. Phasellus consequat congue efficitur. Mauris tincidunt elit id nibh ultricies finibus. Nunc varius vitae felis ac pharetra. Aenean sit amet libero ut nibh egestas scelerisque ac eu odio. In quam justo, efficitur non rutrum a, ullamcorper ac libero. Nam tincidunt lobortis fringilla. Etiam ut elit vitae mauris viverra tempus at at ipsum. Ut in commodo magna, ac euismod nulla. Vivamus sit amet risus congue, bibendum tellus et, sagittis elit. Ut eget dui et purus imperdiet rhoncus hendrerit at ipsum. Aliquam pellentesque imperdiet semper.

Morbi quis mauris in velit posuere cursus ut condimentum neque. Curabitur porta consectetur ex vitae aliquam. Maecenas laoreet ultricies ultrices. Pellentesque luctus porta viverra. Nulla fermentum sapien sit amet egestas lobortis. Duis in cursus erat, vitae rhoncus ipsum. Suspendisse potenti. Quisque cursus eros mi, at gravida est euismod et. Morbi vel feugiat turpis, a laoreet massa. Mauris interdum elementum semper. Cras lorem enim, imperdiet sed ex ut, dictum viverra nisl.

Etiam accumsan commodo sapien et interdum. Ut non scelerisque felis. Cras luctus suscipit velit. Vivamus scelerisque consectetur leo vel laoreet. Nulla venenatis laoreet consequat. In facilisis posuere feugiat. Nam egestas, ex eu varius maximus, nulla dolor viverra augue, eget tincidunt enim risus ut purus. Nunc rhoncus tempor massa at commodo. Nulla id velit ligula. Aenean accumsan ornare mi, et faucibus tortor iaculis iaculis. Duis iaculis nisi eget arcu rutrum accumsan. Duis feugiat quam quis ipsum luctus finibus. Donec vestibulum tortor mauris, ut eleifend arcu pulvinar non. Ut id rutrum leo. Phasellus condimentum, arcu at vestibulum porttitor, ante leo tempus metus, eget venenatis dolor nibh ut quam. Maecenas lectus sem, mollis eget lectus sed, facilisis tincidunt lacus.

Ut gravida tincidunt nibh, a pharetra tellus scelerisque nec. Quisque ultrices ex vel sagittis faucibus. Sed lobortis venenatis augue, a ultrices leo tempus vitae. Mauris non sodales enim. Nullam condimentum diam at leo fermentum, non placerat nisl venenatis. Duis pretium, dui et varius dignissim, dui nisl tristique neque, eu sagittis odio neque id neque. Cras arcu odio, laoreet nec elit vitae, lobortis gravida ante. Suspendisse eros risus, tincidunt et arcu et, fringilla mollis mauris. Nam pulvinar, ipsum placerat semper ultrices, lorem massa pulvinar libero, in pulvinar urna neque et diam. In consequat sagittis cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec pharetra ex in lacinia suscipit. Proin et congue magna. Pellentesque nec ullamcorper lacus.</p>`);
					Modal.show({url: `ejemplo.html?id=${new Date().getTime()}`});
					Modal.show({
						url: `form.html?id=${new Date().getTime()}`,
						onShow: _ => console.log("Modal con contenido externo: ABIERTA"),
						onHide: _ => console.log("Modal con contenido externo: CERRADA"),
						onError: error => Notification.msg(error),
						css: {
							front: {
								backgroundColor: "#15202B",
								color: "#FFFFEF",
								border: "1px #FFFFEF solid",
								borderRadius: "1rem"
							},
							close: {
								color: "#FFFFEF"
							}
						}
					});
					Modal.show({
						text: "<img src='zorro.jpg' />",
						media: true
					});
					Modal.show({
						url: "zorro.html",
						media: true,
						onShow: front => {
							front.addEventListener("click", _ => {
								front.animate([
									{transform: "scaleY(1)"},
									{transform: "scaleY(0)"}
								], {duration: 1000});

								if (front.src.includes("zorro.jpg")){									
									setTimeout(_ => {
										front.src = "claudia.jpg";
										front.style.transform = "scaleY(0)";
										front.animate([
											{transform: "scaleY(0)"},
											{transform: "scaleY(1)"}
										], {duration: 1000});										
										setTimeout(_ => {
											front.style.transform = "scaleY(1)";
											Modal.resize();
										}, 1000);
									}, 1000);
								}
								else{
									setTimeout(_ => {
										front.src = "zorro.jpg";
										front.style.transform = "scaleY(0)";
										front.animate([
											{transform: "scaleY(0)"},
											{transform: "scaleY(1)"}
										], {duration: 1000});
										setTimeout(_ => {
											front.style.transform = "scaleY(1)";
											Modal.resize();
										}, 1000);
									}, 1000);
								}								
							}, false);
						}
					});
					break;
				case "notification":
					Notification.msg("Esta es una prueba A");
					Notification.msg("Esta es una prueba B");
					Notification.msg("Esta es una prueba C");
					Notification.msg({
						text: "Esta es una prueba D",
						onShow: _ => Notification.msg("Se está mostrando la notificación D"),
						onHide: _ => Notification.msg("Se ha ocultado la notificación D")
					});
					setTimeout(_ => Notification.msg("Esta es una prueba E"), 3000);
					break;
				case "prompt":
					Prompt.go("Esta es una prueba");
					setTimeout(_ => Prompt.go({
						mensaje: "Esta es otra prueba",
						callback: _ => console.log("<p>Prompt: Fin de la prueba</p>")
					}), 2000);
					break;
				case "confirm":
					Confirm.go({
						pregunta: "¿Es esta otra prueba?",
						callback: _ => Notification.msg(confirm("¿Estás seguro?") ? "¡Muy bien!" : "Okay!")
					});
					break;
			}

			//Si se pulsa alguno de los botones
			if (e.target.classList.contains("button")){
				//Se ejecuta la función 'showDiv' a la cual se le pasa al botón y su clase
				showDiv(e.target, e.target.className);
			}
		}, false);

		const showDiv = (btn, cls) => {
				//Se obtiene el número de botón del conjunto de botones
			let index = [...document.querySelectorAll(`.${cls}`)].indexOf(btn),

				//Se obtiene al <div> que contenga una clase que empiece por 'show'
				visible = document.querySelector("[class*='show']"),

				//Arreglo con el complemento del nombre de las clases que colorean a los <div>
				showClass = ["One", "Two", "Three"],

				//Aquí se almacenará la posición del <div>, dentro del conjunto de <div>, que sea visible al momento de pulsar un botón
				indexVisible;
  
  			//Si hay algún <div> visible
			if (visible){
				//Se obtiene la posición del <div>
				indexVisible = [...document.querySelectorAll(".carousel")].indexOf(visible);

				//Se le quita la clase que lo hace visible
				visible.classList.remove(`show${showClass[indexVisible]}`);
			}

			//Se añade al <div> la clase que corresponda con el n° de botón
			document.querySelectorAll(".carousel")[index].classList.add(`show${showClass[index]}`);
		};	
	</script>
</body>
</html>
