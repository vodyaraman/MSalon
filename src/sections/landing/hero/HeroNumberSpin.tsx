import { useEffect } from "react";
import gsap from "gsap";

const HeroNumberSpin = () => {
  useEffect(() => {
    const numbers = document.querySelectorAll<HTMLElement>(".subtext__number");

    numbers.forEach((el) => {
      const final = parseInt(el.innerText, 10);

      el.innerText = "0";

      gsap.to(el, {
        duration: 3,
        innerText: final,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: () => {
          el.innerText = Math.floor(parseFloat(el.innerText)).toString();
        },
        delay: 0.2,
      });
    });
  }, []);

  return null;
};

export default HeroNumberSpin;
