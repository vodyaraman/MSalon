import { useEffect } from "react";

const HeroTiltScript = () => {
  useEffect(() => {
    const trigger = document.querySelector<HTMLElement>(".hero");
    const title = document.getElementById("hero-title");
    const subtitle = document.getElementById("hero-subtext");

    if (!trigger || !title || !subtitle) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let currentX = 0, currentY = 0;
    let targetX = 4; // начальный наклон сразу
    let targetY = -2;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);

      title.style.setProperty("--rotX", `${currentY * 0.5}deg`);
      title.style.setProperty("--rotY", `${currentX * 0.5}deg`);

      subtitle.style.setProperty("--rotX", `${currentY * 0.9}deg`);
      subtitle.style.setProperty("--rotY", `${currentX * 0.9}deg`);

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

    animate(); // моментальный запуск

    return () => {
      trigger.removeEventListener("mousemove", onMouseMove);
      trigger.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return null;
};

export default HeroTiltScript;
