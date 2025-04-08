import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ===== Анимации появления =====
function animateAboutTitle() {
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
      },
    }
  );
}

function animateAboutSubtitle() {
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
      },
    }
  );
}

function animateSlideFirst() {
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
      },
    }
  );
}

function animateSlideSecond() {
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
      },
    }
  );
}

function animateSlideThird() {
  gsap.fromTo(
    ".about__slide--third",
    { x: -100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about__slide--third",
        start: "top 85%",
      },
    }
  );
}

function addScrollParallaxToImages() {
  const imageSelectors = [
    ".about__slide--first .image img",
    ".about__slide--second .image img",
    ".about__slide--third .image img",
  ];

  imageSelectors.forEach((selector) => {
    const img = document.querySelector(selector);
    const slide = document.querySelector(selector)?.closest(".about__slide");

    if (!img || !slide) return;

    gsap.fromTo(
      img,
      { y: -80 },
      {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: slide,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}




// ===== Компонент =====
export default function AboutAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateAboutTitle();
      animateAboutSubtitle();
      animateSlideFirst();
      animateSlideSecond();
      animateSlideThird();
      addScrollParallaxToImages();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
