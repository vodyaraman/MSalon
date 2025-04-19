import { useEffect } from "react";
import gsap from "gsap";

export default function FaqAnimation() {
  useEffect(() => {
    const items = document.querySelectorAll(".faq__item");

    items.forEach(item => {
      const toggle = item.querySelector(".faq__toggle");
      const answer = item.querySelector(".faq__answer") as HTMLElement | null;

      if (!toggle || !answer) return;

      // Инициализация начальных стилей
      gsap.set(answer, {
        height: 0,
        opacity: 0,
        overflow: "hidden"
      });

      toggle.addEventListener("click", () => {
        const isOpen = item.classList.contains("faq__item--open");

        if (isOpen) {
          // скрываем
          gsap.to(answer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              item.classList.remove("faq__item--open");
              answer.style.display = 'none';
            },
          });

        } else {
          // показываем
          item.classList.add("faq__item--open");
          gsap.to(
            answer,
            {
              height: 'auto',
              opacity: 1,
              duration: 0.3,
              onStart: () => {
                answer.style.display = 'block';
              },
              onComplete: () => {
                answer.style.height = 'auto';
              }
            },

          );
        }
      });
    });
  }, []);

  return null;
}
