import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './PortfolioSlider.scss';

import mock from '@/assets/photos/portfolio/mock.png';

export default function PortfolioSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const topRow = document.querySelector('.portfolio-slider__row--top');
      const bottomRow = document.querySelector('.portfolio-slider__row--bottom');

      if (topRow) {
        gsap.to(topRow, {
          x: '-50%',
          duration: 60,
          ease: 'none',
          repeat: -1,
        });
      }

      if (bottomRow) {
        gsap.fromTo(
            bottomRow,
            { x: '-50%' },
            {
              x: '0%',
              duration: 60,
              ease: 'none',
              repeat: -1,
            }
          );
          
      }
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  // Дублируем элементы для бесшовного скролла
  const renderImages = () =>
    [...Array(8)].map((_, i) => (
      <div className="portfolio-slider__item" key={i}>
        <img src={mock.src} alt={`Работа ${i + 1}`} />
      </div>
    ));

  return (
    <div className="portfolio-slider" ref={sliderRef}>
      <div className="portfolio-slider__wrapper">
        <div className="portfolio-slider__row portfolio-slider__row--top">
          {renderImages()}
          {renderImages()}
        </div>
      </div>

      <div className="portfolio-slider__wrapper">
        <div className="portfolio-slider__row portfolio-slider__row--bottom">
          {renderImages()}
          {renderImages()}
        </div>
      </div>
    </div>
  );
}
