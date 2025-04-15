import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterReveal() {
  useEffect(() => {
    const footer = document.querySelector(".footer");
    const contact = footer?.previousElementSibling as HTMLElement | null;

    if (!footer || !contact) return;

    ScrollTrigger.create({
      trigger: footer,
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
      pinSpacing: false,
    });
  }, []);

  return null;
}
