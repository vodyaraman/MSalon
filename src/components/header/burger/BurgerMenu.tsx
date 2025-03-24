import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const BurgerMenu = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    burgerRef.current = document.querySelector(".header__burger");
    if (burgerRef.current) {
      burgerRef.current.addEventListener("click", handleOpen);
    }
    return () => {
      burgerRef.current?.removeEventListener("click", handleOpen);
    };
  }, []);

  const handleOpen = () => {
    if (!burgerRef.current) return;
    setIsOpen(true);

    requestAnimationFrame(() => {
      if (!wrapperRef.current || !menuRef.current) return;

      // бургер уезжает вправо
      gsap.to(burgerRef.current, {
        x: 400,
        duration: 0.6,
        ease: "power2.out",
      });

      // затемнение
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // меню появляется справа налево
      gsap.fromTo(
        menuRef.current,
        { x: '100%' },
        { x: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
      );
    });
  };

  const handleClose = () => {
    if (!wrapperRef.current || !menuRef.current || !burgerRef.current) return;

    // меню уходит обратно вправо
    gsap.to(menuRef.current, {
      x: '100%',
      duration: 0.5,
      ease: "power2.in",
    });

    // затемнение исчезает
    gsap.to(wrapperRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setIsOpen(false);
      },
    });

    // бургер возвращается
    gsap.to(burgerRef.current, {
      x: 0,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.25,
    });
  };

  return (
    <>
      <aside className="header__burger">
        МЕНЮ
        <img src="/icons/burger-icon.svg" alt="" className="header__burger icon" />
      </aside>

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
    </>
  );
};

export default BurgerMenu;
