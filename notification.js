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

	create: (texto, callback, background, time, keep) => {
		//Almacenamos la llamada de retorno
		Notification.callback = callback || null;

		//La notificación
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
		Notification.box.style.zIndex = "9999";
		Notification.interval = {};

		//El fondo oscuro
		Notification.back = document.createElement("div");
		Notification.back.style.width = window.innerWidth * 50 + "px";
		Notification.back.style.height = window.innerHeight * 50 + "px";
		Notification.back.style.margin = 0;
		Notification.back.style.backgroundColor = "black";
		Notification.back.style.opacity = .95;
		Notification.back.style.transition = "all ease .35s";
		Notification.back.style.position = "absolute";
		Notification.back.style.top = 0;	
		Notification.back.style.left = 0;		
		Notification.back.style.zIndex = "8888";

		//La marca de tiempo actual
		let now = new Date();
		Notification.box.id = "notification" + now.getTime();

		//Comodín para decidir añadir el fondo oscuro
		Notification.background = background;

		//Comodín para decidir mantener o no la notificación
		Notification.keep = keep;

		//Tiempo en el que se mostrará la notificación
		Notification.time = time;

		//Al girar el dispositivo, cambian las dimensiones del fondo
		window.addEventListener("orientationchange", Notification.resize, false);
		window.addEventListener("resize", Notification.resize, false);

		//Se añade el fondo oscuro si se solicita
		if (Notification.background){
			document.body.appendChild(Notification.back);
			setTimeout(_ => document.body.style.overflow = "hidden", 200);
		}

		//Se añade la notificación
		document.body.appendChild(Notification.box);

		//Se muestra la notificación luego de 400 milésimas de segundo
		setTimeout(() => Notification.show(Notification.box, texto, callback), 400);

		//Se ocultan la notificación y el fondo al pulsar la notificación
		Notification.box.addEventListener("click", _ => {
			Notification.hide(this.id, Notification.background ? Notification.back : null);		
		}, false);

		//Se ocultan la notificación y el fondo al pulsar el fondo
		Notification.back.addEventListener("click", _ => {
			Notification.hide(Notification.box.id, Notification.background ? Notification.back : null);		
		}, false);
	},

	show: (box, texto, callback) => {
		box.innerHTML = texto;
		box.style.left = "0rem";
		box.className = "show";		

		if (!Notification.keep){
			Notification.interval[box.id] = setTimeout(() => {
				Notification.hide(box.id, Notification.background ? Notification.back : null);
			}, Notification.time);
		}
	},

	hide: (boxId, back) => {
		//Se oculta la notificación
		let box = document.querySelector("#" + boxId);

		box && (box.style.left = "-30rem");
		setTimeout(_ => box.remove(), 400);

		//Se limpia el temporizador
		Notification.interval[boxId] && clearTimeout(Notification.interval[boxId]);

		//Si se está mostrando un fondo oscuro, se lo quita
		if (Notification.background){
			document.body.removeChild(Notification.back);
			document.body.style.overflow = "auto";
		}

		//Se ejecuta la llamada de retorno (si es que hay una y es una función)
		Notification.callback && {}.toString.call(Notification.callback) == "[object Function]" && Notification.callback();

		//Se desplaza las demás notificaciones hacia abajo (si es que hay más)
		setTimeout(_ => {
			let boxes = document.querySelectorAll("[id^=notification]");

			if (boxes){
				[...boxes].forEach(box => {
					box.style.bottom = parseFloat(getComputedStyle(box).bottom) - box.offsetHeight + 8 + "px";
				});
			}
		}, 400);
	},

	resize: _ => {
		if (Notification.background){
			Notification.back.style.width = window.innerWidth + "px";
			Notification.back.style.height = window.innerHeight + "px";
			Notification.back.style.top = 0;	
		}
	},

	relocate: _ => {
		let boxes = document.querySelectorAll("[id^=notification]");
		return boxes.length ? boxes[0].offsetHeight * boxes.length + 8 + "px" : ".5rem";
	},

	msg: (texto, callback, background, time, keep) => {
		if (texto.length){
			Notification.create(texto, callback || null, background || false, time || 2500, keep || false);
		}
	}
};
