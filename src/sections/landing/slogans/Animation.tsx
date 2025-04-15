import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 🔧 Универсальная анимация подсветки
function setupHighlight(id: string) {
  const container = document.getElementById(id);
  if (!container) return;

  gsap.fromTo(
    container,
    { filter: "brightness(0.8)" },
    {
      filter: "brightness(1.1)",
      scrollTrigger: {
        trigger: container,
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    }
  );
}

// 🔹 Первый слоган
function AnimateSloganMain() {
  useEffect(() => {
    setupHighlight("slogan-text-main");
  }, []);
  return null;
}

// 🔹 Второй слоган
function AnimateSloganSecondary() {
  useEffect(() => {
    setupHighlight("slogan-text-secondary");
  }, []);
  return null;
}

// 🔹 Обёртка
export default function SloganAnimation() {
  return (
    <>
      <AnimateSloganMain />
      <AnimateSloganSecondary />
    </>
  );
}
