import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroTextAnimation() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initWithLenis = (lenis: any) => {
      lenis.on("scroll", ScrollTrigger.update);

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    };

    if (window.lenis) {
      initWithLenis(window.lenis);
    } else {
      window.__onLenisReady = window.__onLenisReady || [];
      window.__onLenisReady.push(initWithLenis);
    }
  }, []);

  return null;
}
