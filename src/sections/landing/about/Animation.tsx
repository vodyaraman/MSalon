import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Заголовок
      gsap.fromTo(
        ".about__title",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about__title",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Сабтайтл
      gsap.fromTo(
        ".about__subtitle",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about__subtitle",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Слайд 1 — слева
      gsap.fromTo(
        ".about__slide--first",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about__slide--first",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Слайд 2 — справа
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

      // Слайд 3 — снизу
      gsap.fromTo(
        ".about__slide--third",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about__slide--first",
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
