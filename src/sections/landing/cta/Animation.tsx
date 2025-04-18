import { useEffect } from 'react';
import gsap from 'gsap';

export default function CtaAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta__image',
        { y: -240 },
        {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cta__bottom',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Анимация стрелок
      const arrow1 = document.querySelector('.cta__arrow-1');
      const arrow2 = document.querySelector('.cta__arrow-2');

      if (!arrow1 && !arrow2) {
        return;
      }

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.5,
      });

      tl.to(
        arrow1,
        {
          y: 10,
          duration: 0.2,
          yoyo: true,
          ease: 'power1.inOut',
        })

      tl.to(
        arrow2,
        {
          y: 10,
          duration: 0.3,
          yoyo: true,
          ease: 'power1.inOut',
        })
    });

    return () => ctx.revert();
  }, []);

  return null;
}
