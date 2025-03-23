import { useRef, useState } from "react";
import gsap from "gsap";

const BurgerMenu = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burger = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    burger.current = document.querySelector(".header__burger");
    if (!burger.current) return;

    setIsOpen(true);

    requestAnimationFrame(() => {
      if (!wrapperRef.current || !menuRef.current) return;

      // .header__burger уезжает вправо
      gsap.to(burger.current, {
        x: 400,
        duration: 0.6,
        ease: "power2.out",
      });

      // wrapper появляется справа налево
      gsap.fromTo(
        wrapperRef.current,
        { x: '100vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // меню внутри wrapper выезжает слева направо
      gsap.fromTo(
        menuRef.current,
        { x: -400 },
        { x: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );
    });
  };

  const handleClose = () => {
    if (!wrapperRef.current || !menuRef.current || !burger.current) return;

    // wrapper уходит обратно вправо
    gsap.to(wrapperRef.current, {
      x: '100vw',
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setIsOpen(false);
      },
    });

    // .header__burger возвращается на место
    gsap.to(burger.current, {
      x: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="burger-menu-trigger" onClick={handleOpen}>
      {isOpen && (
        <div className="burger-menu-wrapper" ref={wrapperRef}>
          <div className="burger-menu" ref={menuRef}>
            <button className="burger-menu__close" onClick={handleClose}>
              ×
            </button>
            <nav className="burger-menu__nav">
              <ul className="burger-menu__list">
                <li className="burger-menu__item">Главная</li>
                <li className="burger-menu__item">О нас</li>
                <li className="burger-menu__item">Услуги</li>
                <li className="burger-menu__item">Контакты</li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
