import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CtaAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta__image',
        { y: -120 },
        {
          y: 120,
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
