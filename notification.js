/**
 * NOTIFICACIONES PERSONALIZADAS
 * 
 * Este script genera un cuadro de notificación. Se muestra en la esquina inferior 
 * izquierda de la pantalla del dispositivo, ocultándose automáticamente después de 
 * cuatro segundos o pulsando sobre la notificación. Puede mostrar varias notificaciones 
 * a la vez, las cuales se irán mostrando una sobre otra e irán desplazándose hacia abajo 
 * conforme las notificaciones anteriores vayan ocultándose.
 * 
 * MODO DE USO: Notification.msg("Texto a mostrar"/{Objeto de opciones de configuración});
 * 
 * 
 * @author		Alexis López Espinoza
 * @version		3.0
 * @param		options			Plain Object/String
 */

"use strict";

const Notification = {
	msg: function(
		options

		/*** OPCIONES DE CONFIGURACIÓN ***
		 * 
		 * options.texto: El texto a mostrar
		 * options.callback: La llamada de retorno a ejecutarse luego de ocultarse la notificación
		 * options.background: Determina si se mostrará un fondo oscuro mientra se muestra la notificación
		 * options.time: El tiempo que se mostrará la notificación
		 * options.keep: Determina si la notificación se mostrará permanentemente
		 */
	){
		//Si se recibieron argumentos
		if (arguments.length){
			//Si se recibe una cadena de texto como argumento, se descarta el uso del objeto con las opciones de configuración
			if ({}.toString.call(arguments[0]) !== "[object Object]" && String(arguments[0]).length){
				//Texto a mostrar
				Notification.text = options;
			}
			//Si se recibe un objeto como argumento, se conserva el objeto con las opciones de configuración
			else if ({}.toString.call(arguments[0]) === "[object Object]"){
				//Opciones de configuración
				Notification.options = options;

				//Texto a mostrar
				Notification.text = options.texto;
			}
		}
		//Caso contrario, se aborta la ejecución
		else{
			throw new Error("Tiene que añadir un texto o un objeto con opciones de configuración para poder mostrar la notificación");
			return;
		}	

		//Llamada de retorno
		Notification.callback = options.callback && {}.toString.call(options.callback) === "[object Function]" ? options.callback : null;

		//Fondo
		Notification.background = options.background || false;

		//Tiempo por defecto durante el cual se mostrará la notificación
		Notification.time = options.time || 3000;

		//Determinar si la notificación se mostrará permanentemente
		Notification.keep = options.keep || false;

		//Se ejecuta el método que muestra el cuadro de notificación
		Notification.show();
	},

	show: _ => {
		//Cuadro de la notificación
		Notification.box = document.createElement("span");
		Notification.box.classList.add("notification-box");
		Notification.box.style.backgroundColor = "#FFFFEF";
		Notification.box.style.width = window.innerWidth >= 850 ? "250px" : "200px";
		Notification.box.style.padding = "1rem .75rem";
		Notification.box.style.display = "flex";
		Notification.box.style.alignItems = "center";
		Notification.box.style.justifyContent = "center";
		Notification.box.style.position = "fixed";
		Notification.box.style.left = "-30rem";		
		Notification.box.style.fontSize = "1rem !important";
		Notification.box.style.textAlign = "justify";
		Notification.box.style.userSelect = "none";
		Notification.box.style.wordWrap = "break-word";
		Notification.box.style.overflowY = "auto";
		Notification.box.style.overflowX = "hidden";
		Notification.box.style.boxShadow = "10px 10px 20px 5px grey";
		Notification.box.style.transition = ".4s ease";
		Notification.box.style.zIndex = "9999";		

		//Fondo oscuro
		Notification.back = document.createElement("div");
		Notification.back.style.width = window.innerWidth * 50 + "px";
		Notification.back.style.height = window.innerHeight * 50 + "px";
		Notification.back.style.margin = 0;
		Notification.back.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
		Notification.back.style.transition = ".4s ease";
		Notification.back.style.position = "absolute";
		Notification.back.style.top = 0;	
		Notification.back.style.left = 0;	
		Notification.back.style.zIndex = "8888";

		//Se recupera o genera una nueva cola de notificaciones
		Notification.queue = Notification.queue || [];

		//Se genera una copia de la configuración de la notificación
		let copy = {...Notification};

		//Se elimina la cola de la copia
		delete copy.queue;

		//Se encola la notificación
		Notification.queue.push(copy);

		//Se verifica si se añadirá el fondo oscuro
		Notification.addBackground(copy);

		//Se muestra el cuadro de notificación
		Notification.addBox(copy);

		//Se verifica si la notificación se mostrará por unos segundos o permanentemente
		Notification.showTime(copy);

		//Se oculta la notificación en caso de que se haga clic sobre ella
		copy.box.addEventListener("click", _ => Notification.hide(copy), false);

		//Se ocultan la notificación y el fondo en caso de que se haga clic sobre este último
		copy.back.addEventListener("click", _ => Notification.hide(copy), false);

		//Se mostrará el cursor con forma de mano cuando se pose el cursor sobre la notificación
		copy.box.addEventListener("mouseover", _ => copy.box.style.cursor = "pointer", false);

		//Se retirará el cursor con forma de mano cuando se retire el cursor de la notificación
		copy.box.addEventListener("mouseout", _ => copy.box.style.cursor = "auto", false);

		//Al girar el dispositivo, cambiarán las dimensiones del fondo
		window.addEventListener("orientationchange", _ => Notification.resizeBack(copy), false);
		window.addEventListener("resize", _ => Notification.resizeBack(copy), false);
	},

	addBox: boxConfig => {
		boxConfig.box.innerHTML = boxConfig.text;
		document.body.appendChild(boxConfig.box);
		setTimeout(_ => {
			boxConfig.box.style.left = 0;
			
			//Se posiciona la notificación verticalmente
			Notification.bottom(boxConfig);
		}, 400);
	},

	addBackground: boxConfig => {
		if (boxConfig.background){
			//Se realiza una copia del valor de la propiedad "overflow" del documento
			Notification.overflow = getComputedStyle(document.body).overflow;

			document.body.appendChild(boxConfig.back);			
			setTimeout(_ => document.body.style.overflow = "hidden");
		}
	},

	showTime: boxConfig => {
		if (!boxConfig.keep){
			boxConfig.timer = setTimeout(_ => Notification.hide(boxConfig), Notification.time);
		}
	},

	exists: _ => document.querySelectorAll(".notification-box"),

	hide: boxConfig => {
		boxConfig.box.style.left = "-30rem";

		if (boxConfig.timer){
			clearTimeout(boxConfig.timer);
		}

		if (boxConfig.callback){
			boxConfig.callback();
		}

		setTimeout(_ => {
			boxConfig.box.remove();
			Notification.queue.splice(Notification.queue.indexOf(boxConfig), 1);

			if (boxConfig.background){
				document.body.style.overflow = Notification.overflow || "auto";
			}

			let boxes = Notification.exists();

			if (Notification.queue.length){
				Notification.queue.forEach(boxConfig => Notification.bottom(boxConfig));
			}
		}, 400);
	},

	hideAll: _ => Notification.queue.forEach(boxConfig => Notification.hide(boxConfig)),

	resizeBack: boxConfig => {
		if (boxConfig.background){
			boxConfig.back.style.width = window.innerWidth * 50 + "px";
			boxConfig.back.style.height = window.innerHeight * 50 + "px";
			boxConfig.back.style.top = 0;	
		}
	},

	bottom: boxConfig => {
		let boxes = Notification.exists(),
			order = Notification.queue.indexOf(boxConfig);

		boxConfig.box.style.bottom = ((order, queue) => {
			let totalHeight = 0;

			if (order){
				for (let i = 0; i < order; i++){
					totalHeight += queue[i].box.offsetHeight + 8;
				}
			}
			else if (order > -1){
				return "1px";
			}

			return totalHeight + "px";
		})(order, Notification.queue);
	}
};
