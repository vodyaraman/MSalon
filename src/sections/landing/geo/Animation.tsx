import { useEffect } from "react";
import gsap from "gsap";

export default function GeoAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".geo",
        { opacity: 0.5, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".geo",
            start: "top 20%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
