import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BusinessAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Тайтл — снизу вверх
      gsap.fromTo(
        ".business__title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".business__title",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Карточка — слева направо
      gsap.fromTo(
        ".business__card",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".business__card",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Форма — справа налево
      gsap.fromTo(
        ".business__form",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".business__form",
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
