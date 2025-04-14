import { useEffect } from "react";

const HeroTiltScript = () => {
  useEffect(() => {
    const trigger = document.querySelector<HTMLElement>(".hero");
    const title = document.getElementById("hero-title");
    const background = document.querySelector<HTMLElement>(".main-background");
    const subItems = document.querySelectorAll<HTMLElement>(".subtext__item");

    if (!trigger || !title || subItems.length === 0 || !background) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let currentX = 4;
    let currentY = -2;
    let targetX = 4;
    let targetY = -2;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);

      const rotXTitle = currentY * 0.1 - 1;
      const rotYTitle = currentX * 0.1;

      const rotXSub = currentY * 0.15 - 1;
      const rotYSub = currentX * 0.15;

      const parallaxX = -currentX * 0.1;
      const parallaxY = -currentY * 0.1;

      title.style.transform = `rotateX(${rotXTitle}deg) rotateY(${rotYTitle}deg)`;

      subItems.forEach((el) => {
        el.style.transform = `rotateX(${rotXSub}deg) rotateY(${rotYSub}deg)`;
      });

      background.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`;

      requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = trigger.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      targetX = (offsetX - rect.width / 2) / (Math.PI * 3);
      targetY = -(offsetY - rect.height / 2) / (Math.PI * 4);
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    trigger.addEventListener("mousemove", onMouseMove);
    trigger.addEventListener("mouseleave", onMouseLeave);

    animate();

    return () => {
      trigger.removeEventListener("mousemove", onMouseMove);
      trigger.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return null;
};

export default HeroTiltScript;
