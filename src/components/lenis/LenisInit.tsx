import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisInit() {
	useEffect(() => {
		if (typeof window === "undefined") return;

		// Уничтожаем предыдущий экземпляр, если он существует
		if (window.lenis && typeof window.lenis.destroy === "function") {
			window.lenis.destroy();
		}

		const lenis = new Lenis();
		window.lenis = lenis;

		if (Array.isArray(window.__onLenisReady)) {
			window.__onLenisReady.forEach((cb) => cb(lenis));
			window.__onLenisReady = [];
		}

		console.log("Lenis initialised");

		let isDestroyed = false;

		const raf = (time: number) => {
			if (!isDestroyed) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}
		};

		requestAnimationFrame(raf);

		return () => {
			isDestroyed = true;
			lenis.destroy();
		};
	}, []);

	return null;
}
