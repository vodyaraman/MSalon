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
    });

    return () => ctx.revert();
  }, []);

  return null;
}
