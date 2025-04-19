import { useEffect, useState } from "react";
import "./MastersHeroSlider.scss";
import ArrorIcon from "@/assets/icons/arror-icon.svg";
import { staffImages } from "@/data/staffImages";

interface Staff {
  id: number;
  name: string;
  position: string;
  imageKey: string;
  slug: string;
  experience?: string;
  bio?: string;
}

interface Props {
  staffList: Staff[];
}

export default function MastersHeroSlider({ staffList }: Props) {
  const [index, setIndex] = useState(0);

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
    <article className="hero__content">
      <div className="hero__text">
        {(() => {
          const [firstName, lastName] = current.name.split(" ");
          return (
            <h1 className="hero__text-title">
              {firstName}
              <br />
              {lastName}
            </h1>
          );
        })()}
        <span className="hero__text-subtitle">{current.position}</span>
      </div>

      <img
        src={staffImages[current.imageKey].src}
        alt={current.name}
        className="hero__showcase"
      />

      <div className="hero__arrow-container">
        <button className="arrow left" onClick={handlePrev} aria-label="Предыдущий слайд">
          <img src={ArrorIcon.src} />
        </button>
        <button className="arrow right" onClick={handleNext} aria-label="Следующий слайд">
          <img src={ArrorIcon.src} />
        </button>
      </div>
    </article>
  );
}
