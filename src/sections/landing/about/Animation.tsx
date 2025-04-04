import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация заголовка
      gsap.fromTo(
        ".about__title",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about__title",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Первый слайд — выезд слева
      gsap.fromTo(
        ".about__slide--fitst",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about__slide--fitst",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Второй слайд — выезд справа
      gsap.fromTo(
        ".about__slide--second",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about__slide--second",
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
