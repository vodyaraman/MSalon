import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import BurgerIcon from "../../../assets/icons/burger-icon.svg"

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
        x: 1000,
        duration: 1.25,
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
        <img src={BurgerIcon.src} alt="" className="header__burger icon" />
      </aside>

      {isOpen && (
        <div className="burger-menu-wrapper" ref={wrapperRef}>
          <div className="burger-menu" ref={menuRef}>
            <button className="burger-menu__close" onClick={handleClose}>
              ×
            </button>
            <nav className="burger-menu__nav">
              <h2 className="burger-menu__title">Меню</h2>
              <ul className="burger-menu__list">
                <li className="burger-menu__item">
                  <a href="/" className="burger-menu__link">Главная</a>
                </li>
                <li className="burger-menu__item">
                  <a href="/services" className="burger-menu__link">Услуги</a>
                </li>
                <li className="burger-menu__item">
                  <a href="/staff" className="burger-menu__link">Мастера</a>
                </li>
                <li className="burger-menu__item">
                  <a href="/booking" className="burger-menu__link">Запись</a>
                </li>
              </ul>

            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
