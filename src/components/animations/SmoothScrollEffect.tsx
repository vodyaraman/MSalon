import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroParallaxAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        markers: true, // можешь убрать потом
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
