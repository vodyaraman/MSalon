import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroTextAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });
      timeline
        .fromTo(
          ".hero",
          { filter: "brightness(1)" },
          { filter: "brightness(0.2)", ease: "none" },
          0
        )
        .to(".hero__article", {
          x: -120,
          ease: "none",
        }, 0)
        .to(".hero__showcase", {
          x: 120,
          ease: "none",
        }, 0);
    });

    return () => ctx.revert();
  }, []);

  return null;
}
