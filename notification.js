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
	msg: options => {
		/*** OPCIONES DE CONFIGURACIÓN ***
		 * 
		 * options.texto: El texto a mostrar
		 * options.callback: La llamada de retorno a ejecutarse luego de ocultarse la notificación
		 * options.background: Determina si se mostrará un fondo oscuro mientra se muestra la notificación
		 * options.time: El tiempo que se mostrará la notificación
		 * options.keep: Determina si la notificación se mostrará permanentemente
		 */

		//Se libera la memoria ocupada por la configuración anterior (si la hubo)
		delete Notification.options;

		//Si se recibió algún argumento
		if (options){
			//Si el argumento no es un objeto, se lo establece como el texto a mostrar
			if ({}.toString.call(options) !== "[object Object]"){
				//Texto a mostrar
				Notification.text = options;
			}
			//Si el argumento es un objeto, se lo establece como configuración de la notificación
			else{
				//Opciones de configuración
				Notification.options = options;

				//Texto a mostrar
				Notification.text = options.texto;
			}
		}
		//Caso contrario, se aborta la ejecución
		else{
			throw new Error("Tiene que añadir un texto o un objeto con opciones de configuración para poder mostrar la notificación");
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
		Notification.createBox();

		//Si se ha establecido un fondo, se genera uno
		Notification.background && Notification.createBack();

		//Se genera una copia de la configuración de la notificación
		const copy = {...Notification};

		//Se recupera o genera una nueva cola de notificaciones
		Notification.queue = Notification.queue || [];		

		//Se encola la notificación
		Notification.queue.push(copy);

		//Si se ha establecido un fondo, se lo añade
		Notification.background && Notification.addBackground(copy);

		//Se muestra el cuadro de notificación
		Notification.addBox(copy);

		//Se verifica si la notificación se mostrará por unos segundos o permanentemente
		Notification.showTime(copy);

		//Configuración de eventos
		Notification.events(copy);		
	},

	events: boxConfig => {
		//Se oculta la notificación en caso de que se haga clic sobre ella
		boxConfig.box.addEventListener("click", _ => Notification.hide(boxConfig), false);

		//Se ocultan la notificación y el fondo en caso de que se haga clic sobre este último
		boxConfig.back?.addEventListener("click", _ => Notification.hide(boxConfig), false);

		//Se mostrará el cursor con forma de mano cuando se pose el cursor sobre la notificación
		boxConfig.box.addEventListener("mouseover", _ => boxConfig.box.style.cursor = "pointer", false);

		//Se retirará el cursor con forma de mano cuando se retire el cursor de la notificación
		boxConfig.box.addEventListener("mouseout", _ => boxConfig.box.style.cursor = "auto", false);

		//Al girar el dispositivo, cambiarán las dimensiones del fondo
		window.addEventListener("orientationchange", _ => Notification.resizeBack(boxConfig), false);
		window.addEventListener("resize", _ => Notification.resizeBack(boxConfig), false);
	},

	createBox: _ => {
		Notification.box = document.createElement("span");
		Notification.box.classList.add("notification-box");
		Notification.box.style = `
			background-color: #FFFFEF;
			width: ${window.innerWidth >= 850 ? "250px" : "200px"};
			padding: 1rem .75rem;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			left: -30rem;
			font-size: 1rem !important;
			text-align: justify;
			user-select: none;
			word-wrap: break-word;
			overflow-x: hidden;
			overflow-y: auto;
			box-shadow: 10px 10px 20px 5px gray;
			transition: .4s ease;
			z-index: 9999;
		`;
	},

	addBox: boxConfig => {
		//Se añade el texto al cuadro de notificación
		boxConfig.box.innerHTML = boxConfig.text;

		//Se añade el cuadro de notificación al documento
		document.body.appendChild(boxConfig.box);

		setTimeout(_ => {
			//Se muestra la notificación
			boxConfig.box.style.left = 0;
			
			//Se posiciona la notificación verticalmente
			Notification.bottom(boxConfig);
		}, 400);
	},

	createBack: _ => {
		Notification.back = document.createElement("div");
		Notification.back.style = `
			width: ${window.innerWidth * 50}px;
			height: ${window.innerHeight * 50}px;
			margin: 0;
			background-color: #000;
			opacity: 0;
			transition: .4s ease;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 8888;
		`;
	},

	addBackground: boxConfig => {
		//Se realiza una copia del valor de la propiedad "overflow" del documento
		boxConfig.overflow = getComputedStyle(document.body).overflow;

		//Se añde el fondo al documento
		document.body.appendChild(boxConfig.back);

		//Se ocultan las barras de desplazamiento del documento
		document.body.style.overflow = "hidden";

		//Se le da visibilidad al fondo
		setTimeout(_ => boxConfig.back.style.opacity = .6, 400);
	},

	showTime: boxConfig => {
		if (!boxConfig.keep){
			boxConfig.timer = setTimeout(_ => Notification.hide(boxConfig), boxConfig.time);
		}
	},

	exists: _ => document.querySelectorAll(".notification-box"),

	hide: boxConfig => {
		boxConfig.box.style.left = "-30rem";

		if (boxConfig.background){
			boxConfig.back.style.opacity = 0;
		}

		if (boxConfig.timer){
			clearTimeout(boxConfig.timer);
		}

		if (boxConfig.callback){
			boxConfig.callback();
		}

		setTimeout(_ => {
			boxConfig.box.remove();			

			if (boxConfig.background){
				boxConfig.back.remove();
				document.body.style.overflow = boxConfig.overflow || "auto";
			}

			if (Notification.queue.length){
				Notification.queue.forEach(boxConfig => Notification.bottom(boxConfig));
			}

			Notification.queue.splice(Notification.queue.indexOf(boxConfig), 1);
		}, 400);
	},

	hideAll: _ => Notification.queue.forEach(boxConfig => Notification.hide(boxConfig)),

	resizeBack: boxConfig => {
		if (boxConfig.background){
			boxConfig.back.style.width = `${window.innerWidth * 50}px`;
			boxConfig.back.style.height = `${window.innerHeight * 50}px`;
			boxConfig.back.style.top = 0;
		}
	},

	bottom: boxConfig => {
		const order = Notification.queue.indexOf(boxConfig);

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

			return `${totalHeight}px`;
		})(order, Notification.queue);
	}
};