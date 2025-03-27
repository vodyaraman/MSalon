import { useEffect, useState } from "react";
import "./MastersHeroSlider.scss";

interface Staff {
  id: number;
  name: string;
  position: string;
  image: string;
  slug: string;
}

interface Props {
  staffList: Staff[];
}

export default function MastersHeroSlider({ staffList }: Props) {
  const [index, setIndex] = useState(0);

  // При загрузке: если есть якорь — ищем мастера по id
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const targetId = parseInt(hash);
    if (!isNaN(targetId)) {
      const foundIndex = staffList.findIndex((staff) => staff.id === targetId);
      if (foundIndex !== -1) {
        setIndex(foundIndex);
      }
    }
  }, [staffList]);

  // Обновляем hash при смене мастера
  const updateHash = (newIndex: number) => {
    const newId = staffList[newIndex].id;
    window.history.replaceState(null, "", `#${newId}`);
  };

  const handleNext = () => {
    setIndex((prev) => {
      const newIndex = (prev + 1) % staffList.length;
      updateHash(newIndex);
      return newIndex;
    });
  };

  const handlePrev = () => {
    setIndex((prev) => {
      const newIndex = (prev - 1 + staffList.length) % staffList.length;
      updateHash(newIndex);
      return newIndex;
    });
  };

  const current = staffList[index];

  return (
    <>
      <article className="hero__content">
        <div className="hero__text">
          <h1 className="hero__text-title">{current.name}</h1>
          <span className="hero__text-subtitle">{current.position}</span>
        </div>
        <img
          src={current.image}
          alt={current.name}
          className="hero__showcase"
        />
      </article>
  
      <div className="hero__controls">
        <button className="hero__button" onClick={handlePrev}>←</button>
        <button className="hero__button" onClick={handleNext}>→</button>
      </div>
    </>
  );
  
}
