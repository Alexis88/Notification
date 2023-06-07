/**
 * NOTIFICACIONES MINIMALISTAS
 * 
 * Plugin que genera notificaciones personalizadas de estilo minimalista
 * 
 * MODO DE USO:
 * 
 * Notification.msg("Texto de ejemplo");
 * Notification.msg({
 * 		text: "Texto de ejemplo",
 * 		background: true,
 * 		time: 3000,
 * 		keep: false,
 * 		onShow: _ => {
 * 			//Esto se ejecutará luego de haberse mostrado la notificación
 * 		},
 * 		onHide: _ => {
 * 			//Esto se ejecutará luego de haberse ocultado la notificación
 * 		}
 * });
 *
 * @param		{options}		Object/String
 * @author		Alexis López Espinoza
 * @version		1.0
 * @date 		2023-06-04
 */

"use strict";

const Notification = {
	/**
	 * options.text: Texto a mostrar
	 * options.background: Establece un fondo oscuro detrás de la notificación
	 * options.time: Tiempo en el que permanecerá visible la notificación
	 * options.keep: Establece que la notificación se muestre permanentemente
	 * options.onShow: Llamada de retorno a ejecutarse luego de mostrarse la notificación
	 * options.onHide: Llamada de retorno a ejecutarse luego de ocultarse la notificación
	 */
	msg(options){
		if (!options || !["[object String]", "[object Object]"].includes(Notification.type(options))){
			throw new Error("Tiene que establecer un contenido para la notificación");
		}

		Notification.id = `notificationID-${new Date().getTime()}`;

		if (Notification.type(options) == "[object String]"){
			Notification.text = options;
			Notification.background = false;
			Notification.time = 3000;
			Notification.keep = false;
			Notification.onShow = null;
			Notification.onHide = null;
		}
		else{
			Notification.text = options.text;
			Notification.background = options.background || false;
			Notification.time = options.time || 3000;
			Notification.keep = options.keep || false;
			Notification.onShow = options.onShow && Notification.isFunction(options.onShow) ? options.onShow : null;
			Notification.onHide = options.onHide && Notification.isFunction(options.onHide) ? options.onHide : null;
		}

		Notification.queue ??= [];
		const cloneConfig = Notification.createNotification();		
		Notification.events(cloneConfig);
	},

	type(elem){
		return {}.toString.call(elem);
	},

	isFunction(fn){
		return Notification.type(fn) === "[object Function]";
	},

	events(config){
		config.box.addEventListener("click", _ => Notification.hide(config), false);
		window.addEventListener("resize", Notification.resize, false);
		window.addEventListener("orientationchange", Notification.resize, false);
		window.addEventListener("scroll", _ => {
			const notifications = document.querySelectorAll("[id^=notificationBack]");

			if (notifications.length){
				notifications[notifications.length - 1].scrollIntoView();
			}
		}, false);
	},

	createNotification(){
		Notification.back = Notification.createBack();
		Notification.box = Notification.createBox(Notification.text);	
		const cloneConfig = {...Notification};
		delete cloneConfig.queue;
		Notification.queue.push(cloneConfig);
		cloneConfig.background && document.body.append(cloneConfig.back);
		document.body.append(cloneConfig.box);
		Notification.bottom(cloneConfig);

		setTimeout(_ => {		
			cloneConfig.back.style.opacity = .6;
			cloneConfig.box.style.left = 0;			
			cloneConfig.onShow && cloneConfig.onShow();
		}, 400);

		if (!cloneConfig.keep){
			cloneConfig.timer = setTimeout(_ => cloneConfig.hide(cloneConfig), cloneConfig.time);
		}

		return cloneConfig;
	},

	createBack(){
		const 
			back = document.createElement("div"),
			width = window.innerWidth,
			height = window.innerHeight;

		back.id = `notificationBack-${Notification.id.substring(Notification.id.indexOf("-") + 1)}`;
		back.style = `
			position: absolute;
			background-color: rgba(0, 0, 0, .6);
			display: flex;
			align-items: center;
			width: ${width}px;
			height: ${height}px;
			top: 0;
			left: 0;
			justify-content: center;
			z-index: 8888;
			transition: all ease .4s;
		`;

		return back;
	},

	createBox(text){
		const 
			box = document.createElement("span"),
			width = window.innerWidth;

		box.style = `
			background-color: #FFFFEF;
			width: ${width >= 850 ? "250px" : "200px"};
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
			cursor: pointer;
			transition: .4s ease;
			z-index: 9999;
		`;
		box.innerHTML = text;

		return box;
	},

	resize(){
		Notification.queue.forEach(config => {
			if (config.background){
				const
					back = config.back,
					scroll = document.documentElement.scrollTop || document.body.scrollTop,
					width = window.innerWidth,
					height = window.innerHeight;

				back.style.top = `${scroll}px`;
				back.style.width = `${width}px`;
				back.style.height = `${height}px`;
			}
		});
	},

	hide(config){
		const 
			back = config.back,
			box = config.box,
			index = Notification.queue.findIndex(obj => obj.id == config.id);

		config.background && back.animate([
			{opacity: .6},
			{opacity: 0}
		], {duration: 400, fill: "forwards"});

		box.animate([
			{left: 0},
			{left: "-30rem"}
		], {duration: 400, fill: "forwards"});

		config.onHide && config.onHide();
		config.timer && clearTimeout(config.timer);

		Notification.queue.splice(index, 1);

		Notification.queue.forEach(boxConfig => Notification.bottom(boxConfig));

		setTimeout(_ => {
			config.background && back.remove();
			box.remove();
			config.onHide && config.onHide();			
		}, 400);
	},

	bottom(config){
		config.box.style.bottom = (_ => {
			let totalHeight = 0,
				order = Notification.queue.indexOf(config);

			if (order > -1){
				for (let i = 0; i < order; i++){
					totalHeight +=  Notification.queue[i].box.offsetHeight + 2.5;
				}
			}
			else{
				totalHeight = Notification.queue[i].box.offsetHeight + 2.5;
			}

			return `${totalHeight}px`;
		})();
	}
};
