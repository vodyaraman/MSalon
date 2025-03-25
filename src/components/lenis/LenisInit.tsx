// LenisInit.tsx
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisInit() {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const lenis = new Lenis();
		window.lenis = lenis;

		if (Array.isArray(window.__onLenisReady)) {
			window.__onLenisReady.forEach((cb) => cb(lenis));
			window.__onLenisReady = [];
		}

		console.log("Lenis initialised");

		const raf = (time: number) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		requestAnimationFrame(raf);
	}, []);

	return null;
}
