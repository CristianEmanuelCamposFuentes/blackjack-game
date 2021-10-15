const miModulo = (() => {
	"use strict";
	/**
	 * 2C = Two of Clubs
	 * 2D = Two of Diamonds
	 * 2H = Two of Hearts
	 * 2S = Two of Spades
	 */

	// Inicializaciones
	let deck = [];
	const tipos = ["C", "D", "H", "S"],
		especiales = ["A", "J", "Q", "K"];

	// let puntosJugador = 0,
	// 	puntosComputadora = 0;

	let puntosJugadores = [];

	// Referencias del HTML
	const btnPedir = document.querySelector("#btnPedir"),
		btnDetener = document.querySelector("#btnDetener"),
		btnNuevo = document.querySelector("#btnNuevo");

	// console.log(btnPedir);

	const divCartasJugadores = document.querySelectorAll(".divCartas"),
		puntosHTML = document.querySelectorAll("small");

	// Esta funcion inicializa el juego
	const inicializarJuego = (numJugadores = 2) => {
		deck = crearDeck();
		puntosJugadores = [];
		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0);
		}
		puntosHTML.forEach((elem) => (elem.innerText = 0));
		divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

		btnPedir.disabled = false;
		btnDetener.disabled = false;
	};

	// funcion para crear la baraja
	const crearDeck = () => {
		deck = [];
		// NUMEROS: comienza en 2 porque es la carta mas baja, y 10 la mas alta
		for (let i = 2; i <= 10; i++) {
			// TIPOS for ... of
			for (let tipo of tipos) {
				deck.push(i + tipo);
			}
			//deck.push( i + 'C');
		}

		// CARTAS ESPECIALES: REYES y ASES
		for (let tipo of tipos) {
			for (let esp of especiales) {
				deck.push(esp + tipo);
			}
		}
		// console.log(deck);

		return _.shuffle(deck);
		// Mediante UNDERSCORE SHUFFLE se ingresa la baraja y este metodo mezcla y la retorna
	};

	// crearDeck();

	// console.log(deck);
	// Esta funcion me permite tomar una carta
	const pedirCarta = () => {
		// Condicion para no poder usar el pop si no hay cartas en el deck
		if (deck.length === 0) {
			throw "No hay cartas en el deck";
			// throw detiende el proceso y devuelve error
		}

		// console.log(carta); // carta debe ser de la baraja
		return deck.pop();
	};

	// pedirCarta();

	// Esta funcion sirve para obtener el valor de la carta
	const valorCarta = (carta) => {
		const valor = carta.substring(0, carta.length - 1);
		return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

		// console.log(valor);
		// let puntos = 0;
		// //Verificar si es un numero o una carta especial
		// if (isNaN(valor)) {
		// 	puntos = valor === "A" ? 11 : 10;

		// 	// console.log("No es un numero");
		// } else {
		// 	// console.log("Es un numero");
		// 	puntos = valor * 1; // IMPORTANTE : Multiplicando por 1 (uno)
		// 	// se transforma de string a numero
		// }
		// console.log(puntos);
	};

	// const valor = valorCarta(pedirCarta());
	// console.log({valor});

	//
	// Turno: 0 = primer jugador, y el ultimo sera la computadora
	const acumularPuntos = (carta, turno) => {
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
		puntosHTML[turno].innerText = puntosJugadores[turno];
		return puntosJugadores[turno];
	};

	//
	const crearCarta = (carta, turno) => {
		const imgCarta = document.createElement("img");
		imgCarta.src = `../assets/cartas/${carta}.png`;
		imgCarta.classList.add("carta");
		divCartasJugadores[turno].append(imgCarta);
	};

	const determinarGanador = () => {
		const [puntosMinimos, puntosComputadora] = puntosJugadores;
		setTimeout(() => {
			if (puntosComputadora === puntosMinimos) {
				alert("Nadie gana :C");
			} else if (puntosMinimos > 21) {
				alert("Computadora gana!");
			} else if (puntosComputadora > 21) {
				alert("Jugador gana!");
			} else {
				alert("Computadora gana!");
			}
		}, 100); // 10 milesimas de segundo de timeout
	};

	//
	// Turno de la Computadora
	const turnoComputadora = (puntosMinimos) => {
		let puntosComputadora = 0;
		// do-while porque la computadora va a necesitar como minimo una carta
		// para superar al jugador 1
		do {
			const carta = pedirCarta();
			puntosComputadora = acumularPuntos(
				carta,
				puntosJugadores.length - 1
			);
			// console.log(carta);
			crearCarta(carta, puntosJugadores.length - 1);
			// puntosComputadora = puntosComputadora + valorCarta(carta);
			// // console.log(puntosJugador);
			// puntosHTML[1].innerText = puntosComputadora;
			// const imgCarta = document.createElement("img");
			// imgCarta.src = `../assets/cartas/${carta}.png`;
			// imgCarta.classList.add("carta");
			// divCartasComputadora.append(imgCarta);

			// Si el jugador1 supera los 21 puntos, la computadora solo necesita
			//sacar una carta y finalizar su turno
			if (puntosMinimos > 21) {
				break;
			}
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

		determinarGanador();
	};
	// Eventos
	// Callback es una funcion que se envia como argumento
	btnPedir.addEventListener("click", () => {
		const carta = pedirCarta();
		const puntosJugador = acumularPuntos(carta, 0);
		// console.log(carta);
		crearCarta(carta, 0);
		// puntosJugador = puntosJugador + valorCarta(carta);
		// // console.log(puntosJugador);
		// puntosHTML[0].innerText = puntosJugador;
		// const imgCarta = document.createElement("img");
		// imgCarta.src = `../assets/cartas/${carta}.png`;
		// imgCarta.classList.add("carta");
		// divCartasJugador.append(imgCarta);

		if (puntosJugador > 21) {
			console.warn("Lo siento mucho, perdiste !!");
			btnPedir.disabled = true;
			btnDetener.disabled = true;

			turnoComputadora(puntosJugador);
		} else if (puntosJugador === 21) {
			console.warn("21, genial !");
			btnDetener.disabled = true;
			btnPedir.disabled = true;
			turnoComputadora(puntosJugador);
		}
	});

	btnDetener.addEventListener("click", () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugadores[0]);
	});

	btnNuevo.addEventListener("click", () => {
		inicializarJuego();
		// deck = [];
		// deck = crearDeck();
		// puntosJugador = 0;
		// puntosComputadora = 0;

		// Este es un listado, por eso se iguala por separado
		// puntosHTML[0].innerText = 0;
		// puntosHTML[1].innerText = 0;

		// btnPedir.disabled = false;
		// btnDetener.disabled = false;

		// //Borrar cartas
		// divCartasJugador.innerHTML = "";
		// divCartasComputadora.innerHTML = "";
	});
	// TODO: Borrar
	// console.log(26);
	// turnoComputadora(26);

	// Lo que se regrese dentro del return va a ser PUBLICO
	return {
		nuevoJuego: inicializarJuego(),
	};
})();
