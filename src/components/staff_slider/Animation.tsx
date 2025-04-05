import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MastersHeroAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero__content",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          delay: 1,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
