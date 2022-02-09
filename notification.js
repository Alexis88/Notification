/**
 * Notification personalizado
 * 
 * Este script genera un cuadro de notificación. Se muestra en la esquina inferior 
 * izquierda de la pantalla del dispositivo, ocultándose automáticamente después de 
 * cuatro segundos o pulsando sobre la notificación. Puede mostrar varias notificaciones 
 * a la vez, las cuales se irán mostrando una sobre otra e irán desplazándose hacia abajo 
 * conforme las notificaciones anteriores vayan ocultándose.
 * 
 * MODO DE USO: Notification.msg("El mensaje a mostrar", Una función de llamada de retorno (opcional));
 * 
 * 
 * @author		Alexis López Espinoza
 * @version		1.0
 * @param		{mensaje}		String		El mensaje a mostrar en la notificación
 * @param		{callback}		Function	Una función de llamada de retorno que se ejecutará 
 * 											cuando se oculte la notificación. Esta llamada de 
 * 											retorno es opcional.
 */

"use strict";

let Notification = {
	box: null,
	texto: "",

	create: (texto, callback) => {
		//Almacenamos la llamada de retorno
		Notification.callback = callback || null;

		Notification.box = document.createElement("span");
		Notification.box.style.display = "block";
		Notification.box.style.position = "fixed";
		Notification.box.style.width = "250px";
		Notification.box.style.backgroundColor = "snow";
		Notification.box.style.color = "#262626";
		Notification.box.style.textAlign = "center";
		Notification.box.style.fontWeight = "bold";
		Notification.box.style.padding = "1rem .7rem";
		Notification.box.style.userSelect = "none";
		Notification.box.style.left = "-30rem";		
		Notification.box.style.bottom = Notification.relocate();
		Notification.box.style.wordWrap = "break-word";
		Notification.box.style.overflowY = "auto";
		Notification.box.style.overflowX = "hidden";
		Notification.box.style.cursor = "pointer";
		Notification.box.style.boxShadow = "10px 10px 20px 5px grey";
		Notification.box.style.transition = "all ease .35s";
		Notification.interval = {};

		let now = new Date();
		Notification.box.id = now.getTime();

		document.body.appendChild(Notification.box);
		setTimeout(() => Notification.show(Notification.box, texto, callback), 400);

		Notification.box.addEventListener("click", function(){
			Notification.hide(this);		
		}, false);
	},

	show: (box, texto, callback) => {
		box.innerHTML = texto;
		box.style.left = "0rem";
		box.className = "show";		

		Notification.interval[box.id] = setTimeout(() => {
			Notification.hide(box);
		}, 4000);
	},

	hide: (box, callback) => {
		//Se oculta la notificación
		box.style.left = "-30rem";
		box.className = "hide";

		//Se limpia el temporizador
		Notification.interval[box.id] && clearTimeout(Notification.interval[box.id]);

		//Se ejecuta la llamada de retorno (si es que hay una y es una función)
		Notification.callback && {}.toString.call(Notification.callback) == "[object Function]" && Notification.callback();

		//Se desplaza las demás notificaciones hacia abajo (si es que hay más)
		setTimeout(_ => {
			let boxes = document.querySelectorAll(".show");

			if (boxes){
				[].forEach.call(boxes, (box) => {
					box.style.bottom = parseFloat(getComputedStyle(box).bottom) - box.offsetHeight + 8 + "px";
				});
			}
		}, 400);
	},

	relocate: () => {
		let boxes = document.querySelectorAll(".show");
		return boxes.length ? boxes[0].offsetHeight * boxes.length + 8 + "px" : ".5rem";
	},

	msg: (texto, callback) => {
		if (texto.length){
			Notification.create(texto, callback || null);
		}
	}
};
