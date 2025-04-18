import { useEffect } from "react";
import gsap from "gsap";

function setupFillText(id: string) {
  const container = document.getElementById(id);
  if (!container) return;

  const target = container.querySelector<HTMLElement>('.slogan__continuation');

  if (!target) {
    return;
  }

  gsap.to(target, {
    scrollTrigger: {
      trigger: container,
      start: "top 60%",
      end: "bottom 40%",
      scrub: 1,
    },
    backgroundPosition: '-100% 0',
  });
}

// 🔹 Первый слоган
function AnimateSloganMain() {
  useEffect(() => {
    // setupHighlight("slogan-text-main");
    setupFillText("slogan-text-main")
  }, []);
  return null;
}

// 🔹 Второй слоган
function AnimateSloganSecondary() {
  useEffect(() => {
    // setupHighlight("slogan-text-secondary");
    setupFillText("slogan-text-secondary")
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
