import { useEffect } from "react";
import gsap from "gsap";

export default function BookingAnimation() {
  useEffect(() => {
    const background = document.querySelector(".booking__background-image");
    const content = document.querySelector(".booking__content");

    if (!background || !content) return;

    gsap.fromTo(
      background,
      {
        x: "-10%",
      },
      {
        x: "0%",
        scale: 1.05,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      content,
      {
        x: "10%",
      },
      {
        x: "0%",
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  return null;
}
