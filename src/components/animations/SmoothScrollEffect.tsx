import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollEffect() {
	useEffect(() => {
		if (typeof window === "undefined" || !window.lenis) return;

		const lenis = window.lenis;

		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);

		ScrollTrigger.create({
			trigger: ".hero",
			start: "top top",
			end: "bottom top",
			pin: true,
			pinSpacing: false,
			scrub: true,
		});
	}, []);

	return null;
}
