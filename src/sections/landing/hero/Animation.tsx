import { useEffect } from "react";
import gsap from "gsap";

const HeroTextAnimation = () => {
  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        ".herotext",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.25 }
      )
      .fromTo(
        ".subtext",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.25},
        "-=0.5"
      );
  }, []);

  return null;
};

export default HeroTextAnimation;
