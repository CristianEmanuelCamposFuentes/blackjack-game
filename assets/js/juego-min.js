const miModulo = (() => {
	"use strict";
	let e = [];
	const t = ["C", "D", "H", "S"],
		n = ["A", "J", "Q", "K"];
	let r = [];
	const a = document.querySelector("#btnPedir"),
		o = document.querySelector("#btnDetener"),
		l = document.querySelector("#btnNuevo"),
		s = document.querySelectorAll(".divCartas"),
		d = document.querySelectorAll("small"),
		c = (t = 2) => {
			(e = i()), (r = []);
			for (let e = 0; e < t; e++) r.push(0);
			d.forEach((e) => (e.innerText = 0)),
				s.forEach((e) => (e.innerHTML = "")),
				(a.disabled = !1),
				(o.disabled = !1);
		},
		i = () => {
			e = [];
			for (let n = 2; n <= 10; n++) for (let r of t) e.push(n + r);
			for (let r of t) for (let t of n) e.push(t + r);
			return _.shuffle(e);
		},
		u = () => {
			if (0 === e.length) throw "No hay cartas en el deck";
			return e.pop();
		},
		f = (e, t) => (
			(r[t] =
				r[t] +
				((e) => {
					const t = e.substring(0, e.length - 1);
					return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
				})(e)),
			(d[t].innerText = r[t]),
			r[t]
		),
		g = (e, t) => {
			const n = document.createElement("img");
			(n.src = `../assets/cartas/${e}.png`),
				n.classList.add("carta"),
				s[t].append(n);
		},
		h = (e) => {
			let t = 0;
			do {
				const n = u();
				if (((t = f(n, r.length - 1)), g(n, r.length - 1), e > 21))
					break;
			} while (t < e && e <= 21);
			(() => {
				const [e, t] = r;
				setTimeout(() => {
					t === e
						? alert("Nadie gana :C")
						: e > 21
						? alert("Computadora gana!")
						: t > 21
						? alert("Jugador gana!")
						: alert("Computadora gana!");
				}, 100);
			})();
		};
	return (
		a.addEventListener("click", () => {
			const e = u(),
				t = f(e, 0);
			g(e, 0),
				t > 21
					? (console.warn("Lo siento mucho, perdiste !!"),
					  (a.disabled = !0),
					  (o.disabled = !0),
					  h(t))
					: 21 === t &&
					  (console.warn("21, genial !"),
					  (o.disabled = !0),
					  (a.disabled = !0),
					  h(t));
		}),
		o.addEventListener("click", () => {
			(a.disabled = !0), (o.disabled = !0), h(r[0]);
		}),
		l.addEventListener("click", () => {
			c();
		}),
		{nuevoJuego: c()}
	);
})();
