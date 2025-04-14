import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateServicesSection();
      animateServicesFooterParallax();
    });

    return () => ctx.revert();
  }, []);

  return null;
}

// 🔹 Анимация блока .services
function animateServicesSection() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".services",
      start: "top 80%",
      once: true,
    },
  });

  tl.fromTo(
    ".services__title",
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
  ).fromTo(
    ".services__content",
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
    "-=0.5"
  );
}

function animateServicesFooterParallax() {
  gsap.fromTo(
    ".services__footer img",
    { y: -120 },
    {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".services__footer",
        start: "top bottom",      // начинается до появления
        end: "bottom top",        // заканчивается при скрытии
        scrub: true,              // плавный эффект в зависимости от скролла
      },
    }
  );
}

