import { useEffect } from "react";
import gsap from "gsap";

export default function FaqAnimation() {
  useEffect(() => {
    const items = document.querySelectorAll(".faq__item");

    items.forEach(item => {
      const toggle = item.querySelector(".faq__toggle");
      const answer = item.querySelector(".faq__answer") as HTMLElement | null;

      if (!toggle || !answer) return;

      toggle.addEventListener("click", () => {
        const isOpen = item.classList.contains("faq__item--open");

        if (isOpen) {
          // скрываем
          gsap.to(answer, {
            maxHeight: 0,
            duration: 0.4,
            onComplete: () => {
              item.classList.remove("faq__item--open");
            },
          });

        } else {
          // показываем
          item.classList.add("faq__item--open");

          const content = answer.querySelector('.faq__answer-text');
          const height = content?.clientHeight;

          gsap.to(
            answer,
            {
              maxHeight: height,
              duration: 0.4,
            },

          );
        }
      });
    });
  }, []);

  return null;
}
