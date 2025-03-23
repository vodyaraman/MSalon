import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisInit() {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const lenis = new Lenis();
		window.lenis = lenis;

        console.log("Lenis initialised");

		const raf = (time: number) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		requestAnimationFrame(raf);
	}, []);

	return null;
}
