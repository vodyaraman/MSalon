import { useEffect } from "react";
import gsap from "gsap";

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
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "none" }
  ).fromTo(
    ".services__content",
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "none" },
    "-=0.5"
  );
}

function animateServicesFooterParallax() {
  gsap.fromTo(
    ".services__footer img",
    { y: -240 },
    {
      y: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".services__footer",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}
