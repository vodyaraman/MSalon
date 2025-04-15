import { useEffect } from "react";
import gsap from "gsap";

export default function FaqAnimation() {
  useEffect(() => {
    const items = document.querySelectorAll(".faq__item");

    items.forEach(item => {
      const toggle = item.querySelector(".faq__toggle");
      const answer = item.querySelector(".faq__answer") as HTMLElement | null;

      if (!toggle || !answer) return;

      gsap.set(answer, { height: 0, opacity: 0, display: "none" });

      toggle.addEventListener("click", () => {
        const isOpen = item.classList.contains("faq__item--open");

        if (isOpen) {
          // скрываем
          gsap.to(answer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              answer.style.display = "none";
            },
          });
          item.classList.remove("faq__item--open");
        } else {
          // показываем
          answer.style.display = "block";
          const fullHeight = answer.scrollHeight + 30;

          gsap.fromTo(
            answer,
            { height: 0, opacity: 0 },
            { height: fullHeight, opacity: 1, duration: 0.3 }
          );

          item.classList.add("faq__item--open");
        }
      });
    });
  }, []);

  return null;
}
